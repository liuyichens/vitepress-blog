import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import chalk from "chalk";
const log = console.log;

const DIR_PATH = path.resolve();
const WHITE_LIST = ['index.md']

const filterWhiteList = (arr1, arr2) => Array.from(new Set(arr1.filter(item => !new Set(arr2).has(item))))


const getList = (params, path1, pattern, collapsable = false) => {
  const res = []
  for (let p of params) {
    const dir = path.join(path1, p)
    const isDir = fs.statSync(dir).isDirectory()
    if (isDir) {
      const files = fs.readdirSync(dir);
      res.push({
        text: p,
        collapsed: collapsable,
        items: getList(files, dir, `${pattern}/${p}`, collapsable)
      })
    } else {
      const name = path.basename(p);
      const suffix = path.extname(p);
      if (suffix !== ".md") {
        continue;
      }
      let title = name;
      const contentStr = fs.readFileSync(`${pattern}/${p}`, "utf8")
      // 解析frontmatter数据
      const { data } = matter(contentStr, {})
      if (data.title) {
        title = data.title
      }
      res.push({
        text: title,
        link: `${pattern}/${name}`
      })
    }
  }
  return res;
}

export const getSiderBar = (pattern, collapsable = false) => {
  const dirPath = path.join(DIR_PATH, pattern);
  const files = fs.readdirSync(dirPath);
  const items = filterWhiteList(files, WHITE_LIST);
  return getList(items, dirPath, pattern, collapsable)
}