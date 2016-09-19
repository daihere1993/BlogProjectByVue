<template>
  <div class="post">
    <h3 class="date">{{ note.date | moment 'MMM D, YYYY' }}</h3>
    <h1>{{ note.title }}</h1>
    <div class="content">{{ note.content }}</div>
    <a id="older" class="blog-nav" href="/">OLDER&nbsp</a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        note: {}
      }
    },
    ready () {
      this.$http.get('http://localhost:8888' + this.$route.path).then(function (ret) {
        this.$set('note', ret.data)
      })
    }
  }
</script>