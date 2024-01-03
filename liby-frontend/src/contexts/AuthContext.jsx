import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null); 
    const [role, setRole] = useState("Guest"); 

    const logIn = ( userData, userRole ) => {
        setUser(userData);
        setRole(userRole);
    };

    const logOut = () => {
        setUser(null);
        setRole("Guest");
    };

    return (<AuthContext.Provider value={{ user, role, logIn, logOut }}>
        {children}
    </AuthContext.Provider>);
};

export default AuthProvider;