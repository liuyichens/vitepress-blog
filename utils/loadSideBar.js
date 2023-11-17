import { globby } from "globby";
import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import chalk from "chalk";
const log = console.log;

/**
 * 生成侧边栏数据
 * @param {String} sourceDir .md文件所在的源目录
 * @param {Boolea} collapsable 是否可折叠
 * @returns
 */
function createSiderBarData(sourceDir, collapsable = false) {
  const sideBarData = [];
  const tocs = readTocs(sourceDir);
  tocs.forEach((toc) => {
    const sideBarObj = mapTocToSideBar(sourceDir, toc, collapsable);
    if (!sideBarObj.sidebar.length) {
      log(chalk.yellow(`warning: 目录${toc}内部没有任何文件或文件序号出错，将忽略生成的侧边栏`))
      return
    }
    sideBarData.push({
      text: `${path.basename(toc)}`,
      items: sideBarObj.sidebar
    })
  });
  return sideBarData;
}

export { createSiderBarData };

/**
 * 读取指定目录下的文件绝对路径
 * @param {String} root 指定目录
 * @returns
 */
function readTocs(root) {
  const result = [];
  // 读取目录，返回数组，成员是root底下的所有目录名
  const files = fs.readdirSync(root);
  files.forEach((name) => {
    // 将路径或者路径片段的序列解析为绝对路径
    const file = path.resolve(root, name);
    if (fs.statSync(file).isDirectory()) {
      result.push(file);
    }
  });
  return result;
}

function mapTocToSideBar(sourceDir, root, collapsable, prefix = "") {
  let sidebar = [];
  // 读取目录返回数组
  const files = fs.readdirSync(root);
  files.forEach((fileName) => {
    const file = path.resolve(root, fileName);
    const stat = fs.statSync(file);
    if (fileName === ".DS_Store" || fileName.toLocaleLowerCase() === 'index.md') {
      return;
    }
    const fileNameArr = fileName.split(".");
    const isDir = stat.isDirectory();
    let order = '', title = '', type = ''
    if (fileNameArr.length === 2) {
      order = fileNameArr[0];
      title = fileNameArr[1];
    } else {
      const firstDotIndex = fileName.indexOf(".");
      const lastDotIndex = fileName.lastIndexOf(".");
      order = fileName.substring(0, firstDotIndex)
      type = fileName.substring(lastDotIndex + 1)
      if (isDir) {
        title = fileName.substring(firstDotIndex + 1);
      } else {
        title = fileName.substring(firstDotIndex + 1, lastDotIndex)
      }
    }

    order = parseInt(order, 10);
    if (isNaN(order) || order < 0) {
      log(chalk.yellow(`warning: 文件${file}序号出错，请填写正确的序号`))
      return
    }

    if (sidebar[order]) {
      log(chalk.yellow(`warning: 文件${file}序号在同一级别中重复出现，将会被覆盖`))
    }

    if (isDir) {
      sidebar[order] = {
        title,
        collapsable,
        children: mapTocToSideBar(file, collapsable, prefix + fileName + "/").sidebar
      }
      log(`info: ${sidebar[order]}`)
    } else {
      if (type !== 'md') {
        log(chalk.yellow(`warning: 文件 ${file} 非.md文件格式，不支持该文件类型`))
        return;
      }
      const contentStr = fs.readFileSync(file, "utf8")
      // 解析frontmatter数据
      const { data } = matter(contentStr, {})
      if (data.title) {
        title = data.title
      }

      const item = {link: sourceDir + '/' + prefix + fileName, text: title}
      sidebar[order] = item
    }
  })

  sidebar = sidebar.filter(item => item !== null && item !== undefined)
  return {
    sidebar
  }

}

export async function loadSideBar(pattern) {
  const paths = await globby([`${pattern}/**/*.md`]);
  const sideBarList = [];
  for (const path of paths) {
    const result = fs.readFileSync(path, "utf8");
    const { data: fileMatterObj } = matter(result, { excerpt: true });
    sideBarList.push({
      text: fileMatterObj?.title ?? "笔记",
      link: "/" + path.replace(".md", ".html"),
    });
  }
  return sideBarList;
}
