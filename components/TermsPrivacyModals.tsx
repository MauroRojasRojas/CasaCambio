'use client';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

interface TermsPrivacyModalsProps {
	showTermsModal: boolean;
	setShowTermsModal: (show: boolean) => void;
	showPrivacyModal: boolean;
	setShowPrivacyModal: (show: boolean) => void;
}

export default function TermsPrivacyModals({ showTermsModal, setShowTermsModal, showPrivacyModal, setShowPrivacyModal }: TermsPrivacyModalsProps) {
	const termsFooter = (
		<div>
			<Button label="Aceptar" icon="pi pi-check" onClick={() => setShowTermsModal(false)} autoFocus />
		</div>
	);

	const privacyFooter = (
		<div>
			<Button label="Aceptar" icon="pi pi-check" onClick={() => setShowPrivacyModal(false)} autoFocus />
		</div>
	);

	return (
		<>
			{/* MODAL TÉRMINOS Y CONDICIONES */}
			<Dialog
				visible={showTermsModal}
				modal
				header="Términos y Condiciones"
				footer={termsFooter}
				style={{ width: '50rem' }}
				onHide={() => setShowTermsModal(false)}
			>
				<div className='text-sm text-slate-700 space-y-4'>
					<p className='text-xs text-slate-500 italic'>M&M DIVISAS SRL - RUC 20614994364</p>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>1. Información General</h3>
						<p>
							M&M DIVISAS SRL, identificada con RUC 20614994364 y con domicilio en Av. Producción Nacional N°185, Urb. La Villa – Chorrillos, ofrece servicios de
							compra y venta de moneda extranjera.
						</p>
						<p className='mt-2'>
							La empresa se encuentra supervisada por la Superintendencia de Banca, Seguros y AFP (SBS), de acuerdo con la normativa vigente aplicable a empresas del
							sistema de servicios de cambio de moneda.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>2. Aceptación de los Términos</h3>
						<p>
							Al acceder o utilizar nuestros servicios, el cliente declara haber leído, comprendido y aceptado íntegramente las disposiciones establecidas en los
							presentes Términos y Condiciones.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>3. Servicios Ofrecidos</h3>
						<p>
							Proveemos servicios de cambio de moneda extranjera en condiciones transparentes, ofreciendo tipos de cambio actualizados conforme a las variaciones del
							mercado. Los valores publicados pueden actualizarse constantemente según las condiciones de mercado sin previo aviso.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>4. Verificación y Cumplimiento Normativo</h3>
						<p>
							En cumplimiento de la normativa de la SBS y de la Ley de Prevención de Lavado de Activos y Financiamiento del Terrorismo, M&M DIVISAS SRL podrá
							solicitar documentos, validaciones y/o información adicional para concretar una operación.
						</p>
						<p className='mt-2'>
							Nos reservamos el derecho de rechazar operaciones que no cumplan los requisitos legales vigentes o que presenten señales de alerta.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>5. Obligaciones del Cliente</h3>
						<p>El cliente se compromete a:</p>
						<ul className='list-disc list-inside mt-2 space-y-1'>
							<li>Proporcionar información veraz y actualizada.</li>
							<li>Realizar operaciones únicamente con fondos de origen lícito.</li>
							<li>Acatar la normativa vigente y los requisitos operativos solicitados por M&M DIVISAS SRL.</li>
						</ul>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>6. Tarifas</h3>
						<p>
							M&M DIVISAS SRL no cobra comisión por el uso de sus servicios. Sin embargo, los bancos pueden aplicar sus propias comisiones o el Impuesto a las
							Transacciones Financieras (ITF).
						</p>
						<p className='mt-2'>
							Si la operación se realiza desde una ciudad distinta a Lima y se generan comisiones interplaza, estos costos serán asumidos por EL USUARIO.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>7. Confirmación de Operaciones</h3>
						<p>
							Toda operación será confirmada al USUARIO por correo electrónico. M&M DIVISAS SRL solo procederá con la ejecución de la compra o venta de divisas una
							vez verificado el ingreso del dinero a nuestras cuentas. Si el depósito no se acredita y valida, la operación podrá quedar sin efecto.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>8. Horario de Atención</h3>
						<p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
						<p>Sábados: 9:00 AM - 1:00 PM</p>
						<p>Domingos y Feriados: Cerrado</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>9. Limitación de Responsabilidad</h3>
						<p>
							M&M DIVISAS SRL no se hace responsable por demoras o interrupciones en el servicio causadas por factores externos como fallos en el sistema bancario,
							problemas de conectividad o situaciones de fuerza mayor.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>10. Modificaciones</h3>
						<p>
							M&M DIVISAS SRL se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán publicadas en la plataforma
							y entrarán en vigor inmediatamente.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>11. Contacto</h3>
						<p>Para consultas sobre nuestros servicios:</p>
						<p className='mt-2'>
							<strong>Correo:</strong> info.dollariza@gmail.com
							<br />
							<strong>Teléfono / WhatsApp:</strong> 956757180
							<br />
							<strong>Dirección:</strong> Av. Producción Nacional N°185, Urb. La Villa – Chorrillos, Lima, Perú
						</p>
					</section>
				</div>
			</Dialog>

			{/* MODAL POLÍTICA DE PRIVACIDAD */}
			<Dialog
				visible={showPrivacyModal}
				modal
				header="Política de Privacidad"
				footer={privacyFooter}
				style={{ width: '50rem' }}
				onHide={() => setShowPrivacyModal(false)}
			>
				<div className='text-sm text-slate-700 space-y-4'>
					<p className='text-xs text-slate-500 italic'>M&M DIVISAS SRL - RUC 20614994364</p>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>1. Información General</h3>
						<p>
							M&M DIVISAS SRL respeta tu privacidad y se compromete a proteger la información personal que nos proporcionas. Esta Política de Privacidad explica cómo
							recopilamos, utilizamos y protegemos tu información.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>2. Información que Recopilamos</h3>
						<p>Podemos recopilar la siguiente información:</p>
						<ul className='list-disc list-inside mt-2 space-y-1'>
							<li>Información de identificación personal (nombre, DNI, dirección, etc.)</li>
							<li>Información de contacto (correo electrónico, teléfono)</li>
							<li>Información financiera (datos bancarios para transacciones)</li>
							<li>Información de uso de nuestros servicios</li>
						</ul>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>3. Uso de la Información</h3>
						<p>Utilizamos tu información para:</p>
						<ul className='list-disc list-inside mt-2 space-y-1'>
							<li>Procesar tus transacciones de cambio de moneda</li>
							<li>Cumplir con requisitos legales y regulatorios</li>
							<li>Verificar tu identidad y prevenir fraudes</li>
							<li>Mejorar nuestros servicios</li>
							<li>Comunicarnos contigo sobre tus operaciones</li>
						</ul>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>4. Protección de Datos</h3>
						<p>
							Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o
							destrucción.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>5. Compartir Información</h3>
						<p>
							Solo compartimos tu información cuando es necesario para cumplir con obligaciones legales, regulatorias o para procesar tus transacciones. No vendemos
							tu información a terceros.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>6. Retención de Datos</h3>
						<p>
							Mantenemos tu información personal durante el tiempo necesario para cumplir con los fines para los que fue recopilada, y según lo requieran las leyes
							aplicables.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>7. Tus Derechos</h3>
						<p>Tienes derecho a:</p>
						<ul className='list-disc list-inside mt-2 space-y-1'>
							<li>Acceder a tu información personal</li>
							<li>Rectificar datos inexactos</li>
							<li>Solicitar la eliminación de tus datos</li>
							<li>Oponerte al tratamiento de tus datos</li>
						</ul>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>8. Cookies y Tecnologías Similares</h3>
						<p>
							Podemos utilizar cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma y analizar el uso de nuestros servicios.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>9. Cambios en la Política</h3>
						<p>
							M&M DIVISAS SRL podrá actualizar esta Política de Privacidad cuando lo considere necesario. Las modificaciones serán publicadas en la plataforma y, de
							ser significativas, se notificarán por correo electrónico.
						</p>
					</section>

					<section>
						<h3 className='text-lg font-bold text-[#02254A] mb-2'>10. Contacto</h3>
						<p>Para consultas sobre privacidad o el tratamiento de tus datos personales, contáctanos:</p>
						<p className='mt-2'>
							<strong>Correo:</strong> info.dollariza@gmail.com
							<br />
							<strong>Teléfono / WhatsApp:</strong> 956757180
							<br />
							<strong>Dirección:</strong> Av. Producción Nacional N°185, Urb. La Villa – Chorrillos, Lima, Perú
						</p>
					</section>
				</div>
			</Dialog>
		</>
	);
}
