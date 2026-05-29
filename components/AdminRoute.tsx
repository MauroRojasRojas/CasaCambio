'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/');
            } else if (user?.rol !== 'ADMIN') {
                router.push('/'); // no es admin, fuera
            }
        }
    }, [isAuthenticated, isLoading, user, router]);

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-[#C7C0BD]'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#02254A] mx-auto mb-4'></div>
                    <p className='text-[#02254A] font-semibold'>Cargando...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || user?.rol !== 'ADMIN') {
        return null;
    }

    return <>{children}</>;
}