import React, { useState } from "react";
import  printerAPI  from "../axios/printerAPI";
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


function Popup(props) { 
  // State để quản lý dữ liệu của form
  
  const [printerData, setPrinterData] = useState({
    id: props.selectedPrinter?.id || "", // ID của máy in (bắt buộc nếu cần cập nhật)
    name: props.selectedPrinter?.name || "",
    description: "none",
    campus: "cs1", // Giá trị mặc định là cơ sở 1
    location: "H6",
    status: "able", // Giá trị mặc định là trạng thái cho phép
  });

  // Hàm xử lý khi thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrinterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API để cập nhật thông tin máy in
      const response = await printerAPI.createPrinter( 
        printerData.id, // ID của máy in
        printerData.name, // Tên máy in
        printerData.description, // Mô tả
        printerData.campus, // Cơ sở
        printerData.location, // Vị trí
        printerData.status // Trạng thái
      );
      console.log("Tạo mới thành công:", response);
      

      // Đóng popup sau khi cập nhật
      props.setTrigger(false);
      toast.success("Tạo mới thành công");
      window.location.reload()

    } catch (error) {
      console.error("Lỗi khi tạo máy in:", error);
      toast.error("Lỗi khi tạo máy in");
    }
  };

  return props.trigger ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="form-container max-w-lg mx-auto px-20 py-8 bg-[#6da3d5] rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Thêm máy in</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Cơ Sở */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID máy in
            </label>
            <input
              type="text"
              name="id"
              value={printerData.id}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cơ Sở
            </label>
            <select
              name="campus"
              value={printerData.campus}
              onChange={handleChange}
              className="block w-full p-6 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="CS1 - Lý Thường Kiệt">Lý Thường Kiệt</option>
              <option value="CS2 - Dĩ An">Dĩ An</option>
            </select>
          </div>

          {/* Tên máy in */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên máy in
            </label>
            <input
              type="text"
              name="name"
              value={printerData.name}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <input
              type="text"
              name="description"
              value={printerData.description}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Vị trí */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vị trí
            </label>
            <input
              type="text"
              name="location"
              value={printerData.location}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={printerData.status}
              onChange={handleChange}
              className="block w-full p-6 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="able">Cho phép</option>
              <option value="disable">Vô hiệu</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Lưu
            </button>
            <button
              onClick={() => props.setTrigger(false)}
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Hủy
            </button>
            {props.children}
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Popup;
