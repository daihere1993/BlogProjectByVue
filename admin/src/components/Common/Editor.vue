<template>
    <div>
      <textarea style="opacity: 0"></textarea>
    </div>
</template>
<script>
  import SimpleMDE from 'SimpleMDE'
  import 'highlight.js'
  export default {
    name: 'editor',
    data () {
      return {}
    },
    props: {
      content: {
        type: String,
        required: true
      },
      previewClass: String
    },
    mounted () {
      const element = this.$el.firstElementChild
      this.smde = new SimpleMDE({
        initialValue: this.content,
        element: element,
        spellChecker: false
      })

      // 添加自定义的previewClass
      const previewClass = this.previewClass || ''
      this.addPreviewClass(previewClass)

      this.smde.codemirror.on('change', () => {
        let value = this.smde.value()
        this.$emit('mdEditorInput', value)
      })
    },
    methods: {
      addPreviewClass (className) {
        const wrapper = this.smde.codemirror.getWrapperElement()
        const preview = document.createElement('div')
        wrapper.nextSibling.className += ` ${className}`
        preview.className = `editor-preview ${className}`
        wrapper.appendChild(preview)
      }
    },
    beforeDestroy () {
      this.smde.toTextArea()
      let editor = document.getElementById('editor')
      editor.outerHTML = editor.outerHTML
    },
    watch: {
      content (val) {
        if (val !== '') {
          this.$nextTick(() => {
            if (this.smde) {
              if (val !== this.smde.value()) {
                this.smde.value(val)
              }
            }
          })
        }
      }
    }
  }
</script>
