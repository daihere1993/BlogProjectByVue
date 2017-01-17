import LoginView from 'components/Login/Login.vue'
import PostsView from 'components/Posts/Posts.vue'
import Tags from 'components/Tags/Tags.vue'
import Me from 'components/Me/Me.vue'

const routes = [
  { path: '/login', component: LoginView , name: 'login' },
  { path: '/posts', component: PostsView },
  { path: '/tags', component: Tags },
  { path: '/me', component: Me }
]

export default routes
