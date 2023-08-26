import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <div class="content">
          <div class="left part">
            <div class="upper">
              <div class="title ">About us</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis assumenda exercitationem in.
              </p>
            </div>
            <div class="lower">
              <div class="title ">Contact</div>
              <div class="phone">
                <a href="#">
                  <i class="fas fa-phone-volume"></i>+123 45 67 89
                </a>
              </div>
              <div class="email">
                <a href="#">
                  <i class="fas fa-envelope"></i>someone@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div class="middle part">
            <div class="title ">Services</div>
            <div>
              <a href="#">Web aplication</a>
            </div>
            <div>
              <a href="#">Web Design</a>
            </div>
            <div>
              <a href="#">Web UX Design</a>
            </div>
            <div>
              <a href="#">Mobile Application </a>
            </div>
            <div>
              <a href="#">Web User Interface Design</a>
            </div>
          </div>
          <div class="right part">
            <div class="title ">Subscribe</div>
            <form action="#">
              <input type="text" placeholder="Enter your email " />
              <input type="submit" value="Send" />
              <div class="media-icons">
                <a href="#">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
