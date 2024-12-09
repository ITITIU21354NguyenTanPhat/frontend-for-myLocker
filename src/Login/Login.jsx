import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { ReactComponent as Office365Icon } from '../Assets/office365-icon.svg';
import Footer from './Footer';
import './Login.css';
import axios from 'axios'; // Thêm axios để gửi yêu cầu tới backend

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { instance, accounts } = useMsal();

    const handleOffice365Login = async () => {
        setLoading(true);
        console.log('Attempting to log in...'); // Log để kiểm tra khi bắt đầu sự kiện đăng nhập
        try {
            // Đăng nhập qua Azure AD
            const loginResponse = await instance.loginRedirect({
                scopes: ["user.read"],
                prompt: "select_account",
            });

            console.log('Login response:', loginResponse); // Log kết quả từ đăng nhập

            // Sau khi đăng nhập, lấy email của người dùng từ Azure AD
            const email = accounts[0]?.username;
            console.log('User email:', email); // Log email của người dùng

            // Gửi email tới backend để kiểm tra tính hợp lệ
            const response = await axios.post('http://localhost:8080/api/user/login', { email });

            // Kiểm tra kết quả từ backend
            if (response.data.isValidUser) {
                message.success('Login successful!');
                navigate('/Lockers'); // Chuyển hướng đến trang dashboard nếu hợp lệ
            } else {
                message.error('Invalid email. Please contact support.');
                setLoading(false); // Dừng loading nếu không hợp lệ
            }
        } catch (err) {
            console.error('Login error:', err);
            message.error('Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-grow flex justify-start items-center px-12 bg-gray-100 bg-cover" style={{ backgroundImage: "url('/login.png')" }}>
                <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: '403px', height: '404px' }}>
                    <center><h1 className="text-2xl font-semibold mb-4">Welcome to myLOCKER</h1></center>
                    <center><p className="mb-6">Sign in to continue using the app</p></center>

                    <Button
                        type="default"
                        block
                        onClick={handleOffice365Login}
                        loading={loading}
                        className="custom-office365"
                    >
                        <Office365Icon className="inline-block w-5 h-5 mr-2 fill-white" />
                        Sign in with Office 365
                    </Button>

                    <center>
                        <div className="mt-5 text-orange-600 text-sm mt-11">
                            <button
                                className="hover:text-[#ff8153]"
                                onClick={() => console.log('Download the app')}
                            >
                                Download mobile app
                            </button>
                        </div>
                    </center>

                    <div className="mt-6 text-gray-600 text-sm mt-24">
                        <p>If you have login issues, please contact IT Helpdesk</p>
                        <center>
                            <a href="mailto:support@mylocker.com.vn" className="text-orange-600 hover:underline">
                                support@mylocker.com.vn
                            </a>
                        </center>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
