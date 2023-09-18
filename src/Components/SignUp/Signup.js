import React from 'react';
import './Signup.css'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => this.setState({name: event.target.value});
    onEmailChange = (event) => this.setState({email: event.target.value});
    onPasswordChange = (event) => this.setState({password: event.target.value});

    // POST request to submit user info
    // Response by entering user to database, returns user 
    onSubmitSignup = () => {
        fetch('https://radiant-atoll-17458-147106ce8b79.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if(typeof user === 'object') {
                    this.props.loadUser(user);
                    this.props.signup();
                }
                else (console.log(user));
            })
    }

    render () {
        const { signup, login} = this.props; 
        return (
            <div className = 'signupContainer'>       
                <h2 style={{textTransform:'uppercase'}}>Register</h2>
                <label for="Name">Name</label>
                <input className='centerAligned' name="Name"type="text" onChange={this.onNameChange}/>
                <label for="Email">Email</label>
                <input className='centerAligned' name="Email"type="email" onChange={this.onEmailChange}/>
                <label for="Password">Password</label>
                <input className='centerAligned' name="Password"type="password" onChange={this.onPasswordChange} />
                <button onClick={this.onSubmitSignup} className='btnRegister'>Register</button>
                <p style={{alignSelf: 'center', marginTop: '0px'}}>Already have an account? <span onClick={() => login()}className='login'>Login.</span></p>
            </div>
        );
    }
}

export default Signup;