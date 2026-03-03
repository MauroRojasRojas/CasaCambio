'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { apiRequest } from '../../lib/utils/apiHelper';

export default function ResetPasswordPage() {
  const toast = useRef<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams?.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [validating, setValidating] = useState(false);

  const validate = () => {
    if (!password || !confirm) {
      setError('Ambos campos son obligatorios.');
      return false;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return false;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    if (!token) {
      toast.current?.show({ severity: 'error', summary: 'Token faltante', detail: 'El token no fue proporcionado en la URL.', life: 5000 });
      return;
    }

    setLoading(true);
    try {
      const res = await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password, confirmPassword: confirm }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data?.message || 'Error al restablecer la contraseña.';
        toast.current?.show({ severity: 'error', summary: 'Error', detail: msg, life: 5000 });
      } else {
        toast.current?.show({ severity: 'success', summary: 'Listo', detail: 'Tu contraseña fue restablecida.', life: 3000 });
        setTimeout(() => router.push('/login'), 1200);
      }
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo conectar con el servidor.', life: 5000 });
    } finally {
      setLoading(false);
    }
  };

  // Validate token on mount
  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }
      setValidating(true);
      try {
        const res = await apiRequest('/auth/validate-reset-token', {
          method: 'POST',
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (!res.ok) {
          const msg = data?.message || 'Token inválido o expirado.';
          toast.current?.show({ severity: 'error', summary: 'Token inválido', detail: msg, life: 5000 });
          setTokenValid(false);
        } else {
          setTokenValid(true);
        }
      } catch (err) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo validar el token.', life: 5000 });
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };

    validate();
  }, [token]);

  return (
    <section className='w-full min-h-screen flex items-center justify-center bg-[#02254A] relative overflow-hidden'>
      <Toast ref={toast} />

      {/* Left absolute image half like recuperar */}
      <div className='hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-[#c7e0f6] z-0'>
        <div className='relative h-full w-full flex items-center justify-center'>
          <div className='w-11/12 max-w-[760px] flex items-center justify-center'>
            <img src='/assets/recovery.jpg' alt='Recuperación' className='object-contain w-full h-auto max-h-[75vh]' />
          </div>
        </div>
      </div>

      <div className='w-full mx-auto pt-20 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 pb-0 relative z-10 flex-1 flex items-stretch'>
        <div className='max-w-[1240px] mx-auto h-full w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 h-full items-stretch w-full'>
            {/* Right column content starting at column 7 to sit on the right half */}
            <div className='lg:col-span-6 lg:col-start-7 flex flex-col items-start gap-4 pt-4 md:pt-6 lg:pt-8'>
              <h2 className='text-3xl lg:text-4xl text-white font-bold mb-3'>Restablecer contraseña</h2>
              <p className='text-white/90 max-w-xl mb-6'>Ingresa tu nueva contraseña. Serás redirigido al inicio de sesión luego de completar.</p>

              {validating && <div className='mb-4 text-sm text-white/90'>Validando token...</div>}
              {tokenValid === false && !validating && (
                <div className='mb-4 text-red-300'>Token inválido o expirado. Solicita un nuevo enlace de recuperación.</div>
              )}

              <div className='w-full sm:w-[420px] mt-2'>
                <div className='bg-white rounded-lg p-6 shadow-md'>
                  <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <InputText type='password' value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder='Nueva contraseña' className='w-full p-3 border border-gray-200 rounded' />

                    <InputText type='password' value={confirm} onChange={(e: any) => setConfirm(e.target.value)} placeholder='Confirmar contraseña' className='w-full p-3 border border-gray-200 rounded' />

                    {error && <div className='text-red-600 text-sm'>{error}</div>}

                    <Button label={loading ? 'Guardando...' : 'Restablecer contraseña'} loading={loading} onClick={handleSubmit} className='p-button-primary w-full mt-2' />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
