import React from 'react';
import logo from '../Logo/logo.png';
import './Navigation.css';

const Navigation = ({login}) => {
    return (
        <nav className='Nav'>
            <img className='logo' src={logo} alt="Logo" />
            <button className='logout' onClick={() => login()} >Logout</button>
        </nav>
    );
}

export default Navigation;