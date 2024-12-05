import React from "react";
import StudentHeader from "./StudentHeader";
import AdminHeader from "./AdminHeader";
import GuestHeader from "./GuestHeader";

const Header = (props) => {
  const isLogin = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (!isLogin) {
    return <GuestHeader />;
  }

  switch (role) {
    case "student":
      return <StudentHeader />;
    case "spso":
      return <AdminHeader />;
    default:
      return <GuestHeader />;
  }
};

export default Header;
