import mo2js from 'mo2js' 
import marked from 'marked'
import { trim } from '../lib/utils'

function date (val) {
  // 数据库中返回的是UTC时间, 得转化成本地时间
  val = new Date(val)
  return mo2js.date.format(val, 'YYYY-MM-DD HH:mm:ss')
}

function md2text (markdown) {
  let div = document.createElement('div')
  div.innerHTML = marked.parse(markdown)
  return trim(div.innerText)
}


export { date, md2text }