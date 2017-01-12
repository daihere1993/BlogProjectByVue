import List from 'components/PostList.vue'
import Post from 'components/Post.vue'
import Tag from 'components/Tag.vue'
import Me from 'components/Me.vue'

const routes = [
  { path: '/posts', component: List },
  { path: '/posts/:postId', component: Post },
  { path: '/tags', component: Tag },
  { path: '/me', components: Me }
]

export default routes

//export default (router) => {
//  router.map({
//    '/posts': {
//      component: List
//    },
//    '/posts/:postId': {
//      component: Post
//    },
//    '/tags': {
//      component: function (resolve) {
//        require(['components/Tag.vue'], resolve)
//      },
//    },
//    '/me': {
//      component: function (resolve) {
//        require(['components/Me.vue'], resolve)
//      },
//    },
//  })
//  router.redirect({
//    '*': '/posts'
//  })
//}
