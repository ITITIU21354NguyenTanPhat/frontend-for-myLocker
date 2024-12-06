import React from 'react';
import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons'; 

const ClientTable = ({ data, handleButtonClick }) => {
  return (
    <table className="w-full text-left border-collapse border border-gray-300">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Date</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Owner</th>
          <th className="border border-gray-300 px-4 py-2">Location</th>
          <th className="border border-gray-300 px-4 py-2">Setting</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {data.map((row) => (
          <tr key={row.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{row.id}</td>
            <td className="border border-gray-300 px-4 py-2">{row.date}</td>
            <td className="border border-gray-300 px-4 py-2">
              <span
                className={`inline-block w-24 py-1 text-center rounded text-white ${row.status === 'Locked' ? 'bg-red-500' : 'bg-green-500'}`}
              >
                {row.status}
              </span>
            </td>
            <td className="border border-gray-300 px-4 py-2">{row.owner}</td>
            <td className="border border-gray-300 px-4 py-2">{row.location}</td>
            <td className="border border-gray-300 px-4 py-2 flex justify-between">
              <div className="flex space-x-2 w-full justify-between">
                <button
                  onClick={() => handleButtonClick(row.id, 'lock')}
                  className="w-1/3 flex justify-center p-2 bg-red-200 hover:bg-red-300 rounded"
                >
                  <LockOutlined className="text-red-500" />
                </button>
                <button
                  onClick={() => handleButtonClick(row.id, 'unlock')}
                  className="w-1/3 flex justify-center p-2 bg-orange-200 hover:bg-orange-300 rounded"
                >
                  <UnlockOutlined className="text-orange-500" />
                </button>
                <button
                  onClick={() => handleButtonClick(row.id, 'delete')}
                  className="w-1/3 flex justify-center p-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  <DeleteOutlined className="text-gray-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;


