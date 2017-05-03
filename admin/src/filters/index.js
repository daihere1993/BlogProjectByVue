import marked from 'marked'
import { trim } from '../lib/utils'
import dateUtil from '../lib/dateUtil'

function date (val) {
  // 数据库中返回的是UTC时间, 得转化成本地时间
  val = new Date(val)
  return dateUtil.format(val, 'yyyy-MM-dd HH:mm:ss')
}

function md2text (markdown) {
  let div = document.createElement('div')
  div.innerHTML = marked.parse(markdown)
  return trim(div.innerText)
}


export { date, md2text }