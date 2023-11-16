import { createContentLoader } from "vitepress";
import { blogConfig } from "../config";
import { markdownToTxt } from 'markdown-to-txt';

const blogPatern = `${blogConfig.blogPattern}/**/*.md`;

export default createContentLoader(blogPatern, {
  excerpt: true,
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        author: frontmatter.author ?? blogConfig?.defaultAuthor,
        url,
        // excerpt: markdownToTxt(excerpt.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' '),
        excerpt,
        date: formatDate(frontmatter.date),
        tags: frontmatter.tags,
        category: frontmatter.categories ?? blogConfig.defaultCategory,
      }))
      .sort((a, b) => b.date.time - a.date.time);
  },
});

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
