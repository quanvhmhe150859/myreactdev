// Header.js
import React from "react";
import headerBg from '../assets/images/header-bg.jpg';

function Header() {
    return (
            <header class="masthead" style={{ backgroundImage: `url(${headerBg})` }}>
                <div class="container">
                    <div class="masthead-subheading">Welcome To Our Shop!</div>
                    <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                    <a class="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
                </div>
            </header>
    );
}

export default Header;
