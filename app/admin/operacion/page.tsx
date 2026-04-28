'use client';

import { useState, useEffect, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useRouter } from 'next/navigation';
import ConverterCard from '@/components/ConverterCard';
import AddEditCuentaModal from '@/components/AddEditCuentaModal';
import ConstanciaPDF from '@/components/ConstanciaPDF';
import { obtenerCuentasPorPersona } from '@/lib/services/cuentaBancariaService';
import { registrarOperacion } from '@/lib/services/operacionService';
import type { BankAccountModel } from '@/data/bank-account.model';
import { OperationModel } from '@/data/operation.model';
import { RAZON_SOCIAL, RUC } from '@/lib/utils/constants';
import { BANK_ACCOUNTS } from '@/data/banks';

export default function Operacion() {
	const compra = 3.3465;
	const venta = 3.3765;
	const toast = useRef<Toast>(null);

	const [step, setStep] = useState(1);
	const [isComplete, setIsComplete] = useState(false);
	const [transferAmount, setTransferAmount] = useState(100);
	const [transferMode, setTransferMode] = useState<'COMPRA' | 'VENTA'>('VENTA');
	const [receivedAmount, setReceivedAmount] = useState(0);
	const [sentCurrency, setSentCurrency] = useState('PEN');
	const [receivedCurrency, setReceivedCurrency] = useState('USD');
	const [selectedOrigen, setSelectedOrigen] = useState('');
	const [selectedDestino, setSelectedDestino] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showConstanciaModal, setShowConstanciaModal] = useState(false);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [operationCode, setOperationCode] = useState('');
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [filePreview, setFilePreview] = useState<string | null>(null);
	const [generatedOperationCode, setGeneratedOperationCode] = useState('');
	const [cuentas, setCuentas] = useState<BankAccountModel[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [cuentaToEdit, setCuentaToEdit] = useState<BankAccountModel | null>(null);
	const [userName, setUserName] = useState('');
	const [emissionDate, setEmissionDate] = useState('');
	const [selectedCuentaOrigen, setSelectedCuentaOrigen] = useState<BankAccountModel | null>(null);
	const [selectedCuentaDestino, setSelectedCuentaDestino] = useState<BankAccountModel | null>(null);

	const router = useRouter();

	useEffect(() => {
		try {
			const user = JSON.parse(localStorage.getItem('user') || '{}');
			if (user.fullName) {
				setUserName(user.fullName);
			}
			// Obtener fecha y hora actual en formato ISO 8601
			setEmissionDate(new Date().toISOString());
		} catch (error) {
			console.error('Error getting user data:', error);
		}
	}, []);

	const items = [
		{
			label: 'Cotiza',
			icon: 'pi pi-calculator',
			command: (event: { item?: { label?: string } }) => {
				setStep(1);
			},
		},
		{
			label: 'Seleccionar Cuentas',
			icon: 'pi pi-credit-card',
			command: (event: { item?: { label?: string } }) => {
				setStep(2);
			},
		},
		{
			label: 'Transfiere',
			icon: 'pi pi-send',
			command: (event: { item?: { label?: string } }) => {
				setStep(3);
			},
		},
		{
			label: 'Verifica',
			icon: 'pi pi-check-circle',
			command: (event: { item?: { label?: string } }) => {
				setStep(4);
			},
		},
	];

	useEffect(() => {
		if (step === 1) return;

		const savedSentAmount = localStorage.getItem('converterSentAmount');
		const savedSentCurrency = localStorage.getItem('converterSentCurrency');
		const savedReceivedAmount = localStorage.getItem('converterReceivedAmount');
		const savedReceivedCurrency = localStorage.getItem('converterReceivedCurrency');

		if (savedSentAmount && !isNaN(Number(savedSentAmount))) {
			setTransferAmount(Number(savedSentAmount));
		}

		if (savedSentCurrency) {
			setSentCurrency(savedSentCurrency);
			setTransferMode(savedSentCurrency === 'USD' ? 'COMPRA' : 'VENTA');
		}

		if (savedReceivedAmount && !isNaN(Number(savedReceivedAmount))) {
			setReceivedAmount(Number(savedReceivedAmount));
		}

		if (savedReceivedCurrency) {
			setReceivedCurrency(savedReceivedCurrency);
		}
	}, [step]);

	/* useEffect(() => {
		const savedSentAmount = localStorage.getItem('converterSentAmount');
		const savedSentCurrency = localStorage.getItem('converterSentCurrency');
		const savedReceivedAmount = localStorage.getItem('converterReceivedAmount');
		const savedReceivedCurrency = localStorage.getItem('converterReceivedCurrency');

		if (savedSentAmount && !isNaN(Number(savedSentAmount))) {
			setTransferAmount(Number(savedSentAmount));
		}

		if (savedSentCurrency) {
			setSentCurrency(savedSentCurrency);
			setTransferMode(savedSentCurrency === 'USD' ? 'COMPRA' : 'VENTA');
		}

		if (savedReceivedAmount && !isNaN(Number(savedReceivedAmount))) {
			setReceivedAmount(Number(savedReceivedAmount));
		}

		if (savedReceivedCurrency) {
			setReceivedCurrency(savedReceivedCurrency);
		}
	}, []); */

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

	const loadCuentas = async () => {
		try {
			const user = JSON.parse(localStorage.getItem('user') || '{}');
			const codigoPersona = user.perfilCompleto;
			if (codigoPersona) {
				const response = await obtenerCuentasPorPersona(codigoPersona);
				if (response.ok) {
					const data = await response.json();
					setCuentas(Array.isArray(data.message) ? data.message : []);
				} else {
					console.error('Error al obtener cuentas');
				}
			}
		} catch (error) {
			console.error('Error loading cuentas:', error);
		}
	};

	useEffect(() => {
		loadCuentas();
	}, []);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.current?.show({ severity: 'success', summary: 'Copiado', detail: 'Código copiado al portapapeles', life: 2000 });
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

	const maskAccountNumber = (accountNumber: string): string => {
		if (!accountNumber || accountNumber.length <= 4) return accountNumber;
		const lastFour = accountNumber.slice(-4);
		const masked = 'x'.repeat(accountNumber.length - 4) + lastFour;
		return masked;
	};

	const mapSentCurrencyToBankMoney = (c: string) => {
		switch (c) {
			case 'PEN':
				return 'SOLES';
			case 'USD':
				return 'DOLARES';
			default:
				return c.toUpperCase();
		}
	};

	const sentCurrencyFromStorage = (typeof window !== 'undefined' ? localStorage.getItem('converterSentCurrency') || '' : '') as string;
	const effectiveSentCurrency = sentCurrency || sentCurrencyFromStorage || 'PEN';
	const bankMoneyFilter = mapSentCurrencyToBankMoney(effectiveSentCurrency);

	return (
		<>
			<Toast ref={toast} />
			{/* CONTENEDOR PRINCIPAL */}
			<div className='max-w-6xl mx-auto px-4 py-8 bg-zinc-50 border border-zinc-200 rounded-lg'>
				{/* STEPS */}
				<div className='mb-8 bg-white border border-zinc-200 rounded-lg p-4 overflow-x-auto'>
					<Steps model={items} activeIndex={step - 1} onSelect={(e) => setStep(e.index + 1)} readOnly={true} className='w-full' />
				</div>
				{/* CONTENIDO DEL PASO */}
				{step === 1 && (
					<div className='flex justify-center mt-10'>
						<div className='max-w-4xl mx-auto'>
							<ConverterCard showButton={false} onComplete={setIsComplete} />
						</div>
					</div>
				)}{' '}
				{step === 2 && (
					<div className='flex justify-center mt-10'>
						<div className='w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 space-y-4'>
							<div className='flex flex-col sm:flex-row gap-y-4 justify-between items-center border-b border-zinc-200 pb-4 mb-4'>
								<span className='text-lg font-bold'>Seleccionar Cuentas</span>
								<Button
									size='small'
									label='Registrar Nueva Cuenta'
									icon='pi pi-plus'
									onClick={() => {
										setCuentaToEdit(null);
										setModalVisible(true);
									}}
								/>
							</div>
							<div className='space-y-4'>
								<div>
									<label className='block text-sm font-medium mb-2 text-start'>Cuenta bancaria de origen de fondos</label>
									<Dropdown
										value={selectedOrigen}
										onChange={(e) => {
											setSelectedOrigen(e.value);
											const cuenta = cuentas.find((c) => c.id === e.value) || null;
											setSelectedCuentaOrigen(cuenta);
										}}
										options={
											Array.isArray(cuentas)
												? cuentas.map((cuenta) => ({
													name: `${cuenta.banco} - ${cuenta.numeroCuenta} (${cuenta.moneda})`,
													id: cuenta.id,
												}))
												: []
										}
										optionLabel='name'
										optionValue='id'
										placeholder='Selecciona una cuenta'
										className='w-full'
										showClear
										appendTo='self'
										panelClassName='dropdown-panel-mobile'
										checkmark
										highlightOnSelect={false}
									/>
								</div>
								<div>
									<label className='block text-sm font-medium mb-2 text-start'>Cuenta para recibir el depósito del dinero</label>
									<Dropdown
										value={selectedDestino}
										onChange={(e) => {
											setSelectedDestino(e.value);
											const cuenta = cuentas.find((c) => c.id === e.value) || null;
											setSelectedCuentaDestino(cuenta);
										}}
										options={
											Array.isArray(cuentas)
												? cuentas.map((cuenta) => ({
													name: `${cuenta.banco} - ${cuenta.numeroCuenta} (${cuenta.moneda})`,
													id: cuenta.id,
												}))
												: []
										}
										optionLabel='name'
										optionValue='id'
										placeholder='Selecciona una cuenta'
										className='w-full'
										showClear
										appendTo='self'
										panelClassName='dropdown-panel-mobile'
										checkmark
										highlightOnSelect={false}
									/>
								</div>
							</div>
						</div>
					</div>
				)}{' '}
				{step === 3 && (
					<div className='flex justify-center mt-10'>
						<div className='w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 space-y-4'>
							<div className='flex justify-center items-center border-b border-zinc-200 pb-4 mb-4'>
								<span className='text-lg font-bold'>Transfiere</span>
							</div>
							<p className='text-center'>
								Transfiere{' '}
								<strong>
									{sentCurrency} {Number(transferAmount).toFixed(2)}
								</strong>{' '}
								desde la plataforma de tu banco a la cuenta indicada en las líneas de abajo.
							</p>
							<div className='text-center'>
								<h3 className='font-bold'>{RAZON_SOCIAL}</h3>
								<p className='text-sm'>RUC: {RUC}</p>
							</div>
							<div className='py-4'>
								<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4'>
									{BANK_ACCOUNTS.filter((acc) => acc.money === bankMoneyFilter).map((acc, idx) => (
										<div
											key={`${acc.bank}-${acc.money}-${idx}`}
											className='p-3 rounded-lg border border-zinc-200 shadow-sm hover:shadow-md'
											style={{ background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 180%)' }}
										>
											<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
												<div className='min-w-0'>
													<div className='font-semibold text-sm truncate text-blue-900'>{acc.bank}</div>
													<div className='text-xs sm:text-sm text-zinc-500 truncate'>
														{acc.type} · {acc.money === 'SOLES' ? 'Soles' : acc.money === 'DOLARES' ? 'Dólares' : acc.money}
													</div>
												</div>
												<div className='mt-2 sm:mt-0 text-sm font-mono text-zinc-700 wrap-break-word'>{acc.account ?? <span className='text-zinc-400'>Pendiente</span>}</div>
											</div>
											<div className='mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
												<div className='text-xs sm:text-sm text-zinc-500 wrap-break-word'>CCI: {acc.cci ? <span className='text-zinc-700'>{acc.cci}</span> : <span className='text-zinc-400'>Pendiente</span>}</div>
												<div className='flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto'>
													{acc.account && (
														<button onClick={() => copyToClipboard(acc.account)} className='text-blue-600 text-xs hover:underline w-full sm:w-auto text-left'>
															Copiar cuenta
														</button>
													)}
													{acc.cci && (
														<button onClick={() => copyToClipboard(acc.cci)} className='text-blue-600 text-xs hover:underline w-full sm:w-auto text-left'>
															Copiar CCI
														</button>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
				{step === 4 && (
					<div className='flex justify-center mt-10'>
						<div className='w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 border border-zinc-200'>
							{/* Logo centrado */}
							<div className='flex justify-center mb-8'>
								<img src='/icons/logomejorado.png' alt='Dollariza Logo' className='h-20 w-auto' />
							</div>

							{/* Encabezado con 2 columnas */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
								<div>
									<h1 className='text-xl font-bold text-zinc-800 mb-3'>CONSTANCIA DE PAGO</h1>
									<p className='font-semibold text-zinc-800 text-sm'>{RAZON_SOCIAL}</p>
									<p className='text-sm text-zinc-600'>RUC: {RUC}</p>
								</div>
								<div className='text-left sm:text-right'>
									<p className='text-sm text-zinc-600 mb-3'>
										{new Intl.DateTimeFormat('es-PE', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										}).format(new Date(emissionDate))}
									</p>
									<p className='font-semibold text-zinc-800 text-sm'>Código: {generatedOperationCode}</p>
								</div>
							</div>

							{/* Línea divisora */}
							<div className='border-b border-zinc-300 mb-6'></div>

							{/* Información del cliente */}
							<p className='text-sm text-zinc-700 mb-6'>
								Cliente: <span className='font-semibold'>{userName}</span>
							</p>

							{/* Contenido principal */}
							<div className='space-y-6 mb-8'>
								{/* Párrafo introductorio */}
								<p className='text-sm text-zinc-700 leading-relaxed text-justify'>
									Se genera esta constancia con código <span className='font-semibold'>{generatedOperationCode}</span> que valida siempre y cuando haga el envío correspondiente de su pago al correo{' '}
									<span className='font-semibold'>info.dollariza@gmail.com</span>.
								</p>

								{/* Párrafo de la operación */}
								{selectedCuentaOrigen && selectedCuentaDestino && (
									<p className='text-sm text-zinc-700 leading-relaxed text-justify'>
										La operación tiene como resultado el envío de{' '}
										<span className='font-semibold'>
											{sentCurrency} {Number(transferAmount).toFixed(2)}
										</span>{' '}
										desde su cuenta registrada en <span className='font-semibold'>{selectedCuentaOrigen!.banco}</span> ({maskAccountNumber(selectedCuentaOrigen!.numeroCuenta)}) en moneda <span className='font-semibold'>{selectedCuentaOrigen!.moneda}</span>,
										hacia su cuenta receptora en <span className='font-semibold'>{selectedCuentaDestino!.banco}</span> ({maskAccountNumber(selectedCuentaDestino!.numeroCuenta)}) en moneda <span className='font-semibold'>{selectedCuentaDestino!.moneda}</span>,
										por un monto equivalente de{' '}
										<span className='font-semibold'>
											{receivedCurrency} {Number(receivedAmount).toFixed(2)}
										</span>
										.
									</p>
								)}

								{/* Línea divisora antes de instrucciones */}
								<div className='border-b border-zinc-300'></div>

								{/* Instrucciones */}
								<div className='space-y-3'>
									<p className='font-semibold text-zinc-800 text-sm'>Instrucciones de envío</p>
									<p className='text-sm text-zinc-700 leading-relaxed text-justify'>
										Envíe esta constancia al correo <span className='font-semibold'>info.dollariza@gmail.com</span> dentro de los próximos 20 minutos junto con el comprobante de su transferencia. Incluya todos los detalles de la operación para una verificación
										rápida y eficiente.
									</p>
								</div>
							</div>

							{/* Botón de descarga */}
							<div className='flex justify-center mb-6'>
								<ConstanciaPDF
									userName={userName}
									emissionDate={emissionDate}
									operationCode={generatedOperationCode}
									selectedCuentaOrigen={selectedCuentaOrigen}
									selectedCuentaDestino={selectedCuentaDestino}
									sentCurrency={sentCurrency}
									transferAmount={transferAmount}
									receivedCurrency={receivedCurrency}
									receivedAmount={receivedAmount}
								/>
							</div>

							{/* Pie de página */}
							<div className='border-t border-zinc-300 pt-4'>
								<p className='text-xs text-zinc-500 leading-relaxed text-justify'>
									Esta constancia es válida únicamente si se valida de manera correcta el comprobante enviado por correo electrónico. De lo contrario, quedará anulada y no procederá la transacción.
								</p>
							</div>
						</div>
					</div>
				)}
				{/* BOTONES NAVEGACIÓN */}
				<div className='mt-8 bg-white border border-zinc-200 rounded-lg p-4 overflow-x-auto flex flex-col sm:flex-row gap-4'>
					<Button
						label='Cancelar'
						severity='danger'
						outlined
						onClick={() => {
							if (step > 1) setStep(step - 1);
						}}
						disabled={step === 1}
						className='flex-1'
					/>
					<Button
						label='Continuar'
						disabled={step === 2 && (!selectedOrigen || !selectedDestino)}
	onClick={async () => {
		if (step === 2 && (!selectedOrigen || !selectedDestino)) {
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar ambas cuentas para continuar.', life: 3000 });
			return;
		}
							if (step === 3) {
								// Generar código si no existe
								let code = generatedOperationCode;
								if (!code) {
									code = generateOperationCode();
									setGeneratedOperationCode(code);
								}
								// Construir operación
								const user = JSON.parse(localStorage.getItem('user') || '{}');
								const operacion: Omit<OperationModel, 'id'> = {
									personaCode: user.perfilCompleto,
									cuentaBancariaOrigenId: selectedOrigen,
									cuentaBancariaDestinoId: selectedDestino,
									montoEnviado: transferAmount,
									monedaEnviada: sentCurrency,
									montoRecibido: receivedAmount,
									monedaRecibida: receivedCurrency,
									tipoOperacion: transferMode,
									codigoOperacion: code,
									fechaEmision: emissionDate,
									estado: 'COMPLETADA',
									tasaCompra: compra,
									tasaVenta: venta,
								};
								try {
									const response = await registrarOperacion(operacion);
									if (response.ok) {
										toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Operación registrada exitosamente.', life: 3000 });
										setStep(4);
									} else {
										const errorData = await response.json();
										toast.current?.show({ severity: 'error', summary: 'Error', detail: errorData.message || 'Error al registrar la operación.', life: 3000 });
									}
								} catch (error) {
									toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error de conexión al registrar la operación.', life: 3000 });
								}
								return;
							}
							if (step < 4) {
								setStep(step + 1);
							} else {
								setShowConfirmDialog(true);
							}
						}}
						className='flex-1'
					/>
				</div>
				{/* BANNER */}
				<div className='mt-4 bg-[#02254A] text-white px-6 py-4 rounded-xl shadow-lg text-sm font-semibold w-full flex items-center justify-center'>
					<div className='flex items-center gap-3'>
						<span className='text-2xl'>⚡</span>
						<div>
							<p className='font-bold'>Transferencias Inmediatas</p>
							<p className='text-xs text-blue-200'>Seguridad a varios bancos</p>
						</div>
					</div>
				</div>
			</div>

			{showConstanciaModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
					<div className='bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center'>
						<div className='flex justify-center mb-8'>
							<div className='w-24 h-24 bg-linear-to-br from-[#B63A42] to-[#02254A] rounded-full flex items-center justify-center shadow-lg'>
								<div className='text-6xl'>✓</div>
							</div>
						</div>

						<h2 className='text-3xl font-bold text-zinc-800 mb-2'>Constancia Generada</h2>
						<p className='text-sm text-zinc-500 mb-8'>Tu constancia ha sido creada correctamente</p>

						<div className='space-y-6 mb-8'>
							<div className='text-justify space-y-4'>
								<div className='flex justify-center mb-6'>
									<img src='/icons/logomejorado.png' alt='Logo' className='h-16' />
								</div>
								<h3 className='text-2xl font-bold text-zinc-800 text-center'>Constancia de Pago</h3>
								<p className='text-lg text-zinc-700 leading-relaxed'>
									Se genera esta constancia con código <strong className='text-[#02254A]'>{generatedOperationCode}</strong> que valida siempre y cuando haga el envío correspondiente de su pago al correo <strong>info.dollariza@gmail.com</strong>, donde usted
									realiza la compra de{' '}
									<strong>
										{sentCurrency} {Number(transferAmount).toFixed(2)}
									</strong>{' '}
									por el valor equivalente de{' '}
									<strong>
										{receivedCurrency} {Number(receivedAmount).toFixed(2)}
									</strong>
									. Esta constancia es un documento oficial emitido por {RAZON_SOCIAL}, con RUC {RUC}, y debe ser enviada dentro de los próximos 20 minutos para proceder con la validación y procesamiento de su operación de cambio de divisas. Asegúrese de
									incluir todos los detalles necesarios en el correo para una verificación rápida y eficiente.
								</p>
							</div>

							<div className='bg-zinc-50 p-6 rounded-lg border border-zinc-200'>
								<div className='flex items-center gap-3 mb-4'>
									<p className='text-sm font-semibold text-zinc-800'>
										Envía esta constancia al correo <strong>info.dollariza@gmail.com</strong> dentro de los próximos 20 minutos.
									</p>
								</div>
								<div className='text-sm text-zinc-500 italic border-t pt-4'>
									Esta constancia es válida únicamente si se valida de manera correcta el comprobante enviado por correo electrónico. De lo contrario, quedará anulada y no procederá la transacción.
								</div>
							</div>
						</div>

						<div className='flex gap-4'>
							<ConstanciaPDF
								userName={userName}
								emissionDate={emissionDate}
								operationCode={generatedOperationCode}
								selectedCuentaOrigen={selectedCuentaOrigen}
								selectedCuentaDestino={selectedCuentaDestino}
								sentCurrency={sentCurrency}
								transferAmount={transferAmount}
								receivedCurrency={receivedCurrency}
								receivedAmount={receivedAmount}
							/>
							<Button label='Cerrar' severity='secondary' outlined onClick={() => setShowConstanciaModal(false)} className='flex-1' />
						</div>
					</div>
				</div>
			)}

			<Dialog
				header='Confirmación de Envío'
				visible={showConfirmDialog}
				style={{ width: '50vw' }}
				breakpoints={{ '640px': '90vw', '480px': '100vw' }}
				onHide={() => setShowConfirmDialog(false)}
				footer={
					<div className='flex gap-2 justify-end'>
						<Button
							label='Confirmar Envío'
							icon='pi pi-check'
							onClick={() => {
								setShowConfirmDialog(false);
								router.push('/admin/historial');
							}}
						/>
					</div>
				}
			>
				<div className='text-center space-y-4'>
					<div className='flex justify-center mb-4'>
						<div className='flex justify-center mb-4'>
							<img
								src='/icons/logogo.png'
								alt='Dollariza'
								className='h-24 w-auto object-contain'
							/>
						</div>
					</div>
					<h3 className='text-xl font-bold'>¿Has enviado la constancia?</h3>
					<p className='text-zinc-600'>
						Asegúrate de haber enviado la constancia de pago al correo <strong>info.dollariza@gmail.com</strong> dentro de los próximos 20 minutos para completar la operación.
					</p>
					<p className='text-sm text-zinc-500'>Recuerda que la constancia es válida solo si se valida correctamente el comprobante enviado por correo.</p>
				</div>
			</Dialog>

			<AddEditCuentaModal
				visible={modalVisible}
				onHide={() => setModalVisible(false)}
				cuenta={cuentaToEdit}
				onSave={async (savedCuenta) => {
					if (cuentaToEdit) {
						// Editar
						setCuentas(cuentas.map((c) => (c.id === savedCuenta.id ? savedCuenta : c)));
					} else {
						// Agregar
						setCuentas([...cuentas, savedCuenta]);
					}
					// Reload from backend
					await loadCuentas();
				}}
			/>
		</>
	);
}
