import * as _ from 'lodash'

export function getPageFromSearch(search) {
  // remove leading '?'
  search = search.replace('?', '')
  // split query into key=value pairs
  const queryPairs = search.split('&').map(pairs => pairs.split('='))
  // find and get value of page
  return _.get(_.find(queryPairs, o => o[0] === 'page'), '[1]', 1)
}

export function parseLinks(link) {
  // link headers look like these:
  // <https://api.github.com/user/810438/repos?page=2>; rel="next", <https://api.github.com/user/810438/repos?page=8>; rel="last"
  if (!link) return []
  link = link.split(',')
  return link.map(link => {
    const parts = link.split(';')
    // get 'rel' portion as label
    // get page as page
    return {
      label: parts[1].replace(' ', ''),
      page: parts[0].slice(parts[0].indexOf('?') + 1, parts[0].indexOf('>')),
    }
  })
}
