import React, { useState, useEffect } from "react";
import { API_URL, BEARER } from "../config/const";
import { message } from "antd";

// Auth token helper
import { getToken } from "../helpers/tokens";

// Auth context
import { AuthContext } from "../context/AuthContext";

// Auth provider
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const authToken = getToken();

    const fetchLoggedInUser = async (token) => {
        setIsLoading(true);

        try{
            const response = await fetch(`${API_URL}/users/me?populate=*`, {
                headers: { Authorization: `${BEARER} ${token}` },
              });
              const data = await response.json();
        
              setUserData(data);

        } catch (error) {
            message.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const handleUser = (user) => {
        setUserData(user);
    }

    useEffect(() => {
        if (authToken) {
            fetchLoggedInUser(authToken);
        }
    }, [authToken]);

    return(
        <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}