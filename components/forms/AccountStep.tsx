// components/forms/AccountStep.tsx
import { Dispatch, SetStateAction, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useRouter } from 'next/navigation';

interface AccountStepProps {
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    emailError: string;
    setEmailError: Dispatch<SetStateAction<string>>;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    passwordError: string;
    setPasswordError: Dispatch<SetStateAction<string>>;
    termsAccepted: boolean;
    setTermsAccepted: Dispatch<SetStateAction<boolean>>;
    termsError: string;
    setTermsError: Dispatch<SetStateAction<string>>;
    setShowTermsModal: Dispatch<SetStateAction<boolean>>;
    setShowPrivacyModal: Dispatch<SetStateAction<boolean>>;
    onNext: () => void;
    onBack: () => void;
}

export default function AccountStep({
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordError,
    setPasswordError,
    termsAccepted,
    setTermsAccepted,
    termsError,
    setTermsError,
    setShowTermsModal,
    setShowPrivacyModal,
    onNext,
    onBack,
}: AccountStepProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validatePassword = (value: string) => {
        if (!value) return 'La contraseña es obligatoria';
        if (/\s/.test(value)) return 'La contraseña no puede contener espacios';
        if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
        if (!/[A-Z]/.test(value)) return 'La contraseña debe tener al menos una mayúscula';
        if (!/[a-z]/.test(value)) return 'La contraseña debe tener al menos una minúscula';
        if (!/[^A-Za-z0-9\s]/.test(value)) return 'La contraseña debe tener al menos un carácter especial';
        return '';
    };

    const validatePasswords = (newPassword: string, newConfirmPassword: string) => {
        const passwordValidationError = validatePassword(newPassword);

        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (newConfirmPassword && newPassword !== newConfirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            return;
        }

        setPasswordError('');
    };

    return (
        <div className='px-6 sm:px-10 py-8 flex flex-col justify-start'>
            {/* HEADER */}
            <div className='flex flex-col sm:flex-row items-start gap-4 mb-6'>
                <Button
                    id='back-btn'
                    icon='pi pi-arrow-left'
                    rounded
                    outlined
                    className='p-2 sm:p-3'
                    onClick={onBack}
                />
                <div className='flex flex-col text-start sm:text-left'>
                    <span className='text-2xl font-extrabold text-[#02254A]'>Empecemos tu registro</span>
                    <p className='text-sm text-slate-600 mt-4'>¿Ya tienes una cuenta?</p>
                    <a
                        onClick={() => router.push('/login')}
                        className='text-[#0053A4] text-sm font-semibold hover:underline cursor-pointer'
                    >
                        {' '}
                        Iniciar sesión →
                    </a>
                </div>
            </div>
            <Tooltip target='#back-btn' content='Atrás' />

            <form className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-2'>
                {/* CORREO */}
                <div className='col-span-2'>
                    <FloatLabel className='w-full'>
                        <InputText
                            id='email_input'
                            type='email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (e.target.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
                                    setEmailError('Formato de correo inválido');
                                } else {
                                    setEmailError('');
                                }
                            }}
                            autoComplete='email'
                            invalid={!!emailError}
                            className='w-full'
                        />
                        <label htmlFor='email_input'>Correo</label>
                    </FloatLabel>
                    {emailError && <p className='text-red-600 text-xs mt-2'>{emailError}</p>}
                </div>

                {/* CONTRASEÑAS */}
                <div className='col-span-2'>
                    <div className='flex flex-col gap-x-6 gap-y-8'>
                        <div className='relative'>
                            <FloatLabel className='w-full'>
                                <InputText
                                    id='password_input'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        const newPassword = e.target.value;
                                        setPassword(newPassword);
                                        validatePasswords(newPassword, confirmPassword);
                                    }}
                                    className='w-full'
                                    invalid={!!passwordError}
                                />
                                <label htmlFor='password_input'>Contraseña</label>
                            </FloatLabel>
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-700 transition-colors'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPassword(!showPassword);
                                }}
                            >
                                <i className={showPassword ? 'pi pi-eye-slash text-sm' : 'pi pi-eye text-sm'}></i>
                            </button>
                        </div>

                        <div className='relative'>
                            <FloatLabel className='w-full'>
                                <InputText
                                    id='confirm_password_input'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        const newConfirmPassword = e.target.value;
                                        setConfirmPassword(newConfirmPassword);
                                        validatePasswords(password, newConfirmPassword);
                                    }}
                                    className='w-full'
                                    invalid={!!passwordError}
                                />
                                <label htmlFor='confirm_password_input'>Confirmar contraseña</label>
                            </FloatLabel>
                            <button
                                type='button'
                                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-500 hover:text-slate-700 transition-colors'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowConfirmPassword(!showConfirmPassword);
                                }}
                            >
                                <i className={showConfirmPassword ? 'pi pi-eye-slash text-sm' : 'pi pi-eye text-sm'}></i>
                            </button>
                        </div>
                    </div>

                    {/* REGLAS VISUALES */}
                    <div className='mt-3 space-y-1 text-xs'>
                        <p className={`${password.length >= 8 && !/\s/.test(password) ? 'text-green-600' : 'text-slate-500'}`}>
                            • Mínimo 8 caracteres
                        </p>
                        <p className={`${/[A-Z]/.test(password) ? 'text-green-600' : 'text-slate-500'}`}>
                            • Al menos una mayúscula
                        </p>
                        <p className={`${/[a-z]/.test(password) ? 'text-green-600' : 'text-slate-500'}`}>
                            • Al menos una minúscula
                        </p>
                        <p className={`${/[^A-Za-z0-9\s]/.test(password) ? 'text-green-600' : 'text-slate-500'}`}>
                            • Un carácter especial
                        </p>
                    </div>

                    {passwordError && <p className='text-red-600 text-xs mt-2'>{passwordError}</p>}
                </div>

                {/* TERMINOS */}
                <div className='col-span-2 mb-6'>
                    <div className='flex flex-row items-center gap-3 text-sm text-slate-700'>
                        <Checkbox
                            checked={termsAccepted}
                            onChange={(e) => {
                                setTermsAccepted(e.checked || false);
                                setTermsError(e.checked ? '' : 'Debes aceptar los términos para continuar');
                            }}
                            className='shrink-0'
                        />
                        <label className='flex-1 cursor-pointer text-justify pr-5'>
                            Acepto los{' '}
                            <a
                                onClick={() => setShowTermsModal(true)}
                                className='text-blue-700 underline cursor-pointer'
                            >
                                Términos y Condiciones
                            </a>{' '}
                            y la{' '}
                            <a
                                onClick={() => setShowPrivacyModal(true)}
                                className='text-blue-700 underline cursor-pointer'
                            >
                                Política de Privacidad
                            </a>
                            .
                        </label>
                    </div>
                    {termsError && <p className='text-red-600 text-xs mt-2 ml-7'>{termsError}</p>}
                </div>
            </form>

            {/* BOTÓN */}
            <Button
                disabled={
                    !email ||
                    !password ||
                    !confirmPassword ||
                    !termsAccepted ||
                    emailError !== '' ||
                    passwordError !== '' ||
                    termsError !== ''
                }
                onClick={onNext}
                label='Continuar'
                raised
                className='w-full mt-6'
            />
        </div>
    );
}