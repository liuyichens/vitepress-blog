import { defineConfig } from "vitepress";
import { blogConfig } from "../config";
import { createSiderBarData } from "../utils/loadSideBar";

console.log("config");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "思享",
  description: "探索知识，分享生活",
  markdown: {
    theme: "material-theme-palenight",
    lineNumbers: true,

    // adjust how header anchors are generated,
    // useful for integrating with tools that use different conventions
    config: (md) => {},
  },
  ignoreDeadLinks: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    outline: {
      label: "本章目录",
      level: [2, 3, 4],
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    sidebar: {
      "/examples/": examples(),
      "/favor/": favor(),
      // "/note/HTML": createSiderBarData('note/HTML', true),
      // "/note/CSS": createSiderBarData('note/CSS', true),
      "/note/JavaScript": createSiderBarData('note/JavaScript', true)
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      message:
        'Released under the <a href="">MIT License</a>.',
      copyright:
        'Copyright © 2019-present <a href="">LiuYichen</a>',
    },
  },
  async transformPageData(pageData, ctx) {
    await processData(pageData, ctx);
  },
});

export async function processData(
  pageData,
  ctx,
  aside = "left",
  sidebar = false
) {
  const postPattern = blogConfig?.blogPattern ?? "blog/detail";
  if (pageData.relativePath.includes(postPattern)) {
    pageData.frontmatter.blog = "post";
    pageData.frontmatter.aside = aside;
    pageData.frontmatter.sidebar = sidebar;
    pageData.frontmatter.prev = false;
    pageData.frontmatter.next = false;
  }
}

function nav() {
  return [
    { text: "首页", link: "/" },
    { text: "文章", link: "/blog/", activeMatch: "/blog/" },
    { text: "分类", link: "/category/", activeMatch: "/category/" },
    { text: "标签", link: "/tag/", activeMatch: "/tag/" },
    { text: "归档", link: "/archive/", activeMatch: "/archive/" },
    {
      text: "收藏", activeMatch: "/favor/",
      items: favor()
    },
    {
      text: "技术笔记",
      items: notes(),
    },
    { text: "案例", link: "/examples/", activeMatch: "/examples/" },
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


function favor() {
  return [
    { text: "CSS 动画", link: "/favor/css/css-animation" }
  ]
}

function notes() {
  return [
    {
      text: "HTML",
      link: '/note/HTML/'
    },{
      text: "CSS",
      link: '/note/CSS/'
    },{
      text: "JavaScript",
      link: '/note/JavaScript/'
    }
  ];
}
