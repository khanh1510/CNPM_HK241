import axiosClient from './axiosConfigs';

const printerAPI = {
  // API để cập nhật thông tin máy in
  updatePrinter: async (printerId, name, description, campus, location, status) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Bạn cần đăng nhập để thực hiện hành động này.');
      }

      // Tạo dữ liệu gửi trong body dưới dạng x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('id', printerId); // Thêm ID máy in
      formData.append('name', name); // Thêm tên máy in
      formData.append('description', description); // Thêm mô tả máy in
      formData.append('campus', campus); // Thêm thông tin campus
      formData.append('location', location); // Thêm vị trí máy in
      formData.append('status', status); // Thêm trạng thái máy in (enable/disable)
      console.log("TESST", printerId, name, description, campus, location, status );
      // console.log("HMMM: ", formData);
      // Gửi yêu cầu PUT để cập nhật thông tin máy in
      const response = await axiosClient.put('/printer/edit-printer', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Header chứa token Authorization
          'Content-Type': 'application/x-www-form-urlencoded', // Kiểu dữ liệu gửi đi
        },
      });

      return response; // Trả về phản hồi từ API
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin máy in:', error);
      throw error; // Ném lỗi ra ngoài để xử lý ở component gọi API
    }
  },

  // API để lấy tất cả thông tin máy in với tham số tìm kiếm
  getAllPrinters: async (searchValue) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Bạn cần đăng nhập để thực hiện hành động này.');
      }

      // Gửi yêu cầu GET với tham số tìm kiếm
      const response = await axiosClient.get('/printer/all-printer', {
        headers: {
          'Authorization': `Bearer ${token}`, // Header chứa token Authorization
        },
        params: {
          search: searchValue, // Tham số tìm kiếm
        },
      });

      return response; // Trả về dữ liệu phản hồi từ API
    } catch (error) {
      console.error('Lỗi khi lấy thông tin máy in:', error);
      throw error; // Ném lỗi ra ngoài để xử lý ở component gọi API
    }
  },

  createPrinter: async (id, name, description, campus, location, status) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Bạn cần đăng nhập để thực hiện hành động này.');
      }

      // Tạo dữ liệu gửi trong body dưới dạng x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('id', id); // Tên máy in
      formData.append('name', name); // Tên máy in
      formData.append('description', description); // Mô tả máy in
      formData.append('campus', campus); // Thông tin campus
      formData.append('location', location); // Vị trí máy in
      formData.append('status', status); // Trạng thái máy in (enable/disable)

      // Gửi yêu cầu POST để tạo máy in mới
      const response = await axiosClient.post('/printer/create-printer', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Header chứa token Authorization
          'Content-Type': 'application/x-www-form-urlencoded', // Kiểu dữ liệu gửi đi
        },
      });

      return response; // Trả về phản hồi từ API
    } catch (error) {
      console.error('Lỗi khi tạo máy in:', error);
      throw error; // Ném lỗi ra ngoài để xử lý ở component gọi API
    }
  },

};

export default printerAPI;
