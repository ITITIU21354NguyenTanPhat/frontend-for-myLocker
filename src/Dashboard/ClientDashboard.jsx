import React, { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import LockerTable from './Table/LockerTable';
import './Dashboard.css';

const ClientDashboard = () => {
    const generateData = () => {
        const sampleData = [];
        for (let i = 1; i <= 50; i++) {
            sampleData.push({
                id: i,
                date: null,
                status: i % 2 === 0 ? 'Locked' : 'Opened',
                owner: `User ${i}`,
                location: `C${i % 5 + 1}`,
            });
        }
        return sampleData;
    };

    const [data, setData] = useState(generateData());
    const [buttonState, setButtonState] = useState({});
    const rowsPerPage = 10;

    const user = {
        name: 'John Doe',
        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
    };

    const getCurrentPageData = () => {
        const startIndex = 0; 
        const endIndex = startIndex + rowsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const handleButtonClick = (id, action) => {
        const updatedData = [...data];
        const rowIndex = updatedData.findIndex((row) => row.id === id);

        const currentDate = format(new Date(), 'HH:mm | dd/MM/yy', { locale: vi });

        if (action === 'lock') {
            updatedData[rowIndex].status = 'Locked';
            updatedData[rowIndex].date = currentDate;
        } else if (action === 'unlock') {
            updatedData[rowIndex].status = 'Opened';
            updatedData[rowIndex].date = currentDate;
        }

        setButtonState({
            ...buttonState,
            [id]: action,
        });

        setData(updatedData);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="w-4/5 flex flex-col min-h-screen ml-4">
                <Header user={user} />
                <div className="table-section bg-white p-4 shadow-md rounded-md mt-4">
                    <LockerTable data={getCurrentPageData()} handleButtonClick={handleButtonClick} />
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
