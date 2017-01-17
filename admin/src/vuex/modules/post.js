import actions from '../actions/post'
import mutations from '../mutations/post'
import getters from '../getters/post'

const state = {
  all: [],
  currentPostId: null,
  currentPostIndex: -1,
  // post其实只是笔记/草稿,article才是对外发布后,外部可见的文章
  articleId: null,
  title: '',
  postSaved: true,
  postTitleSaved: true
}

export default {
  state,
  mutations,
  actions,
  getters
}
