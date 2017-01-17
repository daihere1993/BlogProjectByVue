const getters = {
  postList: ({ all }) => {
    return all
  },
  articleIdOfPost: ({ articleId }) => {
    return articleId
  },
  currentPostId: ({ currentPostId }) => {
    return currentPostId
  },
  currentPostIndex: ({ currentPostIndex }) => {
    return currentPostIndex
  },
  postTitle: ({ title }) => {
    return title
  },
  postSaved: ({ postSaved }) => {
    return postSaved
  },
  postTitleSaved: ({ postTitleSaved }) => {
    return postTitleSaved
  } 
}

export default getters
