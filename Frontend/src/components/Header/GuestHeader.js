import React from "react";
import logo from "../../assets/image/logoBK.png";
import { useNavigate } from "react-router-dom";

const GuestHeader = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/role");
  };

  return (
    <div className="bg-[#132d65] w-full py-3 px-8 drop-shadow-lg">
      <div className="flex items-center justify-between px-8 py-4 bg-[#132d65] text-white">
        <div className="flex items-center">
          <img src={logo} alt="Logo HCMUT" className="w-12 h-12" />
          <div className="px-4">
            <h1 className="font-bold text-lg">
              ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH
            </h1>
            <h2 className="text-base">TRƯỜNG ĐẠI HỌC BÁCH KHOA</h2>
          </div>
        </div>
        <button
          onClick={handleLoginClick}
          className="text-[#132d65] bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default GuestHeader;
