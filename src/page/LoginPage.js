import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from "prop-types";
import Page from './Page';
import { doUserLogin } from '../user/actions'
import './LoginPage.css'

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.string,
  }
  constructor(props){
    super(props)

    this.state = {
      username:'',
      password:'',
      error:false,
      errorMsg:'',
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  
  onChange(e){
    const { name, value } = e.target
    this.setState({ [name] : value })
  } 

  onSubmit(e){
    e.preventDefault()

    const { username, password } = this.state
    
    if( !username || !password ){
      this.setState({ error: true, errorMsg: 'ID 혹은 비밀번호가 올바르지 않습니다.' }) 
      return null
    }
    this.props.login(username, password, this.props.history)
  }

  render(){
    const { username, password, error, errorMsg } = this.state

    return(
      <Page>
        <div className="login-page">
          <h2>Login</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input name="username" value={username} onChange={this.onChange} autoComplete="username" type="text" className="form-control" placeholder="사용자이름을 입력하세요."/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" value={password} onChange={this.onChange} autoComplete="current-password" type="password" className="form-control" placeholder="비밀번호"/>
            </div>
            { error && <div className="error">{errorMsg}</div> }
            { this.props.error && <div className="error">로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.</div> }
            <div className="button-div">
              <button className="btn btn-primary" type="submit">로그인</button>
            </div>
          </form>
        </div>
      </Page>
    )
  }
}

const mapState = ({user}) => (user)

const mapDispatch = (dispatch) => ({
  login: (username, password, history) => dispatch(doUserLogin(username, password, history))
})

export default withRouter(connect(mapState, mapDispatch)(LoginPage))