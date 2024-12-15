import { useState, useEffect } from 'react';

const LoginApi =  (key, initialValue) => {
    const [storeValue, setStoreValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return initialValue;
        } 
    }) 

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(storeValue));
    }, [key, storeValue]);

    return [storeValue, setStoreValue];
}

export default LoginApi;