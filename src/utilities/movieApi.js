import { useState, useEffect } from 'react';

const movieApi = async (movie) => {
    const url = 'https://cloudpc7.github.io/Entertainment-Web-App/data.json';
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Network response was not ok (status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetchind data:', error);
        return null;
    }
}

export default movieApi;