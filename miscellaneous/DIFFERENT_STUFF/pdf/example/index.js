const PDFGenerator = require('pdfkit')
const fs = require('fs')

let theOutput = new PDFGenerator

theOutput.pipe(fs.createWriteStream('out/TestDocumentWithText.pdf'))

theOutput.text('Some awesome example text')

theOutput.end()
