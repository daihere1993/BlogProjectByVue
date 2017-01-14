<template>
  <div class="guide-links fix">
    <span v-if="prev">← <router-link to="prevLink">{{prevWord}}</router-link></span>
    <span class="r" v-if="next"><router-link to="nextLink">{{nextWord}}</router-link> →</span>
  </div>
</template>
<style lang="stylus">
  .guide-links
    margin-top 2em
</style>
<script>
export default {
  props: {
    prev: {
      type: Boolean,
      default: true
    },
    prevWord: {
      type: String,
      default: '上一页'
    },
    prevLink: {
      type: String
    },
    next: {
      type: Boolean,
      default: true
    },
    nextLink: {
      type: String
    },
    nextWord: {
      type: String,
      default: '下一页'
    }
  }
}
</script>
