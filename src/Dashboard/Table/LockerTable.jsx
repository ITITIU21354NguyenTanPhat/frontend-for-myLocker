import React from 'react';
import { LockOutlined, UnlockOutlined, DeleteOutlined } from '@ant-design/icons';

const LockerTable = ({ data, handleButtonClick }) => {
  return (
    <table className="w-full text-center border-collapse bg-white">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Client</th> 
          <th className="px-4 py-2">Locker</th> 
          <th className="px-4 py-2">Setting</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {data.map((row) => (
          <tr key={row.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b border-gray-300">
            <td className="px-4 py-2">{row.id}</td>
            <td className="px-4 py-2">{row.date}</td>
            <td className="px-4 py-2">
              <span
                className={`inline-block w-24 py-1 text-center rounded border-2 ${row.status === 'Locked' ? 'bg-[#f15a22] text-white border-[#f15a22]' : 'bg-white text-[#f15a22] border-[#f15a22]'}`}
              >
                {row.status}
              </span>
            </td>
            <td className="px-4 py-2">{row.owner}</td> 
            <td className="px-4 py-2">{row.location}</td> 
            <td className="px-4 py-2">
              <div className="flex w-auto justify-center space-x-2"> 
                <button
                  onClick={() => handleButtonClick(row.id, 'lock')}
                  className="flex justify-center items-center w-10 h-10 border-2 border-[#f15a22] bg-[#f15a22] hover:bg-[#f15a22] hover:text-white rounded"
                >
                  <LockOutlined className="text-white" />
                </button>
                <button
                  onClick={() => handleButtonClick(row.id, 'unlock')}
                  className="flex justify-center items-center w-10 h-10 border-2 border-[#f15a22] bg-[#f15a22] hover:bg-[#f15a22] hover:text-white rounded"
                >
                  <UnlockOutlined className="text-white" />
                </button>
                <button
                  onClick={() => handleButtonClick(row.id, 'delete')}
                  className="flex justify-center items-center w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  <DeleteOutlined className="text-[#000000]" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LockerTable;
