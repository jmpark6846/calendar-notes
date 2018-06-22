import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Page from './Page';
import { PASSWORD_MIN_LENGTH } from '../constants'
import { doUserRegister } from '../user/actions';
import './RegisterPage.css'
import Notice from '../ui/Notice';

class RegisterPage extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    errorMsg: PropTypes.array,
  }
  constructor(props){
    super(props)

    this.state={
      username:'',
      password:'',
      password2:'',
      error:false,
      errorMsg:'',
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.props.isAuthenticated){
      this.props.history.push('/calendar/')  
    }
  }
  
  onChange(e){
    const { name, value } = e.target
    this.setState({ [name] : value })
  }
  // TODO: VALIDATION을 서버 단에서 하기
  onSubmit(e){
    e.preventDefault()
    const { username, password, password2 } = this.state
    this.setState({error: false, errorMsg:''})

    if(password !== password2){
      this.setState({error:true, errorMsg:'비밀번호가 일치하지 않습니다.'})
      return null
    }

    if(password.length < PASSWORD_MIN_LENGTH){
      this.setState({error:true, errorMsg:`비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자리 이상입니다.`})
      return null
    }
    
    if(!username || !password || !password2){
      this.setState({error:true, errorMsg:'ID 혹은 비밀번호가 올바르지 않습니다.'})
      return null
    }
    
    this.props.register(username, password, this.props.history)
    
  }
  
  render() {
    const { username, password, password2, error, errorMsg } = this.state
    return (
      <Page>
        <div className="register-page">
          <h2>Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input name="username" value={username} onChange={this.onChange} autoComplete="username" type="text" className="form-control" placeholder="사용자이름을 입력하세요."/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" value={password} onChange={this.onChange} autoComplete="current-password" type="password" className="form-control" placeholder="비밀번호"/>
            </div>
            <div className="form-group">
              <input name="password2" value={password2} onChange={this.onChange} autoComplete="current-password" type="password" className="form-control" placeholder="비밀번호 확인"/>
            </div>
            { error && <Notice type='danger' msg={errorMsg}/> }
            { this.props.errorMsg && this.props.errorMsg.map((v)=><Notice key={v} type='danger' msg={v}/>)}
            <div className='button-div'>
              <button className="btn btn-primary" type="submit">가입</button>
            </div>
            
          </form>
        </div>
      </Page>
    )
  }
}
const mapState = ({user}) => (user)
const mapDispatch = (dispatch) => ({
  register : (username, password, history) => dispatch(doUserRegister(username, password, history))
})
export default withRouter(connect(mapState, mapDispatch)(RegisterPage))