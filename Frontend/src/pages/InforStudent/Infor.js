import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { authAPI } from "../../axios/auth";
import paperAPI from '../../axios/paperAPI';

// import "./infor.css";

// Import hình ảnh
import logo from "../../assets/image/profile.jpg";
import bg from "../../assets/image/bg.png";

export default function Homepage(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPaper, setCurrentPaper] = useState(0); // Số trang hiện tại


  // Gọi API để lấy thông tin người dùng
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await authAPI.getUserInfo();
        console.log("Thông tin người dùng:", data);
        setUserInfo(data); // Lưu thông tin người dùng vào state

        // Lấy thông tin số trang hiện tại
        const paperInfo = await paperAPI.getPaperInfo();
        console.log("Lay thong tin Balance", paperInfo);
        setCurrentPaper(paperInfo.paper_balance || 0); // Đặt giá trị mặc định nếu không có dữ liệu
      } catch (err) {
        setError("Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.");
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return (
      <div>
        <Header value={props} />
        <div className="error-message">{error}</div>
        <Footer />
      </div>
    );
  }

  // Nếu chưa có thông tin người dùng, hiển thị trạng thái đang tải
  if (!userInfo) {
    return (
      <div>
        <Header value={props} />
        <div className="loading-message">Đang tải thông tin người dùng...</div>
        <Footer />
      </div>
    );
  }

  // Hiển thị thông tin người dùng
  return (
    <>
      <Header value={props} />
      <div className="pb-10 mb-36 max-w-2xl min-h-fit mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img className="object-cover object-top w-full" src={bg} alt="Background" />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img className="object-cover object-center h-32" src={logo} alt="User Avatar" />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{userInfo.name || "Tên người dùng"}</h2>
          <p className="text-gray-500">{userInfo.email || 'NA/N'}</p>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="mt-1 text-xl font-bold">Số giấy in {currentPaper}</span>
          </li>

        </ul>
      </div>
      <Footer />
    </>
  );
}
