const Patient = require('../../database/models/patient.js')
const TestRequest = require('../../database/models/testRequest.js')
const MfpPoTestRequests = require('../../database/models/mfpPoTestRequests.js')
const MfpPoLocations = require('../../database/models/mfpPoLocations.js')
const MfpPoPrescribers = require('../../database/models/mfpPoPrescribers.js')
const MfpPoPatients = require('../../database/models/mfpPoPatients.js')
const ScanService = require('../../database/models/scanService.js')
const MfpPoPatientsInfo = require('../../database/models/mfpPoPatientsInfo.js')
const MfpPhysicianOrganizations = require('../../database/models/mfpPhysicianOrganizations.js')

const getPrescriptionAllDataByUserIdInSessions = async (req, res, next) => {
  const userID = req.session.userId

  if (!userID) {
    throw new Error(`userID is not provided`)
  }

  const [patient] = await Patient.query()
      .withGraphFetched(Patient.userRelation)
      .where(`${Patient.tableName}.${Patient.UserIDColumn}`, '=', `${userID}`)

  if (!patient) {
    throw new Error(`No such patient with Patient.UserIDColumn equals: ${userID}`)
  }

  const [testRequest] = await TestRequest.query()
      .withGraphFetched(TestRequest.patientRelation)
      .where(`${TestRequest.tableName}.${TestRequest.PatientIDColumn}`, '=', `${patient.UserID}`)

  if (!testRequest) {
    throw new Error(`No such testRequest with TestRequest.PatientIDColumn equals: ${patient.UserID}`)
  }

  const knex = MfpPoTestRequests.knex();

  const [mfpTestRequest] = await knex.from(MfpPoTestRequests.tableName)
      .innerJoin(TestRequest.tableName, `${MfpPoTestRequests.tableName}.${MfpPoTestRequests.TestRequestIDColumn}`, `${TestRequest.tableName}.${TestRequest.IDColumn}`)
      .where(`${MfpPoTestRequests.tableName}.${MfpPoTestRequests.TestRequestIDColumn}`, '=', `${testRequest.ID}`)

  if (!mfpTestRequest) {
    throw new Error(`No such mfpTestRequest with MfpPoTestRequests.TestRequestIDColumn equals: ${testRequest.ID}`)
  }

  const scanService = await ScanService.query().findById(mfpTestRequest.ScanServiceID);
  const prescriber = await MfpPoPrescribers.query().findById(mfpTestRequest.PerscriberID);
  const location = await MfpPoLocations.query().findById(mfpTestRequest.LocationID);

  if (!scanService) {
    throw new Error(`No such scanService with ID equals: ${mfpTestRequest.ScanServiceID}`)
  }

  if (!prescriber) {
    throw new Error(`No such prescriber with ID equals: ${mfpTestRequest.PerscriberID}`)
  }

  if (!location) {
    throw new Error(`No such location with ID equals: ${mfpTestRequest.LocationID}`)
  }

  const knexMfpPoPatients = MfpPoPatients.knex();

  const [mfpPoPatientInfo] = await knex.from(`${MfpPoPatients.tableName}`)
      .innerJoin(`${MfpPhysicianOrganizations.tableName}`, `${MfpPhysicianOrganizations.tableName}.${MfpPhysicianOrganizations.IDColumn}`, `${MfpPoPatients.tableName}.${MfpPoPatients.POIDColumn}`)
      .innerJoin(`${MfpPoPatientsInfo.tableName}`, `${MfpPoPatientsInfo.tableName}.${MfpPoPatientsInfo.POUserIDColumn}`, `${MfpPoPatients.tableName}.${MfpPoPatients.IDColumn}`)
      .where(`${MfpPoPatientsInfo.tableName}.${MfpPoPatientsInfo.POUserIDColumn}`, '=', `${prescriber.POID}`)

  if (!mfpPoPatientInfo) {
    throw new Error(`No such mfpPoPatientInfo with MfpPoPatientsInfo.POUserIDColumn equals: ${prescriber.POID}`)
  }

  const prescription = {
      patientSection: {
        first: mfpPoPatientInfo.FirstName,
        last: mfpPoPatientInfo.LastName,
        dateOfBirth: mfpPoPatientInfo.DOB,
        phoneNumber: mfpPoPatientInfo.Phone,
        email: mfpPoPatientInfo.Email,
      },

      prescriptionSection: {
        scanOrdered: scanService.ScanServiceName,
        CPTcode: scanService.CPTCode,
        reasonForScan: mfpTestRequest.Reason,
        diagnosisCode: mfpTestRequest.ICD,
        comments: mfpTestRequest.OtherNotes
      },

      orderingProvider: {
        orderDate: mfpTestRequest.Reason,
        practiceName: mfpPoPatientInfo.Name,
        location: {
          address1: location.Address1,
          address2: location.Address2,
          city: location.City,
          state: location.State,
          zip: location.ZipCode
        },
        phone: location.Phone,
        Fax: mfpTestRequest.Fax,
        first: prescriber.FirstName,
        last: prescriber.LastName,
        NPI: prescriber.NPI,
        electronicSignature: `${prescriber.FirstName} ${prescriber.LastName}`
      },
  }

  res.send(prescription)
};

module.exports = getPrescriptionAllDataByUserIdInSessions;
