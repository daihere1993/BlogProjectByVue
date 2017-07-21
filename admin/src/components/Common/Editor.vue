<template>
    <div>
      <textarea style="opacity: 0"></textarea>
    </div>
</template>
<script>
  import api from '../../services/index.js'
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
        spellChecker: false,
        toolbar: {
          image: {
            action: null,
            className: 'md-upload-img fa fa-picture-o',
            whenEleCreate: function (el) {
              let self = this
              // add custom class
              el.classList.add('md-upload-img')
              // append input element
              let inputEle = document.createElement('input')
              inputEle.setAttribute('type', 'file')
              inputEle.setAttribute('multiple', true)
              inputEle.setAttribute('accept', 'image/*')
              el.appendChild(inputEle)

              inputEle.onchange = (evt) => {
                let imgs = evt.currentTarget.files
                if (imgs.length) {
                  // let xhr = new window.XMLHttpRequest()
                  let formData = new window.FormData()
                  for (let i = 0; i < imgs.length; i++) {
                    formData.append('upload_img_' + i, imgs[i])
                  }

                  api.post('upload', formData).then(res => {
                    if (res.success) {
                      let cm = self.codemirror
                      let stat = self.getState()
                      let options = self.options
                      let urls = res.urls

                      urls.forEach((url) => {
                        self.replaceSelection(cm, stat.iamge, options.insertTexts.image, url)
                      })
                    }
                  })
                }
              }

              return el
            }
          }
        }
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
</script>
