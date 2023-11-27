import { loadPosts } from "../utils/loadPosts"

export default {
  async paths() {
    const allPosts = await loadPosts()
    const allCategories = [...new Set(allPosts.map(post => post.category).flat())]
    // return allCategories.map(c => ({ params: { category: c }}))
    return [
      { params: { category: 'foo' }},
      { params: { category: 'bar' }}
    ]
  }
}