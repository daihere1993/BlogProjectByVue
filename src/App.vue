<template>
  <div id="wrapper">
    <div class="header">
      <a href="/">Blog</a>
    </div>
    <p class="links">
      <a href="#" target="_blank">
        <img src="./images/twitter.png">
      </a>
      <a href="#" target="_blank">
        <img src="./images/github.png">
      </a>
      <a href="#" target="_blank">
        <img src="./images/feed.png">
      </a>
    </p>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  components: {
    Hello
  },
  replace: false
}
</script>
