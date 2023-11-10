import { globby } from "globby";
import { blogConfig } from "../config";

const PAGE_SIZE = blogConfig.pageSize;

console.log('page')

async function getFiles() {
  let paths = await globby([`posts/**/*.md`]);
  return paths.length;
}

export default {
  async paths() {
    const totalPosts = await getFiles();
    const totalPage = Math.ceil(totalPosts / PAGE_SIZE);
    const pageParams = new Array(totalPage)
      .fill(0)
      .map((_, index) => ({ params: { page: index + 1 } }));
    return pageParams;
  }
};
