<template>
  <my-canvas></my-canvas>
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
import Canvas from './components/Canvas'

export default {
  components: {
    'myCanvas': Canvas
  },
  replace: false
}
</script>
