import List from 'components/PostList.vue'
import Post from 'components/Post.vue'
export default (router) => {
  router.map({
    '/posts': {
      component: List
    },
    '/posts/:postId': {
      component: Post
    },
    '/tags': {
      component: function (resolve) {
        require(['components/Tag.vue'], resolve)
      },
    },
    '/me': {
      component: function (resolve) {
        require(['components/Me.vue'], resolve)
      },
    },
  })
  router.redirect({
    '*': '/posts'
  })
}
