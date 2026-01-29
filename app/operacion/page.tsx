'use client';

import { useState, useEffect } from 'react';
import ConverterCard from '../components/ConverterCard';
import { cuentasDefault } from '../../data/cuentas';

export default function Operacion() {
  const compra = 3.3465;
  const venta = 3.3765;

  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [transferAmount, setTransferAmount] = useState(100);
  const [transferMode, setTransferMode] = useState<'compra' | 'venta'>('venta');
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [sentCurrency, setSentCurrency] = useState('PEN');
  const [receivedCurrency, setReceivedCurrency] = useState('USD');
  const [copied, setCopied] = useState(false);
  const [selectedOrigen, setSelectedOrigen] = useState('');
  const [selectedDestino, setSelectedDestino] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [operationCode, setOperationCode] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [generatedOperationCode, setGeneratedOperationCode] = useState('');

  const steps = [
    { id: 1, title: 'Cotiza' },
    { id: 2, title: 'Seleccionar Cuentas' },
    { id: 3, title: 'Transfiere' },
    { id: 4, title: 'Verifica' },
  ];

  useEffect(() => {
    const savedSentAmount = localStorage.getItem('converterSentAmount');
    const savedSentCurrency = localStorage.getItem('converterSentCurrency');
    const savedReceivedAmount = localStorage.getItem('converterReceivedAmount');
    const savedReceivedCurrency = localStorage.getItem('converterReceivedCurrency');
    
    if (savedSentAmount && !isNaN(Number(savedSentAmount))) {
      setTransferAmount(Number(savedSentAmount));
    }
    
    if (savedSentCurrency) {
      setSentCurrency(savedSentCurrency);
      setTransferMode(savedSentCurrency === 'USD' ? 'compra' : 'venta');
    }
    
    if (savedReceivedAmount && !isNaN(Number(savedReceivedAmount))) {
      setReceivedAmount(Number(savedReceivedAmount));
    }
    
    if (savedReceivedCurrency) {
      setReceivedCurrency(savedReceivedCurrency);
    }
  }, []);

  // Sincronizar valores cuando se cambia de step
  useEffect(() => {
    const savedReceivedAmount = localStorage.getItem('converterReceivedAmount');
    const savedReceivedCurrency = localStorage.getItem('converterReceivedCurrency');
    
    if (step !== 1 && savedReceivedAmount && !isNaN(Number(savedReceivedAmount))) {
      setReceivedAmount(Number(savedReceivedAmount));
    }
    
    if (step !== 1 && savedReceivedCurrency) {
      setReceivedCurrency(savedReceivedCurrency);
    }
  }, [step]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleFileUpload = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!validTypes.includes(file.type)) {
      alert('Por favor, sube un archivo PNG, JPEG o PDF');
      return;
    }

    if (file.size > maxSize) {
      alert('El archivo no debe ser mayor a 10 MB');
      return;
    }

    setUploadedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const generateOperationCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const currentStep = steps.find((s) => s.id === step);

  return (
    <>
      {/* Toast de copiado */}
      {copied && <div className='fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'>Copiado al portapapeles</div>}
      {/* PASOS Y BANNER EN FILA */}
      <div className='flex flex-col lg:flex-row gap-4 md:gap-8 mb-12 pt-4 items-stretch'>
        {/* PASOS - IZQUIERDA */}
        <div className='flex-1 bg-blue-100 border-2 border-blue-300 rounded-xl px-3 md:px-5 py-3 flex flex-col lg:flex-row justify-center gap-2 md:gap-4 items-center'>
          {/* Botón Atrás */}
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className={`px-2 md:px-3 lg:px-5 py-1 h-10 md:h-11 lg:h-12 rounded-xl font-semibold shadow-sm transition text-xs md:text-sm lg:text-base ${step === 1
              ? 'opacity-50 cursor-not-allowed border border-gray-300 text-gray-400'
              : 'border border-[#0053A4] text-[#0053A4] cursor-pointer hover:bg-blue-50'
              }`}
          >
            ← Atrás
          </button>

          {/* Pasos */}
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`min-w-fit px-3 md:px-4 lg:px-6 py-1 h-10 md:h-11 lg:h-12 rounded-lg font-semibold transition text-xs md:text-sm lg:text-base ${step === s.id ? 'bg-[#02254A] text-white' : 'bg-white text-[#02254A] border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {s.id}. {s.title}
            </button>
          ))}

          {/* Botón Continuar */}
          <button
            onClick={() => setStep(step + 1)}
            disabled={!isComplete || step === 4}
            className={`px-2 md:px-3 lg:px-5 py-1 h-10 md:h-11 lg:h-12 rounded-xl font-semibold shadow-sm transition text-xs md:text-sm lg:text-base ${!isComplete || step === 4 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#0053A4] text-white cursor-pointer hover:bg-blue-600'
              }`}
          >
            Continuar →
          </button>
        </div>

        {/* BANNER - DERECHA */}
        <div
          className='
                    bg-[#02254A] text-white px-3 md:px-5 py-3 rounded-xl shadow-lg 
                    text-xs md:text-sm font-semibold w-full md:w-fit flex items-center justify-center
                '
        >
          <div className='flex items-center gap-2 md:gap-3'>
            <span className='text-xl md:text-2xl'>⚡</span>
            <div>
              <p className='font-bold'>Transferencias Inmediatas</p>
              <p className='text-xs md:text-xs text-blue-200'>Seguridad a varios bancos</p>
            </div>
          </div>
        </div>
      </div>
      {/* CONTENIDO DEL PASO */}
      {step === 1 && (
        <div className='flex justify-center mt-10'>
          <ConverterCard showButton={false} onComplete={setIsComplete} />
        </div>
      )}{' '}
      {step === 2 && (
        <div className='flex justify-center mt-10 px-4'>
          <div className='w-full bg-white rounded-3xl shadow-xl p-6 space-y-4'>
            <h2 className='text-xl font-bold text-center mb-4'>Seleccionar Cuentas</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-2 text-center'>Cuenta bancaria de origen de fondos</label>
                <select value={selectedOrigen} onChange={(e) => setSelectedOrigen(e.target.value)} className='w-full p-2 border border-gray-300 rounded-lg'>
                  <option value=''>Selecciona una cuenta</option>
                  {cuentasDefault.map((cuenta) => (
                    <option key={cuenta.id} value={cuenta.id}>
                      {cuenta.banco} - {cuenta.numeroCuenta} ({cuenta.moneda})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium mb-2 text-center'>Cuenta para recibir el depósito del dinero</label>
                <select value={selectedDestino} onChange={(e) => setSelectedDestino(e.target.value)} className='w-full p-2 border border-gray-300 rounded-lg'>
                  <option value=''>Selecciona una cuenta</option>
                  {cuentasDefault.map((cuenta) => (
                    <option key={cuenta.id} value={cuenta.id}>
                      {cuenta.banco} - {cuenta.numeroCuenta} ({cuenta.moneda})
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => alert('Funcionalidad para registrar nueva cuenta próximamente')}
                className='w-full bg- text-white py-2 rounded-lg hover:bg-blue-600'
              >
                Registrar Nueva Cuenta
              </button>
            </div>
          </div>
        </div>
      )}{' '}
      {step === 3 && (
        <div className='flex justify-center mt-10 px-4'>
          <div className='w-full bg-white rounded-3xl shadow-xl p-6 space-y-4'>
            <h2 className='text-xl font-bold text-center mb-4'>Transfiere</h2>
            <p className='text-center'>
              Transfiere{' '}
              <strong>
                {sentCurrency} {transferAmount.toFixed(2)}
              </strong>{' '}
              desde la plataforma de tu banco a cualquiera de las cuentas indicadas líneas abajo.
            </p>
            <div className='text-center'>
              <h3 className='font-bold text-lg'>DOLLAR HOUSE CAMBIOS SAC</h3>
              <p>RUC: 20611057165</p>
            </div>
            <div className='overflow-x-auto p-4'>
              <table className='w-full border-separate border-2 border-blue-300 rounded-lg shadow-md bg-white'>
                <tbody>
                  <tr className='border-b border-blue-300 bg-blue-50'>
                    <td className='px-4 py-2 font-semibold text-center'>Banco</td>
                    <td className='px-4 py-2 text-center'>BCP</td>
                  </tr>
                  <tr className='border-b border-blue-300'>
                    <td className='px-4 py-2 font-semibold text-center'>Tipo de cuenta</td>
                    <td className='px-4 py-2 text-center'>Cuenta Corriente</td>
                  </tr>
                  <tr className='border-b border-blue-300 bg-blue-50'>
                    <td className='px-4 py-2 font-semibold text-center'>Moneda</td>
                    <td className='px-4 py-2 text-center'>USD</td>
                  </tr>
                  <tr>
                    <td className='px-4 py-2 font-semibold text-center'>Número de cuenta CCI</td>
                    <td className='px-4 py-2 text-center'>
                      <button onClick={() => copyToClipboard('00219300109092111219')} className='text-blue-600 underline hover:text-blue-800 cursor-pointer'>
                        00219300109092111219
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='text-center'>
              <span className='inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-medium'>
                Recuerda que sólo aceptamos transferencias de cuenta a cuenta. Si es un depósito en efectivo, procederemos a hacer la respectiva devolución.
              </span>
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className='flex justify-center mt-10 px-4'>
          <div className='w-full bg-white rounded-3xl shadow-xl p-6'>
            <h2 className='text-xl font-bold text-center mb-6'>Verifica</h2>
            
            <div className='space-y-4 mb-6'>
              <div>
                <label className='block text-sm font-medium mb-2'>Escribe el código/número de operación de tu transferencia bancaria:</label>
                <input
                  type='text'
                  placeholder='Ej: PEN 24673.95'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                />
              </div>

              <div>
                <h3 className='text-sm font-bold mb-3'>Adjunta el voucher o comprobante de la transferencia que te entregó tu banco</h3>
                <input
                  id='fileInput'
                  type='file'
                  accept='image/png,image/jpeg,image/jpg,application/pdf'
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  className='hidden'
                />
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className='border-2 border-dashed border-blue-400 rounded-lg p-8 text-center bg-blue-50 cursor-pointer hover:bg-blue-100 transition'
                >
                  {uploadedFile ? (
                    <div>
                      {filePreview ? (
                        <div className='mb-3'>
                          <img src={filePreview} alt='preview' className='max-h-40 mx-auto rounded-lg mb-3' />
                        </div>
                      ) : (
                        <div className='text-5xl mb-3'>📄</div>
                      )}
                      <p className='font-semibold text-gray-800 mb-1'>{uploadedFile.name}</p>
                      <p className='text-xs text-gray-500 mb-3'>{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                          setFilePreview(null);
                        }}
                        className='text-sm text-blue-600 hover:text-blue-800 underline'
                      >
                        Cambiar archivo
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className='text-3xl mb-2'>☁️</div>
                      <p className='font-semibold text-gray-800 mb-1'>Adjunta AQUÍ</p>
                      <p className='text-sm text-gray-500 mb-3'>Arrastra y suelta tu archivo o haz clic para seleccionar</p>
                      <p className='text-xs text-gray-400'>Formato PNG, JPEG o PDF no mayor a 10 MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={() => setStep(step - 1)}
                className='flex-1 px-4 py-2 border-2 border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-50'
              >
                ← Volver
              </button>
              <button
                onClick={() => {
                  const newCode = generateOperationCode();
                  setGeneratedOperationCode(newCode);
                  setShowSuccessModal(true);
                }}
                className='flex-1 px-4 py-2 bg-[#02254A] text-white font-semibold rounded-lg hover:bg-blue-600'
              >
                Enviar solicitud
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
          <div className='bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center'>
            <div className='flex justify-center mb-8'>
              <div className='w-24 h-24 bg-gradient-to-br from-[#B63A42] to-[#02254A] rounded-full flex items-center justify-center shadow-lg'>
                <div className='text-6xl'>✓</div>
              </div>
            </div>
            
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>¡Verificación enviada!</h2>
            <p className='text-sm text-gray-500 mb-8'>Tu solicitud ha sido registrada correctamente</p>
            
            <div className='space-y-6 mb-8'>
              <div className='bg-blue-50 rounded-2xl p-6 border-2 border-blue-200'>
                <p className='text-xs text-gray-600 mb-3 uppercase font-semibold'>Número de operación</p>
                <div className='flex gap-2 items-center justify-center'>
                  <span className='text-2xl font-bold text-[#02254A]'>{generatedOperationCode}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedOperationCode);
                      alert('Código copiado al portapapeles');
                    }}
                    className='px-4 py-2 bg-[#02254A] text-white rounded-lg hover:bg-blue-700 text-sm font-semibold transition'
                  >
                    Copiar
                  </button>
                </div>
              </div>

              <div className='bg-green-50 rounded-2xl p-6 border-2 border-green-200'>
                <p className='text-xs text-gray-600 mb-3 uppercase font-semibold'>Monto a recibir</p>
                <p className='text-2xl font-bold text-green-600'>
                  {receivedCurrency} {receivedAmount.toFixed(2)}
                </p>
              </div>

              <div className='text-left text-sm text-gray-700 space-y-3 bg-gray-50 p-6 rounded-2xl'>
                <div className='flex items-start gap-3'>
                  <span className='text-lg'>📋</span>
                  <p>Verificaremos tu operación y nos encargaremos de transferirte <strong>{receivedCurrency} {receivedAmount.toFixed(2)}</strong> a tu cuenta registrada.</p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-lg'>📧</span>
                  <p>Cuando culmine la operación enviaremos una notificación detallada a tu correo.</p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-lg'>⏱️</span>
                  <p>Puedes seguir el estado de tu operación en la sección <strong>Mis Operaciones</strong>.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setStep(1);
              }}
              className='w-full px-4 py-3 bg-[#02254A] text-white font-semibold rounded-xl hover:bg-blue-700 transition text-lg'
            >
              Ir a mis operaciones
            </button>
          </div>
        </div>
      )}
    </>
  );
}
