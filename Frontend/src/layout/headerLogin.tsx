import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const HeaderLogin: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <header className="flex items-center justify-between px-8 py-4 bg-blue-900 text-white">
            <div className="flex items-center">
                <img src="/src/assets/hcmut.png" alt="Logo HCMUT" className="w-12 h-12 mr-4" />
                <div>
                    <h1 className="font-bold text-lg">ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</h1>
                    <h2 className="text-base">TRƯỜNG ĐẠI HỌC BÁCH KHOA</h2>
                </div>
            </div>
            <Button 
                label="Đăng nhập" 
                icon="pi pi-sign-in" 
                className="p-button-rounded p-button-white text-blue-900 bg-white hover:bg-gray-200" 
                onClick={handleLoginClick} 
            />
        </header>
    );
};

export default HeaderLogin;
