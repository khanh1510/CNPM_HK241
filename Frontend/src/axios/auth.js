import axiosClient from "./axiosConfigs";

export const authAPI = {
  postLogin: async (params) => {
    try {
      const response = await axiosClient.post('/auth/login', {
        email: params.email,
        password: params.password,
        role: params.role,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  getUserInfo: async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      console.log("Day la toke", token);
      
      // Nếu không có token, thông báo lỗi
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      // Gửi request với header Authorization
      const response = await axiosClient.get('/student/info', {
        headers: {
          Authorization: `Bearer ${token}` // Sử dụng Bearer token
        }
      });

      console.log(response);

      return response; // Trả về dữ liệu người dùng
    } catch (error) {
      console.error("Error in getUserInfo:", error);
      throw error; // Ném lỗi ra ngoài để component xử lý
    }
  }
};