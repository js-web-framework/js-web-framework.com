const timeAgoInWords = require('time_ago_in_words')
const ent = require('ent')
const web = require('js-web')
const slugify = require('slugify')

const hasCodeBlock = text =>
  text.indexOf('{(') > -1 && text.indexOf(')}') > text.indexOf('{(')

const removeEarlyClose = text =>
  (text.indexOf('{(') > -1 &&
  text.indexOf(')}') > -1 &&
  text.indexOf(')}') < text.indexOf('{(')
    ? text.replace(')}', '') : text)

const addCodeBlock = text =>
  text
    .replace(/\{\(/, '<pre><code>')
    .replace(/\)\}/, '</code></pre>')
    .replace('<pre><code><br />', '<pre><code>')

const enableCodeBlocks = text => (hasCodeBlock(text)
  ? enableCodeBlocks(addCodeBlock(removeEarlyClose(text)))
  : text)

const clean = text => text
  .replace(/([^a-z A-Z])/g, '')

const formatDate = (row, textField) => {
  row.created = timeAgoInWords(web.moment(row.created).toDate(), false)
  if (row.title) {
    row.titleLink = slugify(row.title)
  }
  row[textField] = enableCodeBlocks(
    ent.encode(row[textField]).replace(/&#13;&#10;/g, '<br />')
  )
  return row
}

module.exports.outputFormat = textField => row => formatDate(row, textField)
