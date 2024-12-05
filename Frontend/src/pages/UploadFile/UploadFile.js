/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import hook để điều hướng
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PopUpLoad from '../../components/popUpLoad';

import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import PrinterAPI from '../../axios/printerAPI';

export default function UploadPage(props) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showPrintForm, setShowPrintForm] = useState(false);
  const [printers, setPrinters] = useState([]); // State lưu danh sách máy in
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null); // State lưu máy in đã chọn
  const [error, setError] = useState(''); 

  const [printOptions, setPrintOptions] = useState({
    copiesNumber: 1, // Số bản sao
    pageSize: 'A4', // Kích thước trang
    fromPage: 1, // Trang bắt đầu
    toPage: 2, // Trang kết thúc
    orientation: true, // Hướng in (true = dọc, false = ngang)
    margin: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 1,
    }, // Căn lề
    pagesPerSide: 1, // Số trang trên một mặt
  });

  const navigate = useNavigate(); // Hook điều hướng


  // Gọi API `getAllPrinters` khi `searchQuery` thay đổi
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await PrinterAPI.getAllPrinters(searchQuery); // Gọi API với tham số tìm kiếm
        setPrinters(response.data); // Lưu danh sách máy in vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh sách máy in:", error);
        setError('Không thể tải danh sách máy in.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrinters();
  }, [searchQuery]);

  // Handle search query input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Cập nhật giá trị tìm kiếm
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
  
    // Map through the files and store metadata + the actual file object
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      status: "progress",
      progress: 0,
      file, // Store the actual File object
    }));
  
    // Update the state with the new files
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  
    // Simulate upload progress
    newFiles.forEach((file, index) => {
      simulateFileUpload(index, file);
    });
  };

  const simulateFileUpload = (index, file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = { ...file, progress, status: progress >= 100 ? "success" : "progress" };
        return updatedFiles;
      });

      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const removeFile = (fileIndex) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
  };

  // Handle printing
  const handlePrint = async () => {
    if (!selectedPrinter) {
      toast.error("Vui lòng chọn máy in");
      return;
    }
  
    // Get the selected file name from the radio button
    const selectedFileName = document.querySelector('input[name="selectedFile"]:checked')?.value;
    const selectedFile = uploadedFiles.find((file) => file.name === selectedFileName);
  
    if (!selectedFile || !selectedFile.file) {
      toast.error("Vui lòng chọn tệp để in.");
      return;
    }



    // Tạo object chứa thông tin in
    const printData = {
      file: selectedFile.file,
      printerId: selectedPrinter.id,
      printOptions,
    };

    console.log("test printData" ,printData)

    // Điều hướng sang trang xác nhận kèm theo dữ liệu
    navigate("/confirm", { state: { printData } });
  };

  const handlePopUpLoadClose = (options) => {
    setShowPrintForm(false); // Đóng PopUpLoad
    if (options) {
      setPrintOptions(options); // Lưu thông số được truyền từ PopUpLoad
    }
  };
  
  return (
    <>
      <PopUpLoad trigger={showPrintForm} setTrigger={setShowPrintForm} onSubmit={handlePopUpLoadClose}></PopUpLoad>
      <Header value={props} />
      <section className="mb-8 py-10">
        <h2 className="text-3xl text-center mb-5">Tải tài liệu lên</h2>
        <div className="flex gap-4 justify-around">
          <div className="w-2/5 flex items-center justify-center">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-3xl cursor-pointer bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span >Nhấn để tải lên</span> hoặc kéo thả vào khung</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, EXCEL </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="w-2/5 bg-gray-100 p-10 border rounded-3xl">
            <h3 className="text-lg font-bold mb-4">Tệp đang được xử lý</h3>
            {uploadedFiles.length === 0 ? (
              <p className="text-gray-500 text-center">Chưa có tệp nào được tải lên.</p>
            ) : (
              uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between mb-3 border-b pb-2 last:border-none last:pb-0">
                  <div>
                    <span className="text-gray-700">{file.name}</span>
                    <span className="text-gray-400"> ({file.type || "Unknown"})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id={`file-radio-${index}`} name="selectedFile" value={file.name} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label htmlFor={`file-radio-${index}`} className="text-sm text-gray-600">Chọn</label>
                  </div>
                  {file.status === "success" && <button onClick={() => setShowPrintForm(true)} className="ml-3 font-bold text-green-800">Chỉnh File</button>}
                  {file.status === "progress" && (
                    <div className="relative w-1/2">
                      <div className="h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-blue-500 rounded" style={{ width: `${file.progress}%` }}></div>
                      </div>
                    </div>
                  )}
                  <button onClick={() => removeFile(index)} className="ml-3 text-red-500 hover:text-red-700 font-bold">Xoá</button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mb-8 py-10 flex flex-col items-center">
        <h2 className="text-3xl text-center mb-5">Chọn máy in</h2>
        <div className="w-3/4 bg-[#6DA4D6] p-10 rounded-xl shadow-lg">
          <div className="mb-4">
            <input type="text" placeholder="Search" className="w-full p-2 border rounded-xl" value={searchQuery} onChange={handleSearchChange} />
          </div>
          <table className="rounded-2xl text-center items-center table-auto w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Tên máy in</th>
                <th className="px-4 py-2">Mã máy in</th>
                <th className="px-4 py-2">Vị trí</th>
                <th className="px-4 py-2">Trạng thái</th>
                <th className="px-4 py-2">Chọn</th>
              </tr>
            </thead>
            <tbody>
              {printers.map((printer, index) => (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="p-6">{printer.name}</td>
                  <td className="px-4 py-2">{printer.id}</td>
                  <td className="px-4 py-2">{printer.location}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-sm rounded font-bold ${printer.status === "able" ? "bg-[#EDFCF2] text-[#17AE81]" : "bg-[#FFF2E5] text-[#F19408]"}`}>
                      {printer.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        disabled={printer.status !== "able"}
                        id={`printer-radio-${index}`}
                        name="selectedPrinter"
                        onChange={() => setSelectedPrinter(printer)} // Cập nhật máy in khi chọn
                      />
                      <label htmlFor={`printer-radio-${index}`} className="ms-2">Xác nhận</label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex justify-center m-10">
        <button className="bg-[#6DA4D6] text-white px-10 py-2 rounded-2xl hover:bg-[#070e15]" onClick={handlePrint}>IN</button>
      </div>
      <Footer />
    </>
  );
}
