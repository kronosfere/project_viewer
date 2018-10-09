import React from 'react'

import UserInputForm from './UserInputForm'

class NavMain extends React.Component {
  static displayName = 'components.NavMain'

  render() {
    const { history } = this.props
    const { user } = this.props.match.params

    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        {!!user && <button onClick={history.goBack}>Back</button>}
        <button onClick={() => history.push('/')}>Main</button>
        <UserInputForm />
      </div>
    )
  }
}

export default NavMain
