<template>
    <div>
      <textarea id="editor" style="opacity: 0"></textarea>
    </div>
</template>
<script>
  import { marked } from '../../lib/utils'
  import SimpleMDE from 'simplemde'
  export default {
    name: 'editor',
    data () {
      return {}
    },
    props: {
      content: {
        type: String,
        required: true
      }
    },
    mounted () {
      this.smde = new SimpleMDE({
        initialValue: this.content,
        autoDownloadFontAwesome: false,
        element: document.getElementById('editor'),
        previewRender: function (plainText) {
          return marked(plainText) // Returns HTML from a custom parser
        },
        spellChecker: false
      })
      this.smde.codemirror.on('change', () => {
        let value = this.smde.value()
        if (this.content === value) {
          return
        }
        this.content = value
      })
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
