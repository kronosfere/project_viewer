import React from 'react'
import { withRouter } from 'react-router-dom'

class UserInputForm extends React.Component {
  static displayName = 'components.UserInputForm'

  constructor(props) {
    super(props)
    this.state = { value: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    const { value } = this.state
    event.preventDefault()
    if (!!value) {
      this.props.history.push(`/${value}/`)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

UserInputForm = withRouter(UserInputForm)
export default UserInputForm
