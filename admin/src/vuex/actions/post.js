import * as types from '../mutation_types'
import service from '../../services/posts/index'

const actions = {
  getAllPost: ({ commit }, tags) => {
    return service.getDraftList(tags).then(res => {
      if (res.success) {
        commit(types.RECEIVE_ALL_POSTS,res.data)
        if (res.data.length) {
          commit(types.POST_FOCUS, 0)
        }
      }
    })
  },
  
  focusOnPost: ({ commit }, index) => {
    commit(types.POST_FOCUS, index)
  },
  
  editPost: ({ commit }) => {
    commit(types.POST_EDIT)
  },
  
  savePost: ({ commit }) => {
    commit(types.POST_SAVE)
  },
  
  editPostTitle: ({ commit }) => {
    commit(types.POST_TITLE_EDIT)
  },
  
  savePostTitle: ({ commit }) => {
    commit(types.POST_TITLE_SAVE)
  },
  
  deletePost: ({ commit, state }) => {
    if (state.postSaved) {
      return service.deleteDraft(state.currentPostId).then(res => {
        if (res.success) {
          commit(types.POST_DELETE)
        }
      })
    } else {
      let err = new Error()
      err.error_message = '文章尚未保存,请稍后再试'
      return Promise.reject(err)
    }
  },
  
  publishPost: ({ commit, state }) => {
    return service.publish(state.currentPostId).then(res => {
      if (res.success) {
        commit(types.POST_PUBLISH, res.data.article._id)
      }
    })
  },
  
  submitPostTitle: ({ commit, state }, title) => {
    return service.modifyDraftTitle(state.currentPostId, title).then(res => {
      if (res.success) {
        commit(types.POST_TITLE_MODIFY, title)
        commit(types.POST_LAST_EDIT_TIME, res.data.lastEditTime)
      }
    })
  },
  
  submitPostExcerpt: ({ commit}, excerpt, time) => {
    commit(types.POST_EXCERPT_MODIFY, excerpt)
    commit(types.POST_LAST_EDIT_TIME,time)
  },
  
  createPost: ({ commit }) => {
    return service.createDraft('新文章').then(res => {
      if (res.success) {
        commit(types.POST_CREATE, res.data)
      } else {
        return Promise.reject()
      }
    })
  },
  
  postTagsModify: ({ commit}, time) => {
    commit(types.POST_TAG_MODIFY)
    commit(types.POST_LAST_EDIT_TIME, time)
  }
}

export default actions
