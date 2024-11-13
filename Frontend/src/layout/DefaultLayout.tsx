import { Outlet } from "react-router-dom";
import TopHeader from "./headerLogin";
import Footer from "./footer";

const DefaultLayout = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <TopHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DefaultLayout;