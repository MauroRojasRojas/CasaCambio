"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { apiRequest } from '../../lib/utils/apiHelper';

function BackButton() {
  const router = useRouter();
  const onBack = () => router.push('/');
  return (
    <Button
      id='back-btn'
      icon='pi pi-arrow-left'
      rounded
      outlined
      className='p-2 sm:p-3'
      style={{ borderColor: '#ffffff', color: '#ffffff' }}
      onClick={onBack}
    />
  );
}

export default function Recuperar() {
  const toast = useRef<any>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validateEmail = (value: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');

    if (!email) {
      setError('El correo electrónico es obligatorio.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data?.message || 'Ocurrió un error al enviar la solicitud.';
        toast.current?.show({ severity: 'error', summary: 'Error', detail: msg, life: 5000 });
      } else {
        toast.current?.show({ severity: 'success', summary: 'Enviado', detail: 'Revisa tu correo para recuperar tu cuenta.', life: 5000 });
        setSent(true);
      }
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo conectar con el servidor.', life: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full min-h-screen lg:h-screen flex flex-col justify-between items-center bg-[#02254A] relative overflow-hidden'>
      <Toast ref={toast} />

      {/* Fondo izquierdo absoluto: color de columna + imagen (solo en desktop) */}
      <div className='hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-[#c7e0f6] z-0'>
        <div className='relative h-full w-full flex items-center justify-center'>
          <div className='w-11/12 max-w-[760px] flex items-center justify-center'>
            <Image
              src='/assets/recovery.jpg'
              alt='Recuperación'
              width={900}
              height={700}
              className='object-contain w-full h-auto max-h-[75vh]'
              priority
            />
          </div>
        </div>
      </div>

      <div className='w-full mx-auto pt-20 px-4 sm:px-6 md:px-8 lg:px-12 4k:px-16 pb-0 relative z-10 flex-1 flex items-stretch'>
        <div className='max-w-[1240px] mx-auto h-full w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10 h-full items-stretch w-full'>
            {/* Contenido y formulario a la derecha (o arriba en mobile) */}
            <div className='lg:col-span-6 lg:col-start-7 flex flex-col items-center lg:items-start gap-4 pt-4 md:pt-6 lg:pt-8 h-full'>
              <div className='w-full max-w-[520px] px-2'>
                <div className='mb-4'>
                  {/* Back button */}
                  <BackButton />
                </div>

                <div className='text-left lg:pb-4 pb-4'>
                  <h1 className='text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4'>
                    Recuperar contraseña
                  </h1>

                  <p className='text-white/90 max-w-xl mb-6'>
                    Ingresa el correo electrónico asociado a tu cuenta y te enviaremos instrucciones para restablecer tu contraseña.
                  </p>
                </div>

                <div className='w-full sm:w-full bg-white rounded-lg p-6 shadow-md'>
                  {!sent ? (
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                      <label className='text-sm font-medium text-gray-700'>Correo electrónico</label>
                      <InputText
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        placeholder='Ingrese su correo electrónico'
                        className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-200'} rounded`}
                      />
                      {error && <small className='text-red-600'>{error}</small>}

                      <Button id='send-btn' label={loading ? 'Enviando...' : 'Enviar'} loading={loading} onClick={handleSubmit} className='p-button-primary' />
                    </form>
                  ) : (
                    <div className='text-center py-6'>
                      <div className='text-center'>
                        <i className='pi pi-check-circle text-green-600' style={{ fontSize: 40 }} aria-hidden />
                      </div>
                      <h3 className='mt-4 text-lg font-semibold text-gray-800'>Revisa tu correo</h3>
                      <p className='mt-2 text-sm text-gray-600'>Hemos enviado un enlace para recuperar tu cuenta.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
