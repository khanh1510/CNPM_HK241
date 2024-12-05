/* eslint-disable no-unused-vars */
import React from "react";
import hcmut from '../../assets/image/bk_logo_2.png';
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from 'react-router-dom';

import './select.css';

function SelectMember(props) {
  // Handle user role selection
  const navigate = useNavigate();

  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("token", "none");
  props.value['isLogin'] = false;

  const handleUser = () => {
    props.value['role'] = 'student';
    localStorage.setItem("isLoggedIn", "false");
    props.value['isLogin'] = false;
    console.log('Select Member', props.value);
    navigate('/login');
  };

  // Handle admin role selection
  const handleAdmin = () => {
    props.value['role'] = 'spso';
    localStorage.setItem("isLoggedIn", "false");
    props.value['isLogin'] = false;
    console.log('Select Member', props.value);
    navigate('/login');
  };

  console.log('Select Member', props.value);

  return (
    <>
    <div className="login-wrapper">
      <div className="login-container">
        <div role="main">
          <span id="maincontent"></span>
          <div className="loginform">
            <div className="login-logo">
              <img src={hcmut} alt="Logo" />
            </div>

            <div className="login-divider"></div>

            <div className="logo-indenti">
              <h2 className="login-heading">Đăng nhập dành cho</h2>
              <button 
                className="btn login-indenti" 
                onClick={handleUser}
              >
                Cán bộ/ Sinh viên trường ĐH Bách Khoa Tp.HCM
              </button>
              <button 
                className="btn login-indenti" 
                onClick={handleAdmin}
              >
                Nhân viên SPSO
              </button>

            </div>

            <div className="login-divider"></div>

            <div className="d-flex">
              <div className="login-languagemenu">Vietnamese</div>
              <button type="button" className="btn btn-secondary">
                Cookies notice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer */}
    <Footer />

    </>
  );
}

export default SelectMember;
