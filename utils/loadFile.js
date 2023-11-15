import { createContentLoader } from "vitepress";

function loadFile(pattern) {
  return createContentLoader(pattern, {
    transform(raw) {
      return raw
        .map(({ url, frontmatter }) => ({
          title: frontmatter.title,
          url
        }))
    }
  })
}

export {loadFile}