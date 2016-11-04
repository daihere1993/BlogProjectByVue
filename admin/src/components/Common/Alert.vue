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
    <button v-show="dismissable" type="button" class="close" @click="show = false">
      <span>&times;</span>
    </button>
    <span class＝"icon-ok-circled alert-icon-float-left"></span>
    <strong>{{ title }}</strong>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String
      },
      dismissable: {
        type: Boolean,
        default: false
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
        default: '200px'
      },
      placement: {
        type: String
      }
    }

    // <style>
    //   .fade-transition {
    //     transition: opacity .3s ease;
    //   }
    //   .fade-enter,
    //   .fade-leave {
    //     height: 0;
    //     opacity: 0;
    //   }
    //   .alert.top {
    //     position: fixed;
    //     top: 30px;
    //     margin: 0 auto;
    //     left: 0;
    //     right: 0;
    //     z-index: 1050;
    //   }
    //   .alert.top-right {
    //     position: fixed;
    //     top: 30px;
    //     right: 50px;
    //     z-index: 1050;
    //   }
    // </style>
  }
</script>
