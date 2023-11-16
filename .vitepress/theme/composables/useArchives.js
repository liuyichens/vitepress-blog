import {data as posts} from '../../../utils/posts.data'

export function useArchives(){
  const postYearObj = {}
  posts.forEach(p => {
    const year = new Date(p.date.time).getFullYear()
    if(!postYearObj[year]){
      postYearObj[year] = []
    }
    postYearObj[year].push(p)
  })
  const yearSort = Object.keys(postYearObj).sort((a, b) => b - a)
  const postByYear = []
  yearSort.forEach(year => {
    const sortList = postYearObj[year].sort((a,b) => b.date.time - a.date.time)
    postByYear.push({year, posts: sortList})
  })
  return postByYear
}