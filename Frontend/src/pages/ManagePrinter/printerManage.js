import React, { useState, useEffect } from "react";
import Popup from '../../components/popUp';
import Create from '../../components/popCreate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import PrinterAPI from '../../axios/printerAPI';


const ManagePrinter = (props) => {
  const [printers, setPrinters] = useState([]); // State lưu danh sách máy in
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  // Gọi API `getAllPrinter` khi component được render
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await PrinterAPI.getAllPrinters(); // Gọi API
        setPrinters(response.data); // Lưu danh sách máy in vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh sách máy in:", error);
      }
    };

    fetchPrinters();
  }, []); // Chỉ chạy 1 lần khi component được render


  return (
    <>
      <Popup  
        trigger={showEditForm} 
        setTrigger={setShowEditForm} 
        selectedPrinter={selectedPrinter}
        setSelectedPrinter={setSelectedPrinter}>
      </Popup>

      <Create
        trigger={showCreateForm} 
        setTrigger={setShowCreateForm}>
      </Create>

      {/* Cơ sở 1 */}
      <Header value={props}/>
      <section className="mb-8 py-10 flex flex-col items-center">
      
      <div className="w-3/4 bg-[#6DA4D6] p-10 rounded-xl shadow-lg  ">  

      <h2 className="text-3xl text-[#1488DB] font-bold text-center mb-5">Quản lý máy in</h2>
      <h2 className="text-2xl text-[#083E65] font-bold  text-center mb-5">Cơ sở 1: Lý Thường Kiệt, P.14, Q.10</h2>
      

        <table className=" rounded-2xl text-center items-center table-auto w-full  bg-white  ">
          <thead>
            <tr >
              <th className="px-4 py-2 ">Tên máy in</th>
              <th className=" px-4 py-2 ">Mã máy in</th>
              <th className="px-4 py-2 ">Vị trí</th>
              <th className="  px-4 py-2 ">Trạng thái</th>
              <th className="  px-4 py-2">Chọn</th>
            </tr>
          </thead>
          <tbody>
            {printers.filter((printer) => printer.campus === "CS1 - Lý Thường Kiệt").map((printer, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="  p-6">{printer.name}</td>
                <td className="  px-4 py-2">{printer.id}</td>
                <td className="  px-4 py-2">{printer.location}</td>
                <td className="  px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm rounded font-bold ${
                      printer.status === "able"
                        ? "bg-[#EDFCF2] text-[#17AE81]"
                        : "bg-[#FFF2E5] text-[#F19408]"
                    }`}
                  >
                    {printer.status === "able" ? "Cho phép" : "Vô hiệu"}
                  </span>
                </td>
                <td className="  px-4 py-2 text-center">
                <div class="flex items-center justify-center">
                    <button onClick={() => {setShowEditForm(true); setSelectedPrinter(printer)}}><FontAwesomeIcon icon={faEdit} /></button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="my-10 text-2xl text-[#083E65] font-bold  text-center mb-5">Cơ sở 2: Dĩ An, Bình Dương</h2>

        <table className=" rounded-2xl text-center items-center table-auto w-full  bg-white">
          <thead>
            <tr >
              <th className="px-4 py-2 ">Tên máy in</th>
              <th className=" px-4 py-2 ">Mã máy in</th>
              <th className="px-4 py-2 ">Vị trí</th>
              <th className="  px-4 py-2 ">Trạng thái</th>
              <th className="  px-4 py-2">Chọn</th>
            </tr>
          </thead>
          <tbody>
            {printers.filter((printer) => printer.campus === "CS2 - Dĩ An").map((printer, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="  p-6">{printer.name}</td>
                <td className="  px-4 py-2">{printer.id}</td>
                <td className="  px-4 py-2">{printer.location}</td>
                <td className="  px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm rounded font-bold ${
                      printer.status === "able"
                        ? "bg-[#EDFCF2] text-[#17AE81]"
                        : "bg-[#FFF2E5] text-[#F19408]"
                    }`}
                  >
                    {printer.status==="able" ? "Cho phép" : "Vô hiệu"}
                  </span>
                </td>
                <td className="  px-4 py-2">
                <div class="flex items-center justify-center">
                  <button onClick={() => {setShowEditForm(true); setSelectedPrinter(printer)}}><FontAwesomeIcon icon={faEdit} /></button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        
      </div>


      <button onClick={() => {setShowCreateForm(true)}} type="button" class="text-white  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium bg-[#1488db]/70 rounded-[50px] text-sm px-5 py-2.5 my-7 me-2 mb-2">Thêm máy in</button>

    </section>

    <Footer/>

    </>
  );
};

export default ManagePrinter;
