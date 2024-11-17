import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthType } from "../../axios/type/authType";
import { authAPI } from "../../axios/auth";

const LoginPage: React.FC = () => {
    const [infoLogin, setInfoLogin] = useState<AuthType>({
        email: '',
        password: '',
        role: 'student'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [capsLockOn, setCapsLockOn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [navigate]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfoLogin({ ...infoLogin, email: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInfoLogin({ ...infoLogin, password: e.target.value });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.getModifierState("CapsLock")) {
            setCapsLockOn(true);
        } else {
            setCapsLockOn(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authAPI.postLogin(infoLogin);
            if (response) {
                console.log("Đăng nhập thành công");
                // Lưu thông tin đăng nhập vào localStorage
                localStorage.setItem("token", JSON.stringify(response));
                localStorage.setItem("isLoggedIn", "true");
                navigate("/home");
            } else {
                console.log("Đăng nhập thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
        }
    };

    return (
        <div>
            <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            value={infoLogin.email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                                value={infoLogin.password}
                                onChange={handlePasswordChange}
                                onKeyDown={handleKeyDown}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>

                            {capsLockOn && (
                                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-2 text-xs font-semibold text-white bg-red-500 rounded-lg shadow-md whitespace-nowrap">
                                    WARNING: CAPS Lock is on
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-gray-700">Remember me</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
