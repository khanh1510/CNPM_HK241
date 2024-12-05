import React, { useState, useEffect } from "react";
// import "./setting.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = process.env.REACT_APP_API_URL;

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const SettingPage = (props) => {
  const [printQuantity, setPrintQuantity] = useState("10");
  const [issueDate, setIssueDate] = useState(getTodayDate);
  const [price, setPrice] = useState("200");
  const [fileFormats, setFileFormats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestFileTypes = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${url}/spso/latest-file-types`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Please check your access token.");
          } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        }

        const data = await response.json();
        setFileFormats(data);
      } catch (error) {
        console.error("Error fetching latest file types:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestFileTypes();
  }, []);

  const handleAddFormat = () => {
    setFileFormats([...fileFormats, ""]);
  };

  const handleFormatChange = (index, value) => {
    const updatedFormats = fileFormats.map((format, i) => (i === index ? value : format));
    setFileFormats(updatedFormats);
  };

  const handleDeleteFormat = (index) => {
    const updatedFormats = fileFormats.filter((_, i) => i !== index);
    setFileFormats(updatedFormats);
  };

  const handleSaveSettings = async () => {
    if (!issueDate) {
      toast.error("Ngày cấp phát không được để trống");
      // alert("Ngày cấp phát không được để trống");
      return;
    }
    if (issueDate <= getTodayDate()) {
      toast.error("Ngày cấp phát phải lớn hơn hôm nay");
      // alert("Ngày cấp phát phải lớn hơn hôm nay");
      return;
    }
    if (parseInt(printQuantity) < 0) {
      toast.error("Số lượng trang in không được âm");
      // alert("Số lượng trang in không được âm");
      return;
    }
    if (parseInt(price) < 0) {
      toast.error("Giá thành không được âm");
      // alert("Giá thành không được âm");
      return;
    }

    const tokenString = localStorage.getItem("token");

    if (!tokenString) {
      setError("Authentication token not found. Please log in.");
      toast.error("Không tìm thấy mã thông báo xác thực. Vui lòng đăng nhập lại.");
      // alert("Không tìm thấy mã thông báo xác thực. Vui lòng đăng nhập lại.");
      return;
    }

    const token = tokenString;

    if (!token) {
      setError("Authentication token not found. Please log in.");
      toast.error("Không tìm thấy mã thông báo xác thực. Vui lòng đăng nhập lại.");
      // alert("Không tìm thấy mã thông báo xác thực. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const response = await fetch(`${url}/spso/update-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paperNumber: printQuantity,
          supplyDate: issueDate,
          pagePrice: price,
          fileTypes: fileFormats,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          response.status === 401
            ? "Unauthorized: Please check your access token."
            : `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Save result:", result);

      // alert("Cập nhật thành công!");
      toast.success("Cập nhật thành công");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred.";
      setError(errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Header value={props}/>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-col items-center p-6">
        <div className="text-2xl font-bold mb-6 text-[#1488db]">Cài đặt</div>
  
        {/* Box: Trang in được cấp phát định kỳ */}
        <div className="bg-[#6da3d5] shadow-md rounded-xl w-2/3 px-6 py-10 mb-16">
          <h3 className="text-lg text-center font-bold mb-8">Trang in được cấp phát định kỳ</h3>
          <div className="flex flex-row items-center  w-full text-center justify-between">
            <div className="flex flex-row items-center">
              <label className="font-medium text-gray-700 mb-2 md:mb-0 md:mr-4">Số lượng</label>
              <input
                type="number"
                min="0"
                value={printQuantity}
                onChange={(e) => setPrintQuantity(e.target.value)}
                className="w-full md:w-2/3 p-2 border  rounded-2xl "
              />
            </div>
            <div className="flex flex-row items-center">
              <label className="font-medium text-gray-700 mb-2 md:mb-0 md:mr-4">Ngày cấp phát</label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full md:w-2/3 p-2 border  rounded-2xl "
              />
            </div>
            <div className="flex flex-row items-center">
              <label className="font-medium text-gray-700 mb-2 md:mb-0 md:mr-4">Giá thành</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full md:w-2/3 p-2 border  rounded-2xl"
              />
            </div>
          </div>
        </div>
  
        {/* Box: Định dạng tệp tin */}
        <div className="w-2/3 px-52 py-4 bg-[#6da3d5] border rounded-xl ">
            <h3 className="text-lg font-bold mb-10 text-center">
              Định dạng tệp tin được cho phép in
            </h3>
            <div className="overflow-x-auto mb-6 border rounded-2xl">
              <table className="min-w-full bg-white text-left"> 
                <thead>
                  <tr>
                    <th className="px-8 py-2">Số thứ tự</th>
                    <th className="px-10 py-2">Định dạng</th>
                    <th className="px-4 py-2">Xoá</th>
                  </tr>
                </thead>
              </table>
              {/* Div bọc tbody với thanh cuộn */}
              <div className="max-h-40  overflow-y-auto scrollbar-hidden">
                <table className="min-w-full bg-white text-center">
                  <tbody>
                    {fileFormats.map((format, index) => (
                      <tr key={index}>
                        <td className="px-8 py-2">{index + 1}</td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={format}
                            onChange={(e) => handleFormatChange(index, e.target.value)}
                            className="w-full p-2 text-center"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleDeleteFormat(index)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3} className="px-4 py-2">
                        <button
                          onClick={handleAddFormat}
                          className="px-4 py-2 text-black rounded-md"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="px-6 py-2 bg-[#1488db]/70 rounded-[50px] text-white hover:bg-blue-700 "
                onClick={handleSaveSettings}
              >
                Lưu
              </button>
            </div>
          </div>

      </div>
    </div>
    <Footer />
    </>
  );
  
};

export default SettingPage;
