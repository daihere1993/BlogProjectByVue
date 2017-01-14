import List from 'components/PostList.vue'
import Post from 'components/Post.vue'
import Tag from 'components/Tag.vue'
import Me from 'components/Me.vue'

const routes = [
  { path: '/posts', component: List },
  { path: '/post/:postId', component: Post },
  { path: '/tags', component: Tag },
  { path: '/me', components: Me }
]

export default routes