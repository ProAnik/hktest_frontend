// DataContext.js
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [triggerApi, setTriggerApi] = useState(0); // State to trigger API call


    const updateData = (newData) => {
        setData(newData);
    };
    const triggerApiCall = () => {
        setTriggerApi((prev) => prev + 1); // Increment trigger value to trigger API call
    };

    return (
        <DataContext.Provider value={{ data, updateData, triggerApi, triggerApiCall }}>
            {children}
        </DataContext.Provider>
    );
};
