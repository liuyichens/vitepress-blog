import { globby } from "globby";
import * as fs from "fs";
import matter from "gray-matter";

export async function loadFiles(pattern) {
  const paths = await globby([`${pattern}/**/*.md`]);
  const postList = [];
  for (const path of paths) {
    const result = fs.readFileSync(path, "utf8");
    const { data: fileMatterObj, excerpt, content: fileContent } = matter(result, { excerpt: true });
    postList.push({
      frontmatter: fileMatterObj,
      docContent: fileContent,
      excerpt,
      url: path.replace(".md",".html")
    })
  }
  return postList;
}
