import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// Import hình ảnh
import logo from "../../assets/image/bg.png";

export default function Homepage(props) {
  return (
    <>
      <Header value={props}/>
      {/* Banner Section */}
      <div className="home_image flex justify-center items-center">
        <img src={logo} alt="Logo Bách Khoa" className="w-64 h-auto" />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
