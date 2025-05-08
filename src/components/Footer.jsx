import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [Links, setLinks] = useState(false);
  const [Gallery, setGallery] = useState(false);
  const [Contact, setContact] = useState(false);
  return (
    <footer>
      <section class="contact">
        <div class="contact-1">
          <i class="fa fa-phone" id="call" aria-hidden="true"></i>
          <p class="question">DO YOU HAVE A QUESTION?</p>
          <p class="number">+0123 456 789</p>
        </div>
        <div class="contact-2">
          <div>
            <i class="fa fa-envelope-o" id="mail" aria-hidden="true"></i>
            <input
              type="search"
              placeholder="Enter email"
              className="text-black"
            />
          </div>
          <button
            onClick={() => {
              alert("subscribed!!!");
            }}
          >
            Subscribe
          </button>
        </div>
      </section>

      <section class="footer">
        <div class="footer-content">
          <div class="footer-about">
            <h1>OUR MISSION</h1>
            <p>
              Access to safe and affordable housing is a fundamental human right
               and endeavor that can significantly improve the lives of the
              community's residents. yet many communities across Canada face rising rents, stagnant wages, and a lack of transparent
              data that reflects their lived realities and urgent needs
            </p>
            <br />
            <p>
              Our mission is to address the disconnect between housing data and real-life experiences by building an open, free, 
              and continuously maintained housing data tool that is both technically sound and socially aware.
            </p>
          </div>

          <div class="footer-links">
            <h2
              class="links"
              onClick={() => {
                setLinks(!Links);
              }}
            >
              QUICK LINKS
            </h2>
            <br />
            <ul class={"footer-links-ul " + (Links && "active-links")}>
              <li>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                <Link to="/">Home</Link>
              </li>
              <li>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                <Link to="about">About</Link>
              </li>
              <li>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                <Link to="causes">Causes</Link>
              </li>
              <li>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                <Link to="event">Events</Link>
              </li>
              <li>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                <Link to="news">News</Link>
              </li>
              <li>
                <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                <Link to="contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div class="gallery">
            <h2
              class="gal-btn"
              onClick={() => {
                setGallery(!Gallery);
              }}
            >
              GALLERY
            </h2>
            <div class={"gal-container " + (Gallery && "gal-container-active")}>
              <div>
                <img src="assets/ga1.png" />
                <img src="assets/ga2.png" />
              </div>
              <div>
                <img src="assets/gap3.png" />
                <img src="assets/gal4.png" />
              </div>
              <div>
                <img src="assets/gal5.png" />
                <img src="assets/gal6.png" />
              </div>
            </div>
          </div>

          <div class="contact-footer">
            <h2
              class="contact-btn"
              onClick={() => {
                setContact(!Contact);
              }}
            >
              CONTACT US
            </h2>

            <div
              class={
                "contact-container " + (Contact && "contact-container-active")
              }
            >
              <div class="contact-card">
                <div class="contact-heading">
                  <div class="location">
                    <i class="fa fa-map-marker one" aria-hidden="true"></i>
                  </div>
                  <h3>Head Office</h3>
                </div>
                <div class="contact-ad">
                  <p>Vancouver, British Columbia</p>
                  <p><Canada></Canada></p>
                </div>
              </div>
              <div class="contact-card">
                <div class="contact-heading">
                  <div class="location">
                    <i class="fa fa-phone two" aria-hidden="true"></i>
                  </div>
                  <h3>Phone Number</h3>
                </div>
                <div class="contact-ad">
                  <p>204-78 George St, Ottawa</p>
                  <p>Canada</p>
                </div>
              </div>
              <div class="contact-card">
                <div class="contact-heading">
                  <div class="location">
                    <i class="fa fa-envelope three" aria-hidden="true"></i>
                  </div>
                  <h3>Email</h3>
                </div>
                <div class="contact-ad">
                  <p>204-78 George St, Ottawa</p>
                  <p>Canada</p>
                </div>
              </div>
            </div>
          </div>
          <p class="copyright">
            Copyright @ 2025. Developed by Daniel Ajenifuja. All Rights Reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
