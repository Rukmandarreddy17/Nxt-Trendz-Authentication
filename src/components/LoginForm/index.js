import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    errorMsg1: '',
    errorMsg2: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    this.setState({errorMsg: '', errorMsg1: '', errorMsg2: ''})

    if (username === '') {
      this.setState({errorMsg1: '*Username should not be empty'})
      return
    }

    if (password === '') {
      this.setState({errorMsg2: '*Password should not be empty'})
      return
    }

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess()
    } else {
      this.setState({errorMsg: "*Username and Password didn't match"})
    }
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, errorMsg1, errorMsg2} = this.state
    return (
      <div className="bgContainer">
        <div className="c1">
          <img
            className="websiteLoginImg"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
          />
          <form className="fromContainer" onSubmit={this.submitForm}>
            <img
              className="nxtTrendzLogo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
            />
            <label htmlFor="username" className="labelElement">
              USERNAME
            </label>
            <input
              onChange={this.updateUsername}
              className="inputElement"
              id="username"
              value={username}
              type="text"
              placeholder="Username"
            />
            <p className="errormsg">{errorMsg1}</p>
            <label htmlFor="password" className="labelElement">
              PASSWORD
            </label>
            <input
              onChange={this.updatePassword}
              className="inputElement"
              id="password"
              value={password}
              type="password"
              placeholder="Password"
            />
            <p className="errormsg">{errorMsg2}</p>
            <button className="loginButton" type="submit">
              Login
            </button>
            <p className="errormsg">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
