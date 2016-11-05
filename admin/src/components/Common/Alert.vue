<template>
  <div 
    v-show="visible"
    v-bind:class="{
      'alert': true,
      'alert-success': (type === 'success'),
      'alert-warning': (type === 'warning'),
      'alert-info': (type === 'info'),
      'alert-danger': (type === 'danger'),
      'top': (placement === 'top'),
      'top-right': (placement === 'top-right')
    }"
    transition="fade"
    v-bind:style="{width: width}"
    role="alert">
    <button v-show="visible" type="button" class="close" @click="visible = false">
      <span>&times;</span>
    </button>
    <span 
      v-bind:class="{
        'fa': true,
        'alert-icon': true,
        'fa-check-circle': (type === 'success'),
        'fa-info-circle': (type !== 'success')
      }"></span>
    <strong class="message">{{ message }}</strong>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String
      },
      visible: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 0
      },
      width: {
        type: String,
        default: '400px'
      },
      placement: {
        type: String
      },
      message: {
        type: String,
        default: ''
      }
    },
    watch: {
      visible (val) {
        if (this._timeout) clearTimeout(this._timeout)
        if (val && Boolean(this.duration)) {
          this._timeout = setTimeout(() => {this.visible = false}, this.duration)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .alert-icon 
    font-size 32px !important
    float left
    margin-right 10px
  .message
    line-height 32px
  .fade-transition 
    transition opacity .3s ease
  .fade-enter, .fade-leave
    height 0
    opacity 0
  .alert.top 
    position fixed
    top 30px
    margin 0 auto
    left 0
    right 0
    z-index: 1050
  .alert.top-right 
    position fixed
    top 30px
    right 50px
    z-index 1050
</style>
