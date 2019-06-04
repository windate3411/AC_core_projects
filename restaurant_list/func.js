function search(arr, keyword) {
  const re = new RegExp(keyword, 'i')
  const results = arr.filter(item => re.test(item.name) || re.test(item.category))
  return results
}

module.exports = search