import React from 'react';
import { Button } from 'primereact/button';
import jsPDF from 'jspdf';
import type { BankAccountModel } from '../data/bank-account.model';
import { RAZON_SOCIAL, RUC } from '@/lib/utils/constants';

interface ConstanciaPDFProps {
	userName: string;
	emissionDate: string;
	operationCode: string;
	selectedCuentaOrigen: BankAccountModel | null;
	selectedCuentaDestino: BankAccountModel | null;
	sentCurrency: string;
	transferAmount: number;
	receivedCurrency: string;
	receivedAmount: number;
	showLabel?: boolean;
}

const ConstanciaPDF: React.FC<ConstanciaPDFProps> = ({
	userName,
	emissionDate,
	operationCode,
	selectedCuentaOrigen,
	selectedCuentaDestino,
	sentCurrency,
	transferAmount,
	receivedCurrency,
	receivedAmount,
	showLabel = true,
}) => {
	const maskAccountNumber = (accountNumber: string): string => {
		if (!accountNumber || accountNumber.length <= 4) return accountNumber;
		const lastFour = accountNumber.slice(-4);
		const masked = 'x'.repeat(accountNumber.length - 4) + lastFour;
		return masked;
	};

	const generatePDF = async () => {
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.getWidth();
		let yPosition = 8;

		// Márgenes para contenido más compacto
		const marginLeft = 30;
		const marginRight = 30;
		const contentWidth = pageWidth - marginLeft - marginRight;

		// Valores seguros
		const safeUserName = userName || 'Cliente';
		const safeEmissionDate = emissionDate ? new Intl.DateTimeFormat('es-PE', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(new Date(emissionDate)) : new Date().toLocaleDateString('es-PE');
		const safeOperationCode = operationCode || 'N/A';

		// Logo PNG - Esperar a que cargue
		try {
			const response = await fetch('/icons/logo-opt.jpg');
			const blob = await response.blob();
			const dataUrl = await new Promise<string>((resolve) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result as string);
				reader.readAsDataURL(blob);
			});

			const imgHeight = 50;
			const imgWidth = 50;
			const xPos = (pageWidth - imgWidth) / 2;
			doc.addImage(dataUrl, 'PNG', xPos, yPosition, imgWidth, imgHeight);
			// Aumentar espacio debajo del logo para evitar solapamientos
			yPosition += 50;
		} catch (error) {
			console.log('Logo no disponible');
			// Si no hay logo, aún dejar un poco más de espacio
			yPosition += 12;
		}

		// PRIMERA SECCIÓN: 2 Columnas
		const colWidth = (contentWidth - 10) / 2;
		const leftX = marginLeft;
		const rightX = marginLeft + colWidth + 10;

		// Título
		doc.setFontSize(12);
		doc.setFont('Helvetica', 'bold');
		doc.setTextColor(40, 40, 40);
		doc.text('CONSTANCIA DE PAGO', leftX, yPosition);
		yPosition += 8;

		// Columna Izquierda - DOLLAR HOUSE
		doc.setFontSize(10);
		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(100, 100, 100);
		doc.text(RAZON_SOCIAL, leftX, yPosition);

		// Columna Derecha - Fecha de emisión (alineada con DOLLAR HOUSE)
		doc.setFontSize(9);
		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(100, 100, 100);
		const dateWidth = doc.getTextWidth(safeEmissionDate);
		doc.text(safeEmissionDate, rightX + colWidth - 5 - dateWidth, yPosition);
		yPosition += 5;

		// Columna Izquierda - RUC
		doc.setFontSize(9);
		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(100, 100, 100);
		doc.text(`RUC: ${RUC}`, leftX, yPosition);

		// Columna Derecha - Código (alineado con RUC)
		doc.setFontSize(9);
		doc.setFont('Helvetica', 'bold');
		doc.setTextColor(40, 40, 40);
		const codeText = `Código: ${safeOperationCode}`;
		const codeWidth = doc.getTextWidth(codeText);
		doc.text(codeText, rightX + colWidth - 5 - codeWidth, yPosition);

		yPosition += 10;

		// Línea divisora
		doc.setDrawColor(200, 200, 200);
		doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
		yPosition += 10;

		// Información del cliente (2 saltos de línea = 10 adicionales)
		doc.setFontSize(9);
		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(60, 60, 60);
		doc.text(`Cliente: ${safeUserName}`, marginLeft, yPosition);
		yPosition += 10;

		// Contenido principal (1 salto de línea = 5 adicionales)
		doc.setFontSize(9);
		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(50, 50, 50);

		const mainText = `Se genera esta constancia con código ${safeOperationCode} que valida siempre y cuando haga el envío correspondiente de su pago al correo info.dollariza@gmail.com.`;
		const mainLines = doc.splitTextToSize(mainText, contentWidth);
		doc.text(mainLines, marginLeft, yPosition);
		yPosition += mainLines.length * 4 + 10;

		// Párrafo de la operación (2 saltos de línea)
		if (selectedCuentaOrigen && selectedCuentaDestino) {
			const operationParagraph = `La operación tiene como resultado el envío de ${sentCurrency} ${Number(transferAmount).toFixed(2)} desde su cuenta registrada en ${selectedCuentaOrigen.banco} (${maskAccountNumber(selectedCuentaOrigen.numeroCuenta)}) en moneda ${selectedCuentaOrigen.moneda}, hacia su cuenta receptora en ${selectedCuentaDestino.banco} (${maskAccountNumber(selectedCuentaDestino.numeroCuenta)}) en moneda ${selectedCuentaDestino.moneda}, por un monto equivalente de ${receivedCurrency} ${Number(receivedAmount).toFixed(2)}.`;
			const operationLines = doc.splitTextToSize(operationParagraph, contentWidth);
			doc.text(operationLines, marginLeft, yPosition);
			yPosition += operationLines.length * 4 + 10;
		}

		// Línea divisora antes de instrucciones
		doc.setDrawColor(200, 200, 200);
		doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
		yPosition += 10;

		// Instrucciones
		doc.setFont('Helvetica', 'bold');
		doc.setTextColor(40, 40, 40);
		doc.setFontSize(9);
		doc.text('Instrucciones de envío:', marginLeft, yPosition);
		yPosition += 6;

		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(50, 50, 50);
		doc.setFontSize(9);
		const instructions = `Envíe esta constancia al correo info.dollariza@gmail.com dentro de los próximos 20 minutos junto con el comprobante de su transferencia. Incluya todos los detalles de la operación para una verificación rápida y eficiente.`;
		const instructionLines = doc.splitTextToSize(instructions, contentWidth);
		doc.text(instructionLines, marginLeft, yPosition);
		yPosition += instructionLines.length * 4 + 10;

		// Línea divisora final
		doc.setDrawColor(220, 220, 220);
		doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
		yPosition += 5;

		// Pie de página
		doc.setFontSize(7);
		doc.setFont('Helvetica', 'normal');
		doc.setTextColor(130, 130, 130);
		const footerText = `Esta constancia es válida únicamente si se valida de manera correcta el comprobante enviado por correo electrónico. De lo contrario, quedará anulada y no procederá la transacción.`;
		const footerLines = doc.splitTextToSize(footerText, contentWidth);
		doc.text(footerLines, marginLeft, yPosition);

		const d = new Date(emissionDate || new Date());
		const pad = (n: number) => n.toString().padStart(2, '0');
		const fileDate = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
		const filename = `CONSTANCIA-${safeOperationCode}-${fileDate}.pdf`;
		doc.save(filename);
	};

	return (
		<Button
			label={showLabel ? 'Descargar Constancia (PDF)' : undefined}
			icon='pi pi-download'
			onClick={generatePDF}
			className={showLabel ? 'px-6 py-3' : 'p-1'}
			rounded={!showLabel}
		/>
	);
};

export default ConstanciaPDF;