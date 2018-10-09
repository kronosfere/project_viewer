import React from 'react'

import * as constants from '../constants'

class ProjectView extends React.Component {
  static displayName = 'ProjectView'

  constructor(props) {
    super(props)
    this.state = { data: constants.DATA_LOADING }

    this.requestReadme(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ data: constants.DATA_LOADING, links: [] })

      this.requestRepos(nextProps)
    }
  }

  requestReadme(props) {
    const { user, project } = this.props.match.params
    const Http = new XMLHttpRequest()
    const url = `${constants.API_URL}/repos/${user}/${project}/readme`
    Http.open('GET', url)
    Http.setRequestHeader('Accept', 'application/vnd.github.html+json')

    Http.onload = () => {
      switch (Http.status) {
        case 200:
          this.setState({
            data: Http.response,
          })
          break
        default:
          this.setState({ data: constants.DATA_ERROR })
      }
    }

    Http.send()
  }

  render() {
    const { data } = this.state

    switch (data) {
      case constants.DATA_LOADING:
        return <div>Loading...</div>
      case constants.DATA_ERROR:
        return <div>Request Error</div>
      default:
        return <div dangerouslySetInnerHTML={{ __html: data }} />
    }
  }
}

export default ProjectView
