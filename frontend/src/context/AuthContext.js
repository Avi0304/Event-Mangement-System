import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import { login, register, guest } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser)); 
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
    }, []);

    const handleLogin = async (data) => {
        try {
            const res = await login(data);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            toast.success(" Logged in successfully!", { position: "top-right", autoClose: 3000 }); 
        } catch (error) {
            toast.error(" Login failed. Please try again!", { position: "top-right", autoClose: 3000 }); 
        }
    };

    const handleGuest = async () => {
        try {
          const res = await guest();
          const guestUser = { id: res.data.user.id, name: res.data.user.name };
          
          setUser(guestUser);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(guestUser));
    
          toast.success(" Logged in as Guest!", { position: "top-right", autoClose: 3000 });
        } catch (error) {
          console.error("Guest Login Error:", error);
          toast.error(" Guest login failed!", { position: "top-right", autoClose: 3000 });
        }
      };

    const handleRegister = async (data) => {
        try {
            const res = await register(data);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            toast.success(" Registration successful!", { position: "top-right", autoClose: 3000 }); 
        } catch (error) {
            toast.error(" Registration failed!", { position: "top-right", autoClose: 3000 }); 
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        toast.info(" Logged out successfully!", { position: "top-right", autoClose: 3000 }); 
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout, handleGuest }}>
            {children}
        </AuthContext.Provider>
    );
};
