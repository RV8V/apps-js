'use strict'

const DocumentGenerator = require('./DocumentGenerator.js')

const patientData = {
    patientSection: {
      first: 'Jake',
      last: 'Brown',
      dateOfBirth: '13.03.2000',
      phoneNumber: '+38099556789',
      email: 'jake@gmail.com',
    },

    prescriptionSection: {
      scanOrdered: 'scan',
      CPTcode: 'code',
      reasonForScan: 'reason',
      diagnosisCode: '',
      comments: ''
    },

    orderingProvider: {},
}

const ig = new DocumentGenerator(patientData)
ig.generate()
