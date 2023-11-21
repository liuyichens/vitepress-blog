import { blogConfig } from "../config";
import { loadFiles } from "./loadFiles";

export async function loadPosts() {
  const postList = await loadFiles(blogConfig.blogPattern);
  return postList
    .map((post) => {
      return {
        title: post.frontmatter.title,
        author: post.frontmatter?.author ?? blogConfig.defaultAuthor,
        url: post.url,
        excerpt: post.excerpt,
        date: formatDate(post.frontmatter.date),
        tags: post.frontmatter.tags,
        category: post.frontmatter?.categories ?? blogConfig.defaultCategory,
      };
    })
    .sort((a, b) => b.date.time - a.date.time);
}

function formatDate(raw) {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    string: date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
