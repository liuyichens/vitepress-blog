const blogConfig = {
  defaultAuthor: 'LiuYichen',
  defaultCategory: 'article',
  pageSize: 10,
  blogPattern: 'blog/detail'
};

let postList = []

const setPosts = (posts) => {
  console.log('setPosts');
  postList = [...posts];
}

const getPosts = () => {
  return postList;
}

export {
  blogConfig,
  setPosts,
  getPosts
}