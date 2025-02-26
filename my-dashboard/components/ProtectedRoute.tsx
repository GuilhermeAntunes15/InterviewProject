'use client';

import { useAuth } from '../lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) { // Só redireciona se não houver token
            router.push('/auth/login');
        }
    }, [token, router]);

    if (!token) return null; // Evita renderizar até que o token seja verificado
    return <>{children}</>;
}