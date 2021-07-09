import React from "react";
import { Link } from "react-router-dom";

import "./nav.css";

const Footer = () => {

    return (
        <footer>
            <p>This site built by Sarah Booth Jacobs</p>
            <div id="about-links">
                <a href="https://angel.co/u/sarah-booth-jacobs"><i className="fab fa-angellist"></i></a>
                <a href="https://www.linkedin.com/in/sarah-jacobs-53433923/"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://github.com/boothjacobs"><i className="fab fa-github"></i></a>
            </div>
            <p>jacobs.b.sarah @ gmail.com</p>
        </footer>
    )
};

export default Footer;
