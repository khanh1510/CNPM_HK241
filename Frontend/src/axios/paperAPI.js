import axiosClient from './axiosConfigs';

const paperAPI = {
  // API để lấy thông tin người dùng
  getUserInfo: async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      console.log("Day la token", token);
      
      // Nếu không có token, thông báo lỗi
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      // Gửi request với header Authorization
      const response = await axiosClient.get('/user/me', {
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
  },

  // API để lấy thông tin số trang hiện có
  getPaperInfo: async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axiosClient.get('/student/info', {
        headers: {
          Authorization: `Bearer ${token}` // Gửi kèm Authorization token
        }
      });
      return response;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin số trang:', error);
      throw error;
    }
  },

  // API để mua giấy
  buyPaper: async (userId, quantity) => {
    try {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (!token) {
        throw new Error('Bạn cần đăng nhập để thực hiện hành động này.');
      }

      // Tạo dữ liệu gửi trong body dưới dạng x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('paper_number', quantity); // Thêm cặp key-value vào body

      // Gửi yêu cầu POST với Authorization header và body dưới dạng x-www-form-urlencoded
      const response = await axiosClient.post(
        `/student/buy-paper/${userId}`, // Đường dẫn API với userId
        formData, // Dữ liệu body dạng x-www-form-urlencoded
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Header chứa token Authorization
            'Content-Type': 'application/x-www-form-urlencoded', // Chỉ rõ kiểu dữ liệu gửi đi
          },
        });

      return response; // Trả về dữ liệu phản hồi từ API
    } catch (error) {
      console.error('Lỗi khi mua giấy:', error);
      throw error; // Ném lỗi ra ngoài để xử lý ở component gọi API
    }
  },
};

export default paperAPI;
