<template>
  <div class="header">
    <header class="top-nav-container">
      <nav class="top-nav">
        <a href="javascript:;" class="vertical-center nav-logo">
          <!--<span class="brand vertical-center-content">光阴</span>
          <span class="brand vertical-center-content">博客</span>-->
        </a>
        <ul class="nav-link-container">
          <li class="nav-link-item">
            <router-link class="nav-link" to="/posts">文章</router-link>
          </li>
          <li class="nav-link-item">
            <router-link class="nav-link" to="/tags">标签</router-link>
          </li>
          <li class="nav-link-item">
            <router-link class="nav-link" to="/me">关于我</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="after-header-box">
      <div id="green-line"></div>
    </div>
  </div>
    
</template>
<style lang="stylus">
  @import "../../stylus/_settings.styl"
  $header-height = 80px
  $after-header-box-height = 10px;
  .header
    height: $header-height
  .top-nav-container
    height: $header-height
    line-height $header-height
    box-shadow 0 0 4px rgba(0,0,0,0.25)
    background #ffffe3
  .top-nav
    max-width  850px
    margin-left 340px
    height: $header-height
  .nav-logo
    display inline-block
    .logo
      margin-right 6px
  .logo
    width 40px
    height 40px
  .brand
    font-size 2.5em
    color #ff3051
    font-family $logo-font
    font-weight 500
  .top-nav-blog-label 
    color #ff3051
    font-size 2.5em
  .nav-link-container
    float right
    list-style-type none
    margin 0
    padding 0
  .nav-link-item
    display inline-block
    margin 0 .6em
  .nav-link
    font-size: 15px;
    height $header-height
    line-height $header-height
    text-decoration none
    color #ff3051
    padding-bottom 3px
    &:hover, &.active
        color $main-color
  #green-line 
    height 10px
    opacity 0.7
    background url('../../assets/img/green_line.png') center no-repeat
</style>
<script>
  export default{
    name: 'header-nav'
  }
</script>
