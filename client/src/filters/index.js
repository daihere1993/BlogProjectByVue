import marked from 'marked'
import dateUtil from '../../../utils/dateUtil'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true
})

function date (val) {
  // 数据库中返回的是UTC时间, 得转化成本地时间
  val = new Date(val)
  return dateUtil.format(val, 'yyyy-MM-dd hh:mm:ss')
}

function markdown (str) {
  return marked(str)
}

export { markdown, date }
