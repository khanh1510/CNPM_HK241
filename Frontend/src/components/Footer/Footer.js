import React from "react";


import mapIcon from "../../assets/image/map.png";
import phoneIcon from "../../assets/image/phone.png";
import mailIcon from "../../assets/image/mail.png";
import facebookIcon from "../../assets/image/icon-facebook 1.png"
import instaIcon from "../../assets/image/icon-instagram 1.png"
import youtubeIcon from "../../assets/image/logoYoutube 1.png"
import linkedinIcon from "../../assets/image/logoLinkedIn 1.png"
import tiktokIcon from "../../assets/image/logoTiktok 1.png"


import "./Footer.css";

const Footer = () => {
  return (
    <>
        <footer>
            <div className="container">
                <div className="group1">
                    <h2>LIÊN KẾT MẠNG XÃ HỘI</h2>
                
                    <div className="social-links">
                        <a href="https://hcmut.edu.vn/"><img src={facebookIcon} alt="Facebook"/></a>
                        <a href="https://hcmut.edu.vn/"><img src={instaIcon} alt="Instagram"/></a>
                        <a href="https://hcmut.edu.vn/"><img src={youtubeIcon} alt="YouTube"/></a>
                        <a href="https://hcmut.edu.vn/"><img src={linkedinIcon} alt="LinkedIn"/></a>
                        <a href="https://hcmut.edu.vn/"><img src={tiktokIcon} alt="TikTok"/></a>
                    </div>
                </div>
                
        
                <div className="contact-info">
                    <div className="item-info">
                        <img src={mapIcon} alt="Location"/>
                        <span id="tiny">268 Lý Thường Kiệt, P.14, Q.10, TP. HCM</span>
                    </div>
                    <div className="item-info">
                        <img src={phoneIcon} alt="Phone"/>
                        <span id="tiny">(037) 945 5486</span>
                    </div>
                    <div className="item-info">
                        <img src={mailIcon} alt="Email"/>
                        <span id="tiny">ssps@hcmut.edu.vn</span>
                    </div>
                </div>
            </div>
        </footer>
    </>
  );
};

export default Footer;
