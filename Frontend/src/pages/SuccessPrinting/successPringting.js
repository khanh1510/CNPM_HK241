import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import printAPI from "../../axios/printFile_API"; // API xử lý in
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SuccessPrinting(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { printData } = location.state || {};

  const [currentTime, setCurrentTime] = useState("");
  const [estimatedCompletionTime, setEstimatedCompletionTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setCurrentTime(formatTime(now));

    // Tính thời gian hoàn thành dự kiến (giả sử thêm 5 phút)
    const completionTime = new Date(now.getTime() + 5 * 60 * 1000); // Thêm 5 phút
    setEstimatedCompletionTime(formatTime(completionTime));
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleString("vi-VN", options);
  };

  const handleConfirm = async () => {
    const printParams = new FormData();
    printParams.append("file1", printData.file);
    printParams.append("printer_id", printData.printerId);
    printParams.append("files[0][page_number]", 10); // Page size
    printParams.append("files[0][copies_number]", printData.printOptions.copiesNumber);
    printParams.append("files[0][page_type]", printData.printOptions.pageSize);
    printParams.append("files[0][print_from_page]", printData.printOptions.fromPage);
    printParams.append("files[0][print_to_page]", printData.printOptions.toPage);
    printParams.append("files[0][print_horizontal]", printData.printOptions.orientation);
    printParams.append("files[0][left]", printData.printOptions.margin.left);
    printParams.append("files[0][right]", printData.printOptions.margin.right);
    printParams.append("files[0][top]", printData.printOptions.margin.top);
    printParams.append("files[0][bottom]", printData.printOptions.margin.bottom);

    try {
      const response = await printAPI.postPrint(printParams);
      console.log("In thành công:", response);
      toast.success("In thành công!");
      navigate("/infor"); // Điều hướng về trang chủ
    } catch (error) {
      console.error("In thất bại:", error);
      toast.error("In thất bại!");
    }
  };

  const files = printData.file; // Danh sách file từ printData

  return (
    <>
      <Header value={props} />
      <div className="container mx-auto p-6 max-w-lg bg-[#dde6ed] rounded-xl shadow-lg flex flex-col my-14">
        {/* Header */}
        <div className="header mb-4">
          <h1 className="text-2xl font-bold text-center text-blue-600">
            Xác nhận giao dịch
          </h1>
        </div>

        {/* Details Section */}
        <div className="details bg-[#dde6ed] p-4 mb-4 text-black">
          <p className="mb-2">
            <span>Thời gian hiện tại:</span>{" "}
            <strong>{currentTime}</strong>
          </p>
          <p className="mb-2">
            <span>Thời gian hoàn thành dự kiến:</span>{" "}
            <strong>{estimatedCompletionTime}</strong>
          </p>
          <p className="mb-2">
            <span>Số lượng file:</span>{" "}
            <strong>1</strong>
          </p>
        </div>

        {/* File List */}
        <div className="file-list mb-4">
          <table className="min-w-full table-auto border rounded-2xl border-gray-300 bg-white">
            <thead>
              <tr className="text-black">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Tên tài liệu
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Kích thước
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Định dạng file
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <strong
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {files.name || "Không rõ tên"}
                  </strong>
                </td>
                <td className="text-black italic border border-gray-300 px-4 py-2">
                  {files.size || "Không rõ kích thước"}
                </td>
                <td className="text-black italic border border-gray-300 px-4 py-2">
                  {files.type || "Không rõ số trang"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Confirm Button */}
        <div className="confirm-button flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
