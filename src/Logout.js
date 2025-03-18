// Logout.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        // Simulate an asynchronous logout process
        const logoutUser  = () => {
            // Clear user authentication state here
             // or whatever key you're using

            // Simulate a delay for logout process
            setTimeout(() => {
                setLoading(false); // Set loading to false after logout
                navigate('/login'); // Redirect to login page
            }, 1000); // 1 second delay
        };

        logoutUser ();
    }, [navigate]);

    return (
        <div>
            {loading ? (
                <h1>Logging out...</h1> // Show loading message
            ) : (
                <h1>You have been logged out.</h1> // Show logout confirmation
            )}
        </div>
    );
};

export default Logout;