import axiosClient from "./axiosConfigs";

const printAPI = {
  postPrint: async (params) => {
    try {

      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Bạn cần đăng nhập để thực hiện hành động này.');
      }


      const response = await axiosClient.post('/printing/print', params, {
        headers: {
          'Authorization': `Bearer ${token}`, // Header chứa token Authorization
          'Content-Type': 'multipart/form-data', // Đặt loại nội dung cho dữ liệu form
        },
      });
      console.log(response);
      return response; // Trả về phản hồi từ máy chủ
    } catch (error) {
      console.error("Print error:", error);
      throw error; // Ném lỗi ra ngoài để component xử lý
    }
  }
};

export default printAPI;



//Cách sử dụng 
// import { printAPI } from './printAPI';

// Dữ liệu mà bạn muốn gửi (theo cấu trúc trong bức ảnh)
// const printParams = new FormData();
// printParams.append('file1', file1); // file1: tệp PDF
// printParams.append('file2', file2); // file2: tệp DOCX
// printParams.append('printer_id', printerId); // ID máy in
// printParams.append('copies_number', 1); // Số bản sao
// printParams.append('files[0][page_number]', 'A4'); // Kích thước trang
// printParams.append('files[0][from_page]', 1); // Trang bắt đầu
// printParams.append('files[0][single_side]', true); // In một mặt

// // Gọi API
// printAPI.postPrint(printParams)
//   .then(response => {
//     console.log('Print successful:', response);
//   })
//   .catch(error => {
//     console.error('Print failed:', error);
//   });