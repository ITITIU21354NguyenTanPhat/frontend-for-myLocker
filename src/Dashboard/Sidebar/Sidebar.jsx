import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-1/5 bg-white p-4 min-h-screen">
      <h5 className="font-bold text-lg mb-6">myLOCKER Dashboard</h5>
      <ul className="space-y-3">
        <li className="font-medium text-gray-700">
          <Link to="/Organization" className="hover:text-blue-600">Organization</Link>
        </li>
        <li className="font-medium text-gray-700">
          <Link to="/Lockers" className="hover:text-blue-600">Lockers</Link>
        </li>
        <li className="font-medium text-gray-700">
          <Link to="/Clients" className="hover:text-blue-600">Clients</Link>
        </li>
        <li className="font-medium text-gray-700">
          <Link to="/System" className="hover:text-blue-600">System</Link>
        </li>
        <li className="font-medium text-gray-700">
          <Link to="/Help" className="hover:text-blue-600">Help</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
