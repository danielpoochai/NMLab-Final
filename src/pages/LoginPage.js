import React from 'react';
import './LoginPage.css';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.state = {hidden: true};
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    if (this.checkAccount(data.get('username'))) {
      if (data.get('password') ==='123')
        console.log('Correct');
      else 
        alert('Invalid Password')
    }
    else {
      alert('Invalid Account')
    }
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  handleRegister(event){
    event.preventDefault();
    console.log('regist!');
  }

  checkAccount(username){
    if (username === '123')
      return true
    return false
  }

  render() {
    const style = {
      width: '90%',
      padding: '12px',
      display: 'inline-block',
      border: '1px solid #ccc',
    };
    return (
      <div>
        <h1>Please Login!</h1>
        <form onSubmit={this.handleSubmit}>
          
          <label htmlFor="username" className="my_label">Enter username:</label>
          <input id="username" name="username" type="text" className="login_input"/>
          
          <label htmlFor="password" className="my_label">Enter your password:</label>
          <input style={style} id="password" name="password" type={this.state.hidden ? "password" : "text"} />
          
          <span className="password__show" onClick={this.toggleShow}> {this.state.hidden === true ? 'Show':'Hide' }</span>

          <input type="submit" value="Login" className="login_input"/>
        </form>
        <button onClick={this.handleRegister}>Register!</button>
      </div>
    );
  }
}

export default LoginPage;

/*
        {this.state.errorMsg &&
          <h1>{this.state.errorMsg}</h1>
        }
*/