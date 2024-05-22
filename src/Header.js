import './css/index.css';

import React from 'react';
import logo from './img/icons/logo.svg'; // replace with the actual path to your logo
import searchIcon from './img/icons/search.svg'; // replace with the actual path to your search icon
import userIcon from './img/icons/user.svg';
import basketIcon from './img/icons/basket.svg'
import {Link} from "react-router-dom";
import NotificationHandler from "./NotificationHandler"; // replace with the actual path to your user icon
import FirebaseHandler from "./FirebaseHandler";

const Header = () => {
    return (
        <header className="header">
            <div className="header__container container">
                <Link to="/" className="header__logo">
                    <img src={logo} alt="electronics" />
                </Link>
                <nav className="header__menu menu">
                    <ul className="menu__list">
                        <li>
                            <Link to="/" className="menu__link">Home</Link>
                        </li>
                        <li>
                            <a href="/" className="menu__link current__item">Products</a>
                        </li>
                        <li>
                            <a href="/add" className="menu__link">Create new product</a>
                        </li>
                    </ul>
                    <ul className="menu__icons">
                        <li>
                            <a href="/" className="menu__icon">
                                <img src={searchIcon} alt="Search" />
                            </a>
                        </li>
                        <li>
                            <Link to="/basket" className="menu__icon">
                                <img src={basketIcon} alt="Basket" />
                            </Link>
                        </li>
                        <li>
                            <a href="/login" className="menu__icon">
                                <img src={userIcon} alt="Profile" />
                            </a>
                        </li>
                        <li>
                            <NotificationHandler />
                        </li>
                        <li>
                            <FirebaseHandler />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
