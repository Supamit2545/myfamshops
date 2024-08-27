import React, { createContext, useState } from 'react';

// สร้าง context
const BEurlContext = createContext();

const MyProvider = ({ children }) => {
    const [BEurl, setValue] = useState('https://testbackend-1-88e7.onrender.com!');

    return (
        <MyContext.Provider value={{ BEurl, setValue }}>
            {children}
        </MyContext.Provider>
    );
};

export { BEurlContext, MyProvider };