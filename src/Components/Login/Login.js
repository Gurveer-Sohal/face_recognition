import React from 'react';
import './Login.css'
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    // POST Request to authenticate 
    // 
    onLoginClick = (event) => {
        console.log(this.state.email, this.state.password);
        fetch('https://radiant-atoll-17458-147106ce8b79.herokuapp.com/signin', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => res.json())
        .then(user => {
            if (typeof user === 'object') {
                this.props.loadUser(user);
                this.props.resetUrl();
                this.props.login();

            }
        })
    }

    render () {
        const { login, signup } = this.props;
        return (
            <div className = 'loginContainer'>       
    
                <h2 style={{textTransform:'uppercase'}}>Login</h2>
                <label for="Email">Email</label>
                <input className='centerAligned' name="Email"type="email" onChange={this.onEmailChange}/>
                <label for="Password">Password</label>
                <input className='centerAligned' name="Password"type="password" onChange={this.onPasswordChange}/>
                <div className='RemembermeContainer'>
                    <input type="checkbox" name='checkbox' value={'Remember me?'} />
                    <label htmlFor="checkbox"> Remember me?</label>
                </div>
                <button onClick={this.onLoginClick} className='btnLogin'>LOGIN</button>
                <div>
                    <p>Forgot password?</p>
                </div>
                <p style={{alignSelf: 'center', marginTop: '0px'}}>Need an account? <span onClick={() => signup()} className='signup'>Sign Up.</span></p>
            </div>
        );
    }
    
}
export default Login;
