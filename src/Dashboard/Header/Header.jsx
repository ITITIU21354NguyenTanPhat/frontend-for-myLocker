import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, title }) => {
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="signout" onClick={() => handleSignOut()}>
        <button className="w-full text-left">Sign Out</button>
      </Menu.Item>
    </Menu>
  );

  const handleSignOut = () => {
    
    navigate('/login');
  };

  return (
    <header className="bg-white text-black px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center space-x-3">
          <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-semibold">{user.name}</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;