<template>
  <div class="header">
    <header class="top-nav-container">
      <nav class="top-nav">
        <a href="javascript:;" class="vertical-center nav-logo">
          <span class="brand vertical-center-content">自制与光阴</span>
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
      <div class="after-header-box-gap triangle-up"></div>
    </div>
  </div>
    
</template>
<style lang="stylus">
  @import "../../stylus/_settings.styl"
  $header-height = 40px
  $after-header-box-height = 14px;
  .top-nav-container
    box-shadow 0 0 4px rgba(0,0,0,0.25)
    background $dark
  .top-nav
    max-width  850px
    margin 0 auto
    height $header-height
    padding 25px 0
  .nav-logo
    display inline-block
    .logo
      margin-right 6px
  .logo
    width 40px
    height 40px
  .brand
    font-size 2.5em
    color $snow
    font-family $logo-font
    font-weight 500
  /**
    fixme! 留作以后的slogan样式
  */
  /*.slogan
    font-size 1.3em
    color $light
    font-family $logo-font
    font-weight 500*/
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
    color $snow
    padding-bottom 3px
    &:hover, &.active
        border-bottom 3px solid $green
  .after-header-box
    height $after-header-box-height
    background $green
  .triangle-up
    width: 0
    height 0
    border-left 7px solid transparent
    border-right 7px solid transparent
    border-bottom $after-header-box-height solid $snow
  .after-header-box-gap
    margin 0 auto;
</style>
<script>
  export default{
    name: 'header-nav'
  }
</script>
