import Homepage from './pages/HomePage/Homepage'
import SelectMember from "./pages/Login/SelectMember";
import Login from './pages/Login/login';
import Infor from './pages/InforStudent/Infor'
import BuyingPaper from './pages/BuyingPaper/BuyingPaper'
import LogPage from './pages/LogPage/LogPage'
import UploadFile from './pages/UploadFile/UploadFile'
import SuccessPrinting from './pages/SuccessPrinting/successPringting'
import Setting from './pages/Setting/setting'
import ManagePrinter from './pages/ManagePrinter/printerManage'
import {StateLogin} from './data/StateLogin'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage value={StateLogin} />} />
        <Route path="/role" element={<SelectMember value={StateLogin} />} />
        <Route path="/login" element={<Login value={StateLogin} />} />
        <Route path="/infor" element={<Infor value={StateLogin} />} />
        <Route path="/buy" element={<BuyingPaper value={StateLogin} />} />
        <Route path="/confirm" element={<SuccessPrinting/>} />

        {/* Log dưới đây dành cho cả  admin và student*/}
        <Route path="/log" element={<LogPage value={StateLogin} />} />    
        <Route path="/print" element={<UploadFile value={StateLogin} />} />
        <Route path="/managePrinter" element={<ManagePrinter value={StateLogin} />} />
        <Route path="/setting" element={<Setting value={StateLogin} />} />
      </Routes>
      <ToastContainer />

    </>
  );
}

export default App;
