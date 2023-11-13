import { defineConfig } from "vitepress";
import { blogConfig } from "../config";

console.log('config')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  markdown: {
    lineNumbers: true,
    headers: {
      level: [2, 3]
    },
  },
  ignoreDeadLinks: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    outline: {
      label: "本章目录",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    sidebar: {
      "/examples/": examples(),
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2019-present <a href="https://github.com/yyx990803">LiuYichen</a>',
    },
  },
  async transformPageData(pageData, ctx) {
    await processData(pageData, ctx)
  }
});

export async function processData(pageData, ctx, aside = 'left', sidebar = false) {
  const postPattern = blogConfig?.blogPattern ?? 'blog/detail'
  if (pageData.relativePath.includes(postPattern)) {
    pageData.frontmatter.blog = 'post'
    pageData.frontmatter.aside = aside
    pageData.frontmatter.sidebar = sidebar
    pageData.frontmatter.prev = false
    pageData.frontmatter.next = false
  }
}

function nav() {
  return [
    { text: "Home", link: "/" },
    { text: "Blog", link: "/blog/", activeMatch: "/blog/" },
    { text: "Examples", link: "/examples/", activeMatch: "/examples/" },
  ];
}

function examples() {
  return [
    {
      text: "Examples",
      items: [
        { text: "Markdown Examples", link: "/examples/markdown-examples" },
        { text: "Runtime API Examples", link: "/examples/api-examples" },
      ],
    },
  ];
}
