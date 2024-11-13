import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-900 text-white py-6 px-8">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    <FontAwesomeIcon icon={faTiktok} size="2x" />
                </div>
                <div className="flex flex-col items-end text-sm">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>268 Lý Thường Kiệt, P.14, Q.10, TP. HCM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>(037) 945 5486</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>ssps@hcmut.edu.vn</span>
                    </div>
                </div>
            </div>
            <p className="text-center">LIÊN KẾT MẠNG XÃ HỘI</p>
        </footer>
    );
};

export default Footer;
