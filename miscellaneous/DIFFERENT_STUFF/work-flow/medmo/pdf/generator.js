const PDFGenerator = require('pdfkit');
const fs = require('fs');
const crypto = require('crypto');

const { fileDestination } = require('../../config/cfg');

class DocumentGenerator {
  constructor(document) {
    this.document = document;
  }

  generateHeaders(doc) {
    const patientSection = this.document.patientSection;
    const prescriptionSection = this.document.prescriptionSection;
    const orderingProvider = this.document.orderingProvider;
    const organizationSection = this.document.organizationSection;

    const LIGHT_BLUE_IN_HEX = '#e5f4ff';
    const BLACK_IN_HEX = '#000000';
    const MEDMO_FAX_NUMBER = '(833) 383-3276';
    const REPORT_INSTRUCRIONS = 'Please send report to both of the above fax numbers.'

    doc.fontSize(12).text(`${organizationSection.name}`, { align: 'center' }).moveDown();
    doc.text(`Medmo generated E-prescription`, { align: 'center' }).moveDown();

    doc.rect(45, 120, doc.page.width - 85, 22).fillAndStroke(LIGHT_BLUE_IN_HEX, LIGHT_BLUE_IN_HEX);
    doc.fill(BLACK_IN_HEX).stroke();
    doc.text(`Patient Information`, 50, 125, { lineBreak: false, bold: true }).moveDown();

    doc.text(`
      Name: ${patientSection.first} ${patientSection.last}
      Phone Number: ${patientSection.phoneNumber}`,
      30, 150, { align: 'left'}
    );

    doc.text(`
      Date Of Birth: ${patientSection.dateOfBirth}
      Email: ${patientSection.email}`,
      300, 150, { align: 'left' }
    );

    doc.rect(45, 210, doc.page.width - 85, 22).fillAndStroke(LIGHT_BLUE_IN_HEX, LIGHT_BLUE_IN_HEX);
    doc.fill(BLACK_IN_HEX).stroke();
    doc.text(`Prescription`, 50, 215, { bold: true, lineBreak: false }).moveDown();

    doc.text(`Scan Ordered: ${prescriptionSection.scanOrdered}`, 50, 250, { align: 'left' });
    doc.text(`CPT Code: ${prescriptionSection.CPTcode}`, 50, 265, { align: 'left' });
    doc.text(`Diagnosis Code: ${prescriptionSection.diagnosisCode}`, 300, 265, { align: 'left' });
    doc.text(`Reason for scan: ${prescriptionSection.reasonForScan}`, 50, 280, { align: 'left' });
    doc.text(`Logistics Notes: ${prescriptionSection.comments}`, 50, 295, { align: 'left' });

    doc.rect(45, 325, doc.page.width - 85, 22).fillAndStroke(LIGHT_BLUE_IN_HEX, LIGHT_BLUE_IN_HEX);
    doc.fill(BLACK_IN_HEX).stroke();
    doc.text(`Ordering Physician Details`, 50, 330, { bold: true, lineBreak: false }).moveDown();

    doc.text(`
      Order Date: ${organizationSection.created}
      Location: ${orderingProvider.location.address1} ${orderingProvider.location.address2 || ''} ${orderingProvider.location.city} ${orderingProvider.location.state} ${orderingProvider.location.zip}
      Physician Name: ${orderingProvider.electronicSignature}`,
      30, 350, { align: 'left'}
    );

    doc.text(`
      Practice name: ${organizationSection.internalName}
      Phone Number: ${orderingProvider.phone}
      NPI: ${orderingProvider.NPI}`,
      330, 350, { align: 'left'}
    );

    doc.text(`Electronic Signature:`, 50, 410, { align: 'left' });
    doc.image(prescriptionSection.signature, 50, 415)

    doc.rect(45, 490, doc.page.width - 85, 22).fillAndStroke(LIGHT_BLUE_IN_HEX, LIGHT_BLUE_IN_HEX);
    doc.fill(BLACK_IN_HEX).stroke();
    doc.text(`Report Instructions`, 50, 495, { bold: true, lineBreak: false }).moveDown();

    doc.text(REPORT_INSTRUCRIONS, 50, 530, { align: 'left' });
    doc.text(`Location Fax Number: ${orderingProvider.Fax}`, 50, 545, { align: 'left' });
    doc.text(`Medmo Fax Number: ${MEDMO_FAX_NUMBER}`, 350, 545, { align: 'left' });
  }

  generate() {
    const theOutput = new PDFGenerator;
    const folderName = fileDestination;
    const fileName = `Prescription-${crypto.randomBytes(16).toString('hex')}.pdf`;

    theOutput.pipe(fs.createWriteStream(`${folderName}/${fileName}`));
    this.generateHeaders(theOutput);
    theOutput.moveDown();
    theOutput.end();

    return { fileName, folderName, theOutput };
  }
}

module.exports = DocumentGenerator;
