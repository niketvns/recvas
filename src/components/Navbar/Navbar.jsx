import React from 'react';
import './Navbar.css';
import { BsGithub } from 'react-icons/bs'
import { AiFillLinkedin } from 'react-icons/ai'
import { FaTwitterSquare } from 'react-icons/fa';
import logo from '../../images/logo.png';

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="nav-left">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <ul className="menu">
                        <li className='active'>Home</li>
                        <a href="https://niket.netlify.app/" target='_blank'>
                            <li>Developer</li>
                        </a>
                    </ul>
                </div>
                <div className="nav-right">
                    <ul className="social-media">
                        <a href="https://github.com/niketvns" target='_blank'>
                            <li><BsGithub /></li>
                        </a>
                        <a href="https://www.linkedin.com/in/niket-kumar-mishra-37ab5a215/" target='_blank'>
                            <li><AiFillLinkedin /></li>
                        </a>
                        <a href="https://twitter.com/Niketmishravns" target='_blank'>
                            <li><FaTwitterSquare /></li>
                        </a>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar