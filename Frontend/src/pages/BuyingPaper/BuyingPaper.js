/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import paper from '../../assets/image/paper2.png';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import paperAPI from '../../axios/paperAPI';
import { toast } from 'react-toastify';

const BuyingPapers = (props) => {
  const [quantity, setQuantity] = useState(20); // Số lượng giấy cần mua
  const pricePerUnit = 250; // Giá mỗi trang
  const [userId, setUserId] = useState(null); // Lưu userId
  const [currentPaper, setCurrentPaper] = useState(0); // Số trang hiện tại
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [isBuying, setIsBuying] = useState(false); // Trạng thái đang mua

  // Lấy thông tin userId và số trang hiện tại
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Lấy thông tin userId
        const userInfo = await paperAPI.getUserInfo();
        console.log("Lay thong tin ID", userInfo);
        setUserId(userInfo.id);

        // Lấy thông tin số trang hiện tại
        const paperInfo = await paperAPI.getPaperInfo();
        console.log("Lay thong tin Balance", paperInfo);
        setCurrentPaper(paperInfo.paper_balance || 0); // Đặt giá trị mặc định nếu không có dữ liệu
      } catch (error) {
        toast.error('Không thể tải thông tin. Vui lòng thử lại!');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = quantity * pricePerUnit;

  const handleBuyPaper = async () => {
    try {
      // Gọi API mua giấy
      const result = await paperAPI.buyPaper(userId, quantity);
      console.log('Kết quả:', result);
      toast.success(`Mua giấy thành công! Bạn đã mua ${quantity} trang.`);
    } catch (error) {
      toast.error('Lỗi khi mua giấy. Vui lòng thử lại.');
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <Header value={props} />
      <div className="bg-blue-50 p-5 rounded-3xl shadow-lg m-14 border border-black">
        <div className="flex p-5 items-center">
          <img src={paper} alt="Giấy" className="w-1/3 rounded-3xl" />
          <div className="ml-36 flex-1 px-20">
            <h3 className="py-3 text-xl font-semibold text-gray-700">Giấy in A4</h3>
            <p className="py-3 text-gray-500">Số giấy bạn đang có: {currentPaper} trang</p>
            <p className="py-3 text-lg font-medium text-gray-800">250đ/ trang</p>
            <div className="mt-4 flex">
              <button
                onClick={handleDecrement}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                className="mx-3 w-16 py-2 px-0 text-center border-2 border-gray-300 rounded-md"
                readOnly
              />
              <button
                onClick={handleIncrement}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                +
              </button>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-800">
                Tổng: {totalPrice.toLocaleString()}đ
              </p>
            </div>
            <button
              onClick={handleBuyPaper}
              className={`mt-4 p-2 w-60 rounded-md ${
                isBuying ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
              disabled={isBuying}
            >
              {isBuying ? 'Đang mua...' : 'Mua giấy'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyingPapers;
