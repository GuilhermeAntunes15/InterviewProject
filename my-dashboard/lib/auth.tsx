'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(
        typeof window !== 'undefined' ? localStorage.getItem('token') : null
    );
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            if (token && !user) { // Só verifica se tem token mas não tem usuário
                try {
                    const response = await fetch('/api/auth/me', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    if (!response.ok) throw new Error('Token inválido');
                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error('Erro ao verificar token:', error);
                    setToken(null);
                    localStorage.removeItem('token');
                    router.push('/auth/login');
                }
            } else if (!token) {
                router.push('/auth/login');
            }
        };
        verifyToken();
    }, [token, router]);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const { token, user } = await response.json();
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            router.push('/dashboard'); // Deve redirecionar aqui
        } catch (error) {
            console.error('Erro no login:', error);
            throw error; // Propaga o erro para ser tratado na página de login
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
        } catch (error) {
            console.error('Erro no logout:', error);
        }
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};