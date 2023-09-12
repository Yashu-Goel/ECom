import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="left part">
          <div className="upper">
            <div className="title ">About us</div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis assumenda exercitationem in.
            </p>
          </div>
          <div className="lower">
            <div className="title ">Contact</div>
            <div className="phone">
              <Link to="#">
                <i className="fas fa-phone-volume"></i>+123 45 67 89
              </Link>
            </div>
            <div className="email">
              <Link to="#">
                <i className="fas fa-envelope"></i>someone@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <div className="middle part">
          <div className="title ">Services</div>
          <div>
            <Link to="#">Web aplication</Link>
          </div>
          <div>
            <Link to="#">Web Design</Link>
          </div>
          <div>
            <Link to="#">Web UX Design</Link>
          </div>
          <div>
            <Link to="#">Mobile Application </Link>
          </div>
          <div>
            <Link to="#">Web User Interface Design</Link>
          </div>
        </div>
        <div className="right part">
          <div className="title ">Subscribe</div>
          <form action="#">
            <input type="text" placeholder="Enter your email " />
            <input type="submit" value="Send" />
            <div className="media-icons">
              <Link to="#">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
