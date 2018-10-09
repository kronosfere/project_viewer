import React from 'react'
import { Link } from 'react-router-dom'

import * as constants from '../constants'

import * as utils from '../utils'

class UserView extends React.Component {
  static displayName = 'UserView'

  constructor(props) {
    super(props)
    this.state = { data: constants.DATA_LOADING, links: [] }

    this.requestRepos(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ data: constants.DATA_LOADING, links: [] })
      this.requestRepos(nextProps)
    }
  }

  requestRepos(props) {
    const Http = new XMLHttpRequest()
    const user = props.match.params.user
    const page = utils.getPageFromSearch(props.location.search)
    const url = `${constants.API_URL}/users/${user}/repos?page=${page}`
    Http.open('GET', url)
    Http.onload = () => {
      switch (Http.status) {
        case 200:
          this.setState({
            data: JSON.parse(Http.response),
            links: utils.parseLinks(Http.getResponseHeader('link')),
          })
          break
        default:
          this.setState({ data: constants.DATA_ERROR })
      }
    }

    Http.send()
  }

  renderData() {
    const { data, links } = this.state
    const { user } = this.props.match.params
    switch (data) {
      case constants.DATA_LOADING:
        return <div>Loading...</div>
      case constants.DATA_ERROR:
        return <div>Request Error</div>
      default:
        return (
          <div>
            <div>{`${user}'s projects`}</div>
            {links.map(link => (
              <Link to={`/${user}/?${link.page}`} key={link.label}>
                {link.label}
              </Link>
            ))}
            {data.map(project => (
              <Link
                to={`/${user}/${project.name}/`}
                key={project.id}
                style={{ display: 'block' }}
              >
                {project.name}
              </Link>
            ))}
          </div>
        )
    }
  }

  render() {
    return <div>{this.renderData()}</div>
  }
}

export default UserView
