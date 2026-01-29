'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface TermsPrivacyModalsProps {
	showTermsModal: boolean;
	setShowTermsModal: (show: boolean) => void;
	showPrivacyModal: boolean;
	setShowPrivacyModal: (show: boolean) => void;
}

export default function TermsPrivacyModals({ showTermsModal, setShowTermsModal, showPrivacyModal, setShowPrivacyModal }: TermsPrivacyModalsProps) {
	return (
		<>
			{/* MODAL TÉRMINOS Y CONDICIONES */}
			{showTermsModal && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
					<div className='w-[90%] max-w-2xl max-h-[80vh] overflow-auto bg-white rounded-2xl shadow-2xl'>
						{/* HEADER */}
						<div className='sticky top-0 flex items-center justify-between bg-[#02254A] px-6 py-4 rounded-t-2xl'>
							<h2 className='text-xl sm:text-2xl font-bold text-white'>Términos y Condiciones</h2>
							<button onClick={() => setShowTermsModal(false)} className='text-white hover:bg-white/20 p-1 rounded transition'>
								<XMarkIcon className='w-6 h-6' />
							</button>
						</div>

						{/* CONTENIDO */}
						<div className='px-4 sm:px-6 py-6 text-sm text-slate-700 space-y-4'>
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
								<p>Nuestro horario de atención es de lunes a viernes de 8:30 a.m. a 6:00 p.m., y sábados de 9:00 a.m. a 1:00 p.m.</p>
								<p className='mt-2'>
									Las operaciones deberán ser gestionadas dentro del horario indicado. En caso de que el USUARIO ejecute una transferencia fuera del horario de atención,
									la operación podrá ser procesada el siguiente día hábil o anulada, conforme a la evaluación efectuada por M&M DIVISAS SRL.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>9. Limitaciones de Responsabilidad</h3>
								<p>
									No nos hacemos responsables por retrasos o imposibilidades de ejecución derivados de fallas en sistemas externos, entidades bancarias, causas técnicas
									o eventos fuera de nuestro control.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>10. Responsabilidad del Usuario</h3>
								<p>
									EL USUARIO debe asegurarse de ingresar correctamente los datos bancarios, ya que M&M DIVISAS SRL no se responsabiliza por errores en números de cuenta,
									montos o beneficiarios enviados por el cliente.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>11. Protección de Datos, Seguridad y Privacidad</h3>
								<p>
									El tratamiento de los datos proporcionados por EL USUARIO se realiza bajo estricta confidencialidad y en cumplimiento de la Ley N.º 29733, siendo
									utilizados únicamente para fines vinculados a la prestación del servicio y al cumplimiento de obligaciones regulatorias.
								</p>
								<p className='mt-2'>
									EL USUARIO accede a los servicios de M&M DIVISAS SRL mediante la contraseña creada al momento del registro, siendo exclusivamente responsable de su
									uso, custodia y confidencialidad.
								</p>
								<p className='mt-2'>
									M&M DIVISAS SRL no comparte información personal, cuentas u operaciones con terceros, salvo requerimiento de autoridad competente. Asimismo, todos los
									procesos internos cumplen con las normas vigentes de la Superintendencia de Banca, Seguros y AFP (SBS), garantizando la seguridad, protección y
									privacidad de los datos y operaciones de EL USUARIO.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>12. Disponibilidad del Servicio</h3>
								<p>
									M&M DIVISAS SRL podrá suspender temporalmente los servicios por mantenimiento, fallas de comunicación bancaria o causas externas. Si esto ocurre, se
									informará al USUARIO por los canales disponibles.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>13. Modificaciones</h3>
								<p>
									M&M DIVISAS SRL podrá actualizar estos Términos y Condiciones cuando lo considere necesario. Las modificaciones serán efectivas desde su publicación o
									comunicación al cliente.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>14. Libro de Reclamaciones</h3>
								<p>
									En cumplimiento de lo establecido en el Código de Protección y Defensa del Consumidor, Ley N.° 29571, M&M DIVISAS SRL pone a disposición de EL USUARIO
									un Libro de Reclamaciones virtual, a través del cual podrá registrar sus quejas o reclamos formales relacionados con los servicios brindados por la
									Plataforma.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>15. Atención al Cliente o Reclamos</h3>
								<p>
									Para consultas, solicitudes o reclamos, EL USUARIO podrá comunicarse con M&M DIVISAS SRL a través de nuestra central de atención, vía telefónica, por
									WhatsApp o mediante el Libro de Reclamaciones, según corresponda.
								</p>
								<p className='mt-2'>
									<strong>Correo:</strong> info.dollariza@gmail.com
									<br />
									<strong>Teléfono / WhatsApp:</strong> 956757180
								</p>
							</section>
						</div>
					</div>
				</div>
			)}

			{/* MODAL POLÍTICA DE PRIVACIDAD */}
			{showPrivacyModal && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
					<div className='w-[90%] max-w-2xl max-h-[80vh] overflow-auto bg-white rounded-2xl shadow-2xl'>
						{/* HEADER */}
						<div className='sticky top-0 flex items-center justify-between bg-[#02254A] px-6 py-4 rounded-t-2xl'>
							<h2 className='text-xl sm:text-2xl font-bold text-white'>Política de Privacidad</h2>
							<button onClick={() => setShowPrivacyModal(false)} className='text-white hover:bg-white/20 p-1 rounded transition'>
								<XMarkIcon className='w-6 h-6' />
							</button>
						</div>

						{/* CONTENIDO */}
						<div className='px-4 sm:px-6 py-6 text-sm text-slate-700 space-y-4'>
							<p className='text-xs text-slate-500 italic'>M&M DIVISAS SRL - RUC 20614994364 - Dollariza</p>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>1. Responsable del Tratamiento</h3>
								<p>
									M&M DIVISAS SRL, con RUC 20614994364 y domicilio en Av. Producción Nacional N°185, Urb. La Villa – Chorrillos, Lima, Perú, es responsable del
									tratamiento de los datos personales recopilados a través de la plataforma Dollariza.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>2. Datos que Recopilamos</h3>
								<p>Para la prestación de nuestros servicios, recopilamos:</p>
								<ul className='list-disc list-inside mt-2 space-y-1'>
									<li>Datos de identificación: nombre completo, DNI/CE, fecha de nacimiento.</li>
									<li>Datos de contacto: correo electrónico, teléfono, dirección.</li>
									<li>Datos bancarios: números de cuenta, entidades financieras.</li>
									<li>Datos de transacciones: historial de operaciones de cambio.</li>
									<li>Datos de acceso: credenciales de usuario (contraseña cifrada).</li>
								</ul>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>3. Finalidad del Tratamiento</h3>
								<p>Utilizamos tus datos personales para:</p>
								<ul className='list-disc list-inside mt-2 space-y-1'>
									<li>Procesar operaciones de compra y venta de moneda extranjera.</li>
									<li>Verificar tu identidad conforme a las regulaciones de la SBS.</li>
									<li>Cumplir con la Ley de Prevención de Lavado de Activos (PLAFT).</li>
									<li>Enviar confirmaciones de transacciones por correo electrónico.</li>
									<li>Atender consultas, quejas y reclamos.</li>
									<li>Mejorar la calidad de nuestros servicios.</li>
								</ul>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>4. Base Legal</h3>
								<p>
									El tratamiento de tus datos se realiza en cumplimiento de la Ley N.° 29733, Ley de Protección de Datos Personales, y su Reglamento aprobado por Decreto
									Supremo N.° 003-2013-JUS. Asimismo, cumplimos con las disposiciones de la SBS para empresas de servicios de cambio de moneda.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>5. Seguridad de la Información</h3>
								<p>
									M&M DIVISAS SRL implementa medidas técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, pérdida, alteración o
									divulgación. Utilizamos protocolos de cifrado SSL/TLS y almacenamiento seguro conforme a los estándares del sector financiero.
								</p>
								<p className='mt-2'>EL USUARIO es responsable de mantener la confidencialidad de su contraseña y credenciales de acceso.</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>6. Compartición de Datos</h3>
								<p>M&M DIVISAS SRL no vende, alquila ni comparte tu información personal con terceros, salvo en los siguientes casos:</p>
								<ul className='list-disc list-inside mt-2 space-y-1'>
									<li>Cuando sea requerido por autoridad competente (SBS, SUNAT, Poder Judicial).</li>
									<li>Para cumplir con obligaciones legales y regulatorias.</li>
									<li>Con instituciones financieras necesarias para completar las transacciones.</li>
								</ul>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>7. Conservación de Datos</h3>
								<p>
									Los datos personales y registros de transacciones se conservan por un mínimo de 10 años, conforme a las obligaciones establecidas por la normativa de
									la SBS para la prevención de lavado de activos. Transcurrido este plazo, los datos serán eliminados de forma segura.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>8. Derechos del Usuario (ARCO)</h3>
								<p>Conforme a la Ley N.° 29733, tienes derecho a:</p>
								<ul className='list-disc list-inside mt-2 space-y-1'>
									<li>
										<strong>Acceso:</strong> Conocer qué datos tenemos sobre ti.
									</li>
									<li>
										<strong>Rectificación:</strong> Corregir datos inexactos o incompletos.
									</li>
									<li>
										<strong>Cancelación:</strong> Solicitar la eliminación de tus datos.
									</li>
									<li>
										<strong>Oposición:</strong> Oponerte al tratamiento de tus datos.
									</li>
								</ul>
								<p className='mt-2'>
									Para ejercer estos derechos, comunícate con nosotros a través de los canales indicados. Atenderemos tu solicitud en un plazo máximo de 10 días hábiles.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>9. Uso de Cookies</h3>
								<p>
									Nuestra plataforma utiliza cookies técnicas y de sesión para garantizar el correcto funcionamiento del servicio. No utilizamos cookies con fines
									publicitarios ni de seguimiento de terceros.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>10. Modificaciones a la Política</h3>
								<p>
									M&M DIVISAS SRL podrá actualizar esta Política de Privacidad cuando lo considere necesario. Las modificaciones serán publicadas en la plataforma y, de
									ser significativas, se notificarán por correo electrónico.
								</p>
							</section>

							<section>
								<h3 className='text-lg font-bold text-[#02254A] mb-2'>11. Contacto</h3>
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
					</div>
				</div>
			)}
		</>
	);
}
