// components/forms/ProfileStep.tsx
import { Dispatch, SetStateAction } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

interface ProfileStepProps {
	profile: 'persona' | 'empresa' | null;
	setProfile: Dispatch<SetStateAction<'persona' | 'empresa' | null>>;
	onNext: () => void;
}

export default function ProfileStep({ profile, setProfile, onNext }: ProfileStepProps) {
	const router = useRouter();

	const handleRegister = () => {
		onNext();
	};

	return (
		<div className='flex flex-col justify-start p-4 m-4'>
			<span className='text-2xl font-extrabold text-[#02254A]'>Regístrate</span>

			<p className='text-sm text-slate-600 mt-4'>¿Ya tienes una cuenta?</p>
			<a onClick={() => router.push('/login')} className='text-[#0053A4] text-sm font-semibold hover:underline cursor-pointer'> Iniciar sesión →</a>
			<p className='mt-6 text-sm text-slate-700 font-medium'>Elige un perfil para continuar con el registro</p>

			{/* PERSONA */}
			<div
				onClick={() => setProfile('persona')}
				className={`mt-5 flex items-center gap-3 cursor-pointer border rounded-xl px-5 py-4 transition ${
					profile === 'persona' ? 'border-[#004084] bg-[#E6F1FF] shadow-md scale-[1.02]' : 'border-slate-300 hover:border-[#0053A4] hover:bg-slate-100'
				}`}
			>
				<i className='pi pi-user text-xl text-[#02254A]'></i>
				<span className='text-[#02254A] font-semibold text-lg'>Persona</span>
			</div>

			{/* EMPRESA */}
			<div
				onClick={() => setProfile('empresa')}
				className={`my-4 flex items-center gap-3 cursor-pointer border rounded-xl px-5 py-4 transition ${
					profile === 'empresa' ? 'border-[#004084] bg-[#E6F1FF] shadow-md scale-[1.02]' : 'border-slate-300 hover:border-[#0053A4] hover:bg-slate-100'
				}`}
			>
				<i className='pi pi-building text-xl text-[#02254A]'></i>
				<span className='text-[#02254A] font-semibold text-lg'>Empresa</span>
			</div>

			{/* BOTÓN */}
			<Button disabled={!profile} onClick={handleRegister} label='Registrarme' raised />
		</div>
	);
}
