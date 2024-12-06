// import React, { useState } from 'react';
// import { Form, Button, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { useMsal } from '@azure/msal-react';
// import { ReactComponent as Office365Icon } from '../Assets/office365-icon.svg';
// import Footer from './Footer';
// import './Login.css';

// const Login = () => {
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const { instance } = useMsal();

//     const handleOffice365Login = () => {
//         setLoading(true);
//         instance.loginPopup({
//             scopes: ["user.read"],
//             prompt: "select_account"
//         })
//         .then((response) => {
//             // Kiểm tra xem có tài khoản nào không
//             if (response.accounts && response.accounts.length > 0) {
//                 const email = response.accounts[1].username; // Lấy email từ tài khoản đầu tiên
//                 console.log('Sign-in email: ', email);
//                 fetch('http://localhost:8080/api/user/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ email }),
//                 })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.isValidUser) {
//                         localStorage.setItem('isLoggedIn', 'true');
//                         navigate('/Lockers');
//                         message.success('Login successful');
//                     } else {
//                         message.error('User not authorized');
//                     }
//                 })
//                 .catch(err => {
//                     console.error('Office 365 Login Error:', err);
//                     message.error('Login failed. Please try again.');
//                 })
//                 .finally(() => setLoading(false)); // Đảm bảo set loading false sau khi xong
//             } else {
//                 message.error('No accounts found');
//                 setLoading(false); // Set loading false nếu không có tài khoản
//             }
//         })
//         .catch(err => {
//             console.error('Office 365 Login Error:', err);
//             message.error('Login failed. Please try again.');
//             setLoading(false); // Set loading false trong trường hợp có lỗi
//         });
//     };

//     return (
//         <div className="h-screen flex flex-col">
//             {/* Main Login Section */}
//             <div className="flex-grow flex justify-start items-center px-12 bg-gray-100 bg-cover" style={{ backgroundImage: "url('/login.png')" }}>
//                 <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: '403px', height: '404px' }}>
//                     <center><h1 className="text-2xl font-semibold mb-4">Welcome to myLOCKER</h1></center>
//                     <center><p className="mb-6">Sign in to continue using the app</p></center>

//                     <Form name="login" layout="vertical" className="login-form mt-21">
//                         <Form.Item>
//                             <Button
//                                 type="default"
//                                 block
//                                 onClick={handleOffice365Login}
//                                 loading={loading}
//                                 className="custom-office365"
//                             >
//                                 <Office365Icon className="inline-block w-5 h-5 mr-2 fill-white hover:#ff8153" />
//                                 Sign in with Office 365
//                             </Button>
//                             <center>
//                                 <div className="text-orange-600 text-sm mt-11">
//                                     <a href="#" className="hover:text-[#ff8153]">Download mobile app</a>
//                                 </div>
//                             </center>
//                         </Form.Item>
//                     </Form>

//                     <div className="mt-6 text-gray-600 text-sm mt-24">
//                         <p>If you have login issues, please contact IT Helpdesk</p>
//                         <center>
//                             <a href="mailto:support@mylocker.com.vn" className="text-orange-600 hover:underline">support@mylocker.com.vn</a>
//                         </center>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { ReactComponent as Office365Icon } from '../Assets/office365-icon.svg'; // Chắc chắn bạn có file icon này
import Footer from './Footer';
import './Login.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { instance } = useMsal(); // MSAL instance

    // Handle Office365 login
    const handleOffice365Login = () => {
        setLoading(true);
        instance.loginPopup({
            scopes: ["user.read"],
            prompt: "select_account" 
        })
        .then((response) => {
            const email = response.accounts[0].email; // Lấy email từ MSAL
            console.log(email)

            // Gửi email đến backend để kiểm tra
            fetch('/v/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })  // Gửi email vào request body
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.isValidUser) {
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/Lockers');  // Chuyển hướng đến trang chính
                    message.success('Login successful');
                } else {
                    message.error('No accounts found or unauthorized email');
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                message.error('Login failed. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
        })
        .catch((err) => {
            console.error('MSAL Error:', err);
            message.error('Login failed. Please try again.');
            setLoading(false);
        });
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

                    <div className="mt-6 text-gray-600 text-sm mt-24">
                        <p>If you have login issues, please contact IT Helpdesk</p>
                        <center>
                            <a href="mailto:support@mylocker.com.vn" className="text-orange-600 hover:underline">support@mylocker.com.vn</a>
                        </center>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
