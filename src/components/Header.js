// Header.js
import React from "react";

function Header() {
    return (
            <header class="masthead" style={{ backgroundImage: "url(/images/header-bg.jpg)" }}>
                <div class="container">
                    <div class="masthead-subheading">Welcome To Our Shop!</div>
                    <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
                    <a class="btn btn-primary btn-xl text-uppercase buttoncolor" href="#services">Tell Me More</a>
                </div>
            </header>
    );
}

export default Header;
