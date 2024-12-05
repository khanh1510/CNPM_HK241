import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import './LogPage.css'

// import TopHeader from "../../layout/headerLogin";
// import Footer from "../../layout/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = process.env.REACT_APP_API_URL;

const LogPage = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [status, setStatus] = useState("");
  const [userRole, setUserRole] = useState(null); // State để lưu role người dùng


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(searchInput);
      console.log("Search term set:", searchInput);
    }
  };

  useEffect(() => {
    // Lấy role từ localStorage
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);


      const tokenString = localStorage.getItem("token");
      if (!tokenString) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      const token = tokenString;
      if (!token) {
        setError("Invalid authentication token.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${url}/printing/all-printings?search=${search}&start_date=${startDate}&end_date=${endDate}&page="1"&items_per_page="10"`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setLogs(data.data);
        console.log("Logs data:", data.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [search, startDate, endDate]);

  const handleUpdateStatus = async () => {
    if (!selectedLog) return;


    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in.");
      return;
    }

    try {
      const userResponse = await fetch(`${url}/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error(`Error fetching user ID: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      const userId = userData.id;

      const response = await fetch(`${url}/printing/printing-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId,
          printing_id: selectedLog.id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      toast.success("Cập nhật thành công");
      // alert("Cập nhật thành công");
      setLogs((prevLogs) =>
        prevLogs.map((log) =>
          log.id === selectedLog.id ? { ...log, status } : log
        )
      );
      setPopupVisible(false);
    } catch (error) {
      console.error("Error updating status:", error);
      setError(error.message);
    }
  };

  const openPopup = (log) => {
    setSelectedLog(log);
    setStatus(log.status);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedLog(null);
    setStatus("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header value={props} />
      <div className="min-h-screen flex flex-col">
        <div className="p-4">
          <div className="text-2xl font-bold mb-4 text-center text-[#1488db]">Lịch sử in ấn</div>
          <div className="mb-4 flex justify-center">
            <input
              type="text"
              className="text-[#c4c4c4] w-1/3 p-2 border-2 border-[#d9d9d9] rounded-3xl focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Tìm kiếm lịch sử giao dịch in"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex gap-4 mb-4 py-6 justify-center text-center">
            <div className="flex flex-row items-center">
              <h3 className="font-semibold text-[#6f6f6f] text-[18px] px-4">Tìm kiếm từ</h3>
              <input
                type="date"
                className="p-2 border-2 border-[#d9d9d9] rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-row items-center">
              <h3 className="font-semibold text-[#6f6f6f] text-[18px] px-4">Đến</h3>
              <input
                type="date"
                className="p-2 border-2 border-[#d9d9d9] rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
  
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <div className="flex items-center rounded-2xl border-2 border-[#d9d9d9] mx-40 pt-5 pb-10 px-20">
              <table className="w-full">
                <thead>
                  <tr className="border-b-4  p-10 text-[#6f6f6f] text-lg">
                    <th className=" p-2">Thời gian</th>
                    <th className=" p-2">Mã giao dịch</th>
                    {userRole !== "student" && <th className=" p-2">MSSV</th>}
                    <th className=" p-2">Mã máy in</th>
                    <th className=" p-2">Tên tài liệu</th>
                    <th className=" p-2">Số trang</th>
                    <th className=" p-2">Trạng thái</th>
                    {userRole !== "student" && <th className=" p-2">Xoá</th>}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="even:bg-gray-50 text-center text-[#847f7f]">
                      <td className="border-r-2 border-b-2 p-2">{log.create_at}</td>
                      <td className="border-2 p-2">{log.id}</td>
                      {userRole !== "student" && <td className="border-2 p-2">{log.mssv}</td>}
                      <td className="border-2 p-2">{log.printer_id}</td>
                      <td className="border-2 p-2">
                        {log.file_name && log.file_name.length > 0
                          ? log.file_name.map((file) => (
                              <p key={file} className="text-[#1488db] underline cursor-pointer">
                                {file}
                              </p>
                            ))
                          : "Không có file"}
                      </td>
                      <td className="border-2 p-2">{log.total_paper}</td>
                      <td className="border-2 p-2">
                        <span
                          className={`px-4 py-2 text-sm rounded ${
                            log.status === "received"
                              ? "bg-[#edfcf2] rounded-[40px] text-[#17ae80] font-bold"
                              : log.status === "printed"
                              ? "bg-[#dbeffd] rounded-[40px] text-[#1777ae] font-bold"
                              : log.status === "printing"
                              ? "bg-[#fff1e5] rounded-[40px] text-[#f19308] font-bold"
                              : log.status === "waiting"
                              ? "bg-[#fff1e5] rounded-[40px] text-[#f19308] font-bold"
                              : log.status === "cancel"
                              ? "bg-[#ebbaba] rounded-[40px] text-[#8e2e2e] font-bold"
                              : ""
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      {userRole !== "student" && <td className="border-l-2 border-b-2 p-2">
                        <button
                          className="p-2 text-[#575656] hover:text-blue-800"
                          onClick={() => openPopup(log)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}
  
          {isPopupVisible && (
           <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
           <div className="form-container max-w-lg mx-auto px-14 py-8 bg-[#6da3d5] rounded-lg shadow-md">
             <form>
               <div>
                 <h3 className="text-xl font-bold text-[22px] mb-4">Chỉnh sửa trạng thái in</h3>
                 <div className="mb-4">
                   <label htmlFor="transactionCode" className="block text-sm font-medium text-gray-700 mb-1">
                     Mã giao dịch
                   </label>
                   <input
                     type="text"
                     id="transactionCode"
                     className="block w-full px-4 py-2  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                     value={selectedLog?.id || ""}
                     disabled
                   />
                 </div>
                 <div className="mb-4">
                   <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                     Trạng thái
                   </label>
                   <select
                     id="status"
                     className="block w-full px-4 py-2  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                     value={status}
                     onChange={(e) => setStatus(e.target.value)}
                   >
                     <option value="received">Đã nhận</option>
                     <option value="printed">Đã in xong</option>
                     <option value="printing">Đang in</option>
                     <option value="waiting">Chưa xử lý</option>
                     <option value="cancel">Hủy đơn</option>
                   </select>
                 </div>
               </div>
               <div className="flex justify-end space-x-4">
                 <button
                   type="button"
                   className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                   onClick={closePopup}
                 >
                   Đóng
                 </button>
                 <button
                   type="button"
                   className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   onClick={handleUpdateStatus}
                 >
                   Lưu
                 </button>
               </div>
             </form>
           </div>
         </div>
         
          )}
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default LogPage;
