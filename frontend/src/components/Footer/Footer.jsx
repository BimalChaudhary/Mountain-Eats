import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="img" src={assets.logo} alt="" />
          <p>
            Mountain Eats is a dynamic food delivery platform designed to cater
            to the culinary cravings of individuals residing in or visiting
            mountainous regions. With a focus on convenience, variety, and
            quality, Mountain Eats bridges the gap between local eateries and
            customers, offering a seamless dining experience from the comfort of
            one's home or lodge. The platform stands out by celebrating the
            unique gastronomic heritage of mountainous areas, curating a diverse
            array of dishes ranging from traditional regional specialties to
            popular international cuisines. By partnering with an extensive
            network of local restaurants, cafes, and food vendors, Mountain Eats
            ensures that users have access to freshly prepared meals crafted
            with authentic ingredients.
          </p>
          <div className="footer-social-icon">
            <a
              href="https://www.facebook.com/Bimal.Chaudhary.2058"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a
              href="https://x.com/i/flow/login?redirect_after_login=%2FVimalCh10975830"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a
              href="https://www.linkedin.com/in/bimalchaudhary/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+977-9832144568</li>
            <li>contact@mountainteats.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 © MountainEats.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
