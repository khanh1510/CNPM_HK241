import React, { createContext, useContext } from "react";

// Tạo context cho auth
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Provider quản lý role
export const AuthProvider = ({ children }) => {
  const [role, setRole] = React.useState("guest"); // role mặc định

  // Cập nhật role (lấy từ API, LocalStorage, v.v.)
  React.useEffect(() => {
    const userRole = localStorage.getItem("role") || "guest"; // giả sử lưu role ở localStorage
    setRole(userRole);
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
