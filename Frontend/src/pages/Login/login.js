import React, { useEffect, useState } from 'react';
// import hcmut from '../../assets/image/bk_logo.png';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import {useNavigate  } from 'react-router-dom';
// import {UserData} from '../../data/UserData';
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './login.css'

import { authAPI } from "../../axios/auth";
// import { FiEye, FiEyeOff } from "react-icons/fi";


const Login = (props) => {
  const [infoLogin, setInfoLogin] = useState({
      email: '',
      password: '',
      role: props.value['role']
  });
  // const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
          navigate("/");
      }
  }, [navigate]);

  const handleEmailChange = (e) => {
      setInfoLogin({ ...infoLogin, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
      setInfoLogin({ ...infoLogin, password: e.target.value });
  };

  const handleKeyDown = (e) => {
      if (e.getModifierState("CapsLock")) {
          setCapsLockOn(true);
      } else {
          setCapsLockOn(false);
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Login");
      try {
          const response = await authAPI.postLogin(infoLogin);
          if (response) {
            toast.success("Đăng nhập thành công!");
            console.log("Đăng nhập thành công");
            const hmm = props.value['role']
            // Lưu thông tin đăng nhập vào localStorage
            localStorage.setItem("token", response["accessToken"]);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", hmm);

            props.value['isLogin'] = true;

            navigate("/");
          } else {
              console.log("Đăng nhập thất bại!");
              toast.error("Đăng nhập thất bại!");
          }
      } catch (error) {
          console.error("Lỗi khi đăng nhập:", error);
          toast.error("Lỗi khi đăng nhập!");
      }
  };

  return (
    <>
      <Header value={props}/>
      <div className="login-form">
            <div className="login">
                <div className="login-input">
                    <h2>Email</h2>
                    <input name="email" 
                          id="email" 
                          type="text" 
                          placeholder="@hcmut.edu.vn"
                          value={infoLogin.email}
                          onChange={handleEmailChange}
                    />
                </div>
                <div className="login-input">
                    <h2>Password</h2>
                    <input name="password" 
                          id="password" 
                          type="password"
                          value={infoLogin.password}
                          onChange={handlePasswordChange}
                          onKeyDown={handleKeyDown}
                    />
                    {capsLockOn && (
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-2 text-xs font-semibold text-white bg-red-500 rounded-lg shadow-md whitespace-nowrap">
                            WARNING: CAPS Lock is on
                        </div>
                    )}
                </div>
                
                
                <button onClick = {handleSubmit} type='submit' >Đăng nhập</button>
            </div>
        </div>  
      <Footer />
    </>
  );
}

export default Login;