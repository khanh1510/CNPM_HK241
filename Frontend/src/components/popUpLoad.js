import React, { useState } from "react";
import logo from "../assets/image/pdf.png";

const PopUpLoad = (props) => {
  // State lưu thông số tùy chỉnh
  const [copiesNumber, setCopiesNumber] = useState(1); // Số bản sao
  const [pageSize, setPageSize] = useState("A4"); // Kích thước trang
  const [fromPage, setFromPage] = useState(1); // Trang bắt đầu
  const [toPage, setToPage] = useState(null); // Trang kết thúc (null nếu không chọn)
  const [orientation, setOrientation] = useState("portrait"); // Hướng in
  const [margin, setMargin] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }); // Căn lề
  const [pagesPerSide, setPagesPerSide] = useState(1); // Số trang trên 1 mặt

  const handleSubmit = () => {
    const printOptions = {
      copiesNumber,
      pageSize,
      fromPage,
      toPage,
      orientation,
      margin,
      pagesPerSide,
    };
    props.setTrigger(false); // Đóng popup
    console.log("test", printOptions);
    props.onSubmit(printOptions); // Gửi dữ liệu lên component cha
  };

  return props.trigger ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-[#6da3d5] rounded-lg shadow-lg w-3/4 p-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-center text-black text-[30px] mb-4">
          Tùy chỉnh thông số in
        </h2>

        {/* Content */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Side */}
          <div className="flex flex-col items-center">
            <label className="block text-sm font-bold text-[#1488db] mb-2">
              Xem trước
            </label>
            <div className="border bg-white h-4/5 w-1/2">
              <img src={logo} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Side */}
          <div>
            {/* Số bản */}
            <div className="mb-4 w-auto">
              <label className="block text-sm font-bold text-[#1488db] mb-1">
                Số bản:
              </label>
              <input
                type="number"
                className="w-28 border rounded-2xl p-2 focus:outline-none"
                value={copiesNumber}
                onChange={(e) => setCopiesNumber(Number(e.target.value))}
              />
            </div>

            {/* Kích thước */}
            <div className="flex items-center mb-4">
              <label className="block text-sm font-bold text-[#1488db] mb-1">
                Kích thước:
              </label>
              <select
                className="ml-10 w-80 border rounded-2xl p-2 focus:outline-none"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
              >
                <option>A4</option>
                <option>A5</option>
                <option>A6</option>
              </select>
            </div>

            {/* In từ trang */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <label className="block text-sm font-bold text-[#1488db] mb-1">
                  In từ trang:
                </label>
                <input
                  type="number"
                  className="w-20 ml-10 border rounded-2xl p-2 focus:outline-none"
                  value={fromPage}
                  onChange={(e) => setFromPage(Number(e.target.value))}
                />
              </div>
              <div className="flex items-center">
                <label className="block text-sm font-bold text-[#1488db] mb-1">
                  đến
                </label>
                <input
                  type="number"
                  className="w-20 ml-10 border rounded-2xl p-2 focus:outline-none"
                  value={toPage || ""}
                  onChange={(e) => setToPage(Number(e.target.value) || null)}
                />
              </div>
            </div>

            {/* Hướng in */}
            <div className="mb-4 flex">
              <label className="block text-sm font-bold text-[#1488db] mb-1">
                Hướng in:
              </label>
              <div className="flex items-center">
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="orientation"
                    className="w-10 ml-10"
                    value="portrait"
                    checked={orientation === "portrait"}
                    onChange={(e) => setOrientation(e.target.value)}
                  />
                  Dọc
                </label>
                <label className="flex items-center text-black">
                  <input
                    type="radio"
                    name="orientation"
                    className="w-10 ml-10"
                    value="landscape"
                    checked={orientation === "landscape"}
                    onChange={(e) => setOrientation(e.target.value)}
                  />
                  Ngang
                </label>
              </div>
            </div>

            {/* Căn lề */}
            <div className="mt-6">
              <label className="block text-sm font-bold text-[#1488db] mb-2">
                Căn lề (Inch)
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Trái", "Phải", "Trên", "Dưới"].map((label, idx) => (
                  <div className="flex items-center" key={label}>
                    <label className="font-bold pr-10 block text-sm text-black mb-1">
                      {label}:
                    </label>
                    <input
                      type="number"
                      className="w-28 border rounded-2xl p-2 focus:outline-none"
                      value={margin[["left", "right", "top", "bottom"][idx]]}
                      onChange={(e) =>
                        setMargin({
                          ...margin,
                          [label.toLowerCase()]: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Số trang / 1 mặt */}
            <div className="mt-6 flex items-center">
              <label className="block text-sm font-bold text-[#1488db] mb-1 pr-10">
                Số trang/1 mặt:
              </label>
              <input
                type="number"
                className="w-28 border rounded-2xl p-2 focus:outline-none"
                value={pagesPerSide}
                onChange={(e) => setPagesPerSide(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center flex gap-4 justify-center">
          <button
            onClick={() => props.setTrigger(false)}
            type="button"
            className="bg-[#ce6767] text-white mx-5 px-6 py-2 rounded-2xl"
          >
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-2xl hover:bg-blue-700"
          >Xác nhận
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PopUpLoad;
