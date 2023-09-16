import React from 'react';
import logo from './logo.png';
import './Logo.css'
const Logo = () => {
    return (
        <div className='logoContainer' style={{marginTop: '2em'}}>
            <img className='logo' src={logo} alt="Logo" />
        </div>
    );
}

export default Logo;