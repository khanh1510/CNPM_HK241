import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logoBK.png";
import './header.css'

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Xóa token hoặc thông tin lưu trữ
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    // Điều hướng về trang đăng nhập
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100); // Delay nhỏ để đảm bảo điều hướng hoàn tất trước khi reload
  };

  return (
    <nav class="bg-[#132d65]">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a onClick={() => handleNavigation("/")} href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} class="h-10" alt="Flowbite Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">HCMUT</span>
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={handleLogout} type="button" class="text-[#132d65] bg-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center ">Đăng xuất</button>
          <button  data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-cta" aria-expanded="false">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-[#132d65] text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
            <li>
              <a href="/" class="block py-2 px-3 md:p-0  rounded md:bg-transparent" aria-current="page">Trang chủ</a>
            </li>
            <li>
              <a href="/log" onClick={() => handleNavigation("/log")} class="block py-2 px-3 md:p-0 ">Lịch sử in ấn</a>
            </li >
            <li>
              <a href="/managePrinter" onClick={() => handleNavigation("/managePrinter")} class="block py-2 px-3 md:p-0 ">Quản lý máy in</a>
            </li>
            <li> 
              <a href="/setting" onClick={() => handleNavigation("/setting")} class="block py-2 px-3 md:p-0 ">Cài đặt</a>
            </li>
          </ul>
        </div>     
      </div>
    </nav>
  );
};

export default AdminHeader;
