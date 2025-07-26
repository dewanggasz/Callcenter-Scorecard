    import { createContext, useState, useEffect, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import apiClient from '../services/api';
    
    // Buat context di sini agar bisa diakses di dalam provider
    const AuthContext = createContext(null);
    
    // Custom hook untuk kemudahan penggunaan
    export const useAuth = () => {
        return useContext(AuthContext);
    };
    
    export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState(null);
        const [token, setToken] = useState(localStorage.getItem('auth_token'));
        const [loading, setLoading] = useState(true); // State untuk loading awal
        const navigate = useNavigate();
    
        useEffect(() => {
            if (token) {
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // Verifikasi token dengan mengambil data user
                apiClient.get('/user')
                    .then(response => {
                        setUser(response.data);
                    })
                    .catch(() => {
                        // Token tidak valid, hapus
                        localStorage.removeItem('auth_token');
                        setToken(null);
                        setUser(null);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false); // Tidak ada token, tidak perlu loading
            }
        }, [token]);
    
        const login = async (email, password) => {
            try {
                const response = await apiClient.post('/login', { email, password });
                const newToken = response.data.access_token;
                
                setToken(newToken);
                setUser(response.data.user);
                localStorage.setItem('auth_token', newToken);
                
                navigate('/dashboard'); // Arahkan ke dashboard setelah login
                return null; // Tidak ada error
            } catch (error) {
                console.error("Login failed in AuthProvider:", error);
                return error.response?.data?.message || "An unexpected error occurred.";
            }
        };
    
        const logout = () => {
            apiClient.post('/logout').finally(() => {
                setUser(null);
                setToken(null);
                localStorage.removeItem('auth_token');
                delete apiClient.defaults.headers.common['Authorization'];
                navigate('/login');
            });
        };
    
        const value = {
            user,
            token,
            loading,
            login,
            logout,
        };
    
        // Jangan render apapun sampai proses loading verifikasi token selesai
        return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        );
    };
    