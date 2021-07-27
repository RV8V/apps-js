const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile.js')()[environment]
const { Model } = require('objection')
const knex = require('knex')

const MfpPoUsers = require('./models/mfpPoUsers.js')
const ApiUser = require('./models/apiUser.js')
const MfpPhysicianOrganizations = require('./models/mfpPhysicianOrganizations.js')
const MfpUserStatuses = require('./models/mfpUserStatuses.js')
const MfpUserTypes = require('./models/mfpUserTypes.js')

const ScanType = require('./models/scanType.js')
const MfpPoPatients = require('./models/mfpPoPatients.js')
const ScanService = require('./models/scanService.js')
const MfpPoPatientsInfo = require('./models/mfpPoPatientsInfo.js')

const MfpPoTestRequests = require('./models/mfpPoTestRequests.js')
const MfpPoLocations = require('./models/mfpPoLocations.js')

const MfpPoPrescribers = require('./models/mfpPoPrescribers.js')
const MfpPoPatientsInsurances = require('./models/mfpPoPatientsInsurances')

const User = require('./models/user.js')
const Patient = require('./models/patient.js')
const TestRequest = require('./models/testRequest.js')

async function setup() {
  const db = knex(config)
  Model.knex(db)
}

async function run() {
  await setup()

  // console.log('enter')
  // console.log({ MfpPhysicianOrganizations })
  //
  // const mfpUsers = await MfpPoUsers.query()//.withGraphFetched('mfpPhysicianOrganizations')
  // const apiUsers = await ApiUser.query().withGraphFetched('userGroups')
  //
  // console.log({ mfpUsers, apiUsers })
  //
  // const types = await MfpUserTypes.query().withGraphFetched('mfpPoUsers')
  // const statuses = await MfpUserStatuses.query().withGraphFetched('mfpPoUsers')
  //
  // console.log({ types, statuses })

  /******************************************/

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPhysicianOrganizations.query().insert({
  //     ID: i,
  //     Name: `Name ${i}`,
  //     Description: `Description ${i}`,
  //     InternalName: `InternalName ${i}`,
  //     Logo: `Logo ${i}`,
  //     IsActive: '1',
  //     CreatedBy: i,
  //     UpdatedBy: i
  //   })
  // }

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPoUsers.query().insert({
  //     ID: i,
  //     UserID: i,
  //     POID: i,
  //     FirstName: 'FirstName ' + i,
  //     LastName: 'LastName ' + i,
  //     Email: 'Email ' + i,
  //     UserTypeID: 1,
  //     UserStatusID: 1,
  //     sendCancelEmails: '1',
  //     sendNewNotesEmail: '1',
  //     sendReportUploadedEmail: '1',
  //     IsActive: '1',
  //     CreatedBy: i,
  //     UpdatedBy: i
  //   })
  // }

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPoPatients.query().insert({
  //       ID: i,
  //       POID: i,
  //       MRN: 'MRN ' + i,
  //       ZipCode: 'ZipCode ' + i,
  //       IsActive: '1',
  //       CreatedBy: i,
  //       UpdatedBy: i
  //   })
  // }

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPoLocations.query().insert({
  //       ID: i,
  //       POID: i,
  //       Name: 'Location Name ' + i,
  //       Address1: 'Address1 ' + i,
  //       Address2: 'Address2 ' + i,
  //       City: 'City ' + i,
  //       State: 'S' + i,
  //       ZipCode: 'fsk' + i,
  //       Longitude: 12.1 + i,
  //       Latitude: 13.3 + i,
  //       Phone: '133' + i,
  //       DefaultFax: '23' + i,
  //       IsActive: '1',
  //       CreatedBy: i,
  //       UpdatedBy: i
  //   })
  // }

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPoPrescribers.query().insert({
  //       ID: i,
  //       POID: i,
  //       FirstName: 'FirstName ' + i,
  //       LastName: 'LastName ' + i,
  //       NPI: '121' + i,
  //       Signature: 'S1' + i,
  //       PhysicianTypeID: 1,
  //       IsActive: '1',
  //       CreatedBy: i,
  //       UpdatedBy: i
  //   })
  // }

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPoPatientsInfo.query().insert({
  //       ID: i,
  //       POUserID: i,
  //       FirstName: 'FirstName ' + i,
  //       LastName: 'LastName ' + i,
  //       Email: 'Email ' + i,
  //       Phone: 'fsk' + i,
  //       IsActive: '1',
  //       CreatedBy: i,
  //       UpdatedBy: i
  //   })
  // }

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPoPatientsInsurances.query().insert({
  //       ID: i,
  //       POUserID: i,
  //       InsurancePlanID: 1,
  //       PolicyNumber: 'PolicyNumber ' + i,
  //       IsActive: '1',
  //       CreatedBy: i,
  //       UpdatedBy: i
  //   })
  // }

  // for (let i = 1; i < 10; ++i) {
  //   await MfpPoTestRequests.query().insert({
  //       ID: i,
  //       POID: i,
  //       POUserID: i,
  //       ScanServiceID: 130,
  //       ICD: 'ICD 1',
  //       PerscriberID: i,
  //       LocationID: i,
  //       Fax: '12' + i,
  //       Reason: 'Reason',
  //       ClinicalNotes: 'ClinicalNotes',
  //       ClinicalNotesFile: 'ClinicalNotesFile',
  //       OtherNotes: 'OtherNotes',
  //       ZipCode: 'wee',
  //       SelfPay: '1' + i,
  //       PatientInsuranceID: 1,
  //       PaymentID: '12',
  //       PaymentSecret: 'secret',
  //       CardType: 'CardType',
  //       CardLast4: i,
  //       StatusID: 2,
  //       TestRequestID: i + 1,
  //       IsActive: '1',
  //       CreatedBy: i,
  //       UpdatedBy: i
  //   })
  // }

  /******************************************/



  // const knex = MfpUserTypes.knex();
  //
  // await knex.raw(`
  //   INSERT INTO mfp_user_types(ID,UserType,IsActive) VALUES
  //       (1,'PO Administrator',1),
  //       (2,'Administrator',1),
  //       (3,'Standard',1);
  // `);


  // const knex = MfpUserStatuses.knex();
  //
  // await knex.raw(`
  //   INSERT INTO mfp_user_statuses(ID,UserStatus,IsActive) VALUES
  //       (1,'Invited',1),
  //       (2,'Accepted',1);
  // `);



  // const knex = MfpPhysicianOrganizations.knex();

  // await knex.raw(`
  //   INSERT INTO mfp_physician_organizations(ID,Name,Description,InternalName,Logo,IsActive,CreatedBy,UpdatedBy) VALUES
  //       (2,'Name 2','Description 2','InternalName 2','Logo 2','2',2,2);
  // `);

  // const jennifer = await MfpPoUsers.query().insert({
  //   ID: 4,
  //   UserID: 1,
  //   POID: 2,
  //   FirstName: 'FirstName 2',
  //   LastName: 'LastName 2',
  //   Email: 'Email 2',
  //   UserTypeID: 1,
  //   UserStatusID: 1,
  //   sendCancelEmails: '1',
  //   sendNewNotesEmail: '1',
  //   sendReportUploadedEmail: '1',
  //   IsActive: '1',
  //   CreatedBy: 1,
  //   UpdatedBy: 1
  // })
  //
  // console.log({ jennifer })

  // const types = await MfpUserTypes.query().withGraphFetched('mfpPoUsers')
  // const statuses = await MfpUserStatuses.query().withGraphFetched('mfpPoUsers')
  //
  // console.log({ types, statuses })
  //
  // const mfp = await MfpPoUsers.query().withGraphFetched('[mfpPhysicianOrganizations, mfpUserStatuses, mfpUserTypes, createdBy, updatedBy]')

  // const orgs = await MfpPhysicianOrganizations.query()
  //   .withGraphFetched('mfpPoLocations')
  //   .where('mfp_physician_organizations.ID', '=', 2)
  //
  // console.dir({ orgs }, { depth: 4 })

  // const patient = await MfpPoPatients.query().insert({
  //     ID: 1,
  //     POID: 1,
  //     MRN: 'MRN 1',
  //     ZipCode: 'ZipCode 1',
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })
  //
  // console.log({ patient })

  // const u = await MfpPoPatients.query().withGraphFetched('[mfpPhysicianOrganizations, createdBy, updatedBy]')
  //
  // console.dir({ u }, { depth: 4 })

  // const patient = await MfpPoPatientsInfo.query().insert({
  //     ID: 1,
  //     POUserID: 1,
  //     FirstName: 'FirstName 1',
  //     LastName: 'LastName 1',
  //     Email: 'Email 1',
  //     Phone: 'fsk',
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })
  //
  // console.log({ patient })

  // const t = await MfpPoPatientsInfo.query().withGraphFetched('[mfpPoPatients, createdBy, updatedBy]')
  // console.log({ t })

  // const s = await ScanType.query().withGraphFetched('scanServices')
  // console.log({ s })

  // const s = await ScanService.query().withGraphFetched('scanType')
  // console.log({ s })

  // const location = await MfpPoLocations.query().insert({
  //     ID: 3,
  //     POID: 2,
  //     Name: 'Location Name 2',
  //     Address1: 'Address1 2',
  //     Address2: 'Address2 2',
  //     City: 'City 2',
  //     State: 'S1',
  //     ZipCode: 'fsk',
  //     Longitude: 12.1,
  //     Latitude: 13.3,
  //     Phone: '133',
  //     DefaultFax: '23',
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })
  //
  // console.log({
  //   res: await MfpPoLocations.query()
  //     // .withGraphFetched('mfpPhysicianOrganizations')
  //     .where('mfp_po_locations.POID', '=', 1)
  //     .patchAndFetchById(2, {
  //       City: 'c'
  //     })
  // })

  console.log({
    res: await MfpPoLocations.query()
      .withGraphFetched('mfpPhysicianOrganizations')
      .where('mfp_po_locations.POID', '=', 1)
  })

  // const prescriber = await MfpPoPrescribers.query().insert({
  //     ID: 1,
  //     POID: 1,
  //     FirstName: 'FirstName 1',
  //     LastName: 'LastName 2',
  //     NPI: '121',
  //     Signature: 'S1',
  //     PhysicianTypeID: 1,
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })

  // const knex = MfpPoPrescribers.knex();
  //
  // await knex.raw(`
  //   INSERT INTO mfp_po_prescribers(ID,POID,FirstName,LastName,NPI,Signature,PhysicianTypeID,IsActive,CreatedBy,UpdatedBy) VALUES
  //       (1,1,'FirstName 1','LastName 1','121','11',1,'1',1,1);
  // `);


  // console.log({ res: await MfpPoPrescribers.query() })

  // const patient = await MfpPoPatientsInsurances.query().insert({
  //     ID: 1,
  //     POUserID: 1,
  //     InsurancePlanID: 1,
  //     PolicyNumber: 'PolicyNumber 1',
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })
  //
  // console.log({ patient })
  // console.log({ res: await MfpPoPatientsInsurances.query().withGraphFetched('insurancePlan') })

  // const patient = await MfpPoTestRequests.query().insert({
  //     ID: 2,
  //     POID: 2,
  //     POUserID: 2,
  //     ScanServiceID: 130,
  //     ICD: 'ICD 1',
  //     PerscriberID: 1,
  //     LocationID: 1,
  //     Fax: '12',
  //     Reason: 'Reason',
  //     ClinicalNotes: 'ClinicalNotes',
  //     ClinicalNotesFile: 'ClinicalNotesFile',
  //     OtherNotes: 'OtherNotes',
  //     ZipCode: 'wee',
  //     SelfPay: '1',
  //     PatientInsuranceID: 1,
  //     PaymentID: '12',
  //     PaymentSecret: 'secret',
  //     CardType: 'CardType',
  //     CardLast4: 1,
  //     StatusID: 1,
  //     TestRequestID: 6,
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })
  //
  // console.log({ patient })

  // const knex = MfpPoTestRequests.knex();
  //
  // await knex.raw(`
  //   INSERT INTO mfp_po_test_requests(ID,POID,POUserID,ScanServiceID,ICD,PerscriberID,LocationID,Fax,Reason,ClinicalNotes,ClinicalNotesFile,OtherNotes,ZipCode,SelfPay,PatientInsuranceID,PaymentID,PaymentSecret,CardType,CardLast4,StatusID,TestRequestID,IsActive,CreatedBy,UpdatedBy) VALUES
  //       (1,1,1,130,'ICD 1',1,1,'12','Reason','ClinicalNotes', 'ClinicalNotesFile', 'OtherNotes','12','1',1,'12','secret','CardType',1,1,6,'1',1,1);
  // `);

  // console.log({ res: await MfpPoTestRequests.query() })

  // console.log({ res: await MfpPoPrescribers.query() })

  // console.dir({ res: await User.query().withGraphFetched('patient') }, { depth: 4 })
  // console.dir({ res: await Patient.query().withGraphFetched('testRequest') }, { depth: 4 })
  // console.dir({ res: await TestRequest.query().withGraphFetched('mfpPoTestRequests') }, { depth: 4 })

  // const knex = MfpPhysicianOrganizations.knex();
  //
  // await knex.raw(`
  //   INSERT INTO mfp_physician_organizations(ID,Name,Description,InternalName,Logo,IsActive,CreatedBy,UpdatedBy) VALUES
  //       (1,'Name 1','Description 1','InternalName 1','Logo 1','1',1,1);
  // `);

  // const jennifer = await MfpPoUsers.query().insert({
  //   ID: 1,
  //   UserID: 1,
  //   POID: 1,
  //   FirstName: 'FirstName 1',
  //   LastName: 'LastName 1',
  //   Email: 'Email 1',
  //   UserTypeID: 1,
  //   UserStatusID: 1,
  //   sendCancelEmails: '1',
  //   sendNewNotesEmail: '1',
  //   sendReportUploadedEmail: '1',
  //   IsActive: '1',
  //   CreatedBy: 1,
  //   UpdatedBy: 1
  // })
  //
  // console.log({ jennifer })
  //
  // const patient = await MfpPoPatients.query().insert({
  //     ID: 1,
  //     POID: 1,
  //     MRN: 'MRN 1',
  //     ZipCode: 'ZipCode 1',
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })
  //
  // console.log({ patient })

  // const patient = await MfpPoPatientsInfo.query().insert({
  //     ID: 1,
  //     POUserID: 1,
  //     FirstName: 'FirstName 1',
  //     LastName: 'LastName 1',
  //     Email: 'Email 1',
  //     Phone: 'fsk',
  //     IsActive: '1',
  //     CreatedBy: 1,
  //     UpdatedBy: 1
  // })
  //
  // console.log({ patient })

  //console.dir({ here: await MfpPoPatients.query(), res: await MfpPoPatients.query().withGraphFetched('mfpPoPatientsInfo') }, { depth: 4 })

  // const result = await User.query().withGraphFetched('[patient.[testRequest.[mfpPoTestRequests]]]')
  // const filtered = result.filter(record => {
  //   // console.dir({ record }, { depth: 5 })
  //
  //   return record.patient != null
  // })
  //
  // const one = filtered.filter(record => {
  //   return record.patient.testRequest != null
  // })

  // const two = one.filter(record => {
  //   // console.log({ a: record.patient.testRequest.mfpPoTestRequests })
  //   return Object.keys(record.patient.testRequest.mfpPoTestRequests).length !== 0
  // })

  // console.log({ o: Object.keys([]).length })

  // console.dir({ two }, { depth: 5 })

  // console.log({
  //   res: await MfpPoTestRequests.query()
  //   .innerJoin('scanService')
  // })

  // User.query().withGraphFetched('projects').findById(userId)

  // const numDeleted = await MfpPoTestRequests.query().deleteById(15);

  // const res = await TestRequest.query()
  //     .withGraphFetched('mfpPoTestRequests')
  //     .where('test_requests.ID', '=', 6)
  //
  // console.dir({ res }, { depth: 5 })

  // const userID = 145

  // const people = await Person.query()
  //     .withGraphJoined('[pets, children.pets]')
  //     .where('pets.age', '>', 10)
  //     .where('children:pets.age', '>', 10);

  // const [patient] = await User.query()
  //     .withGraphFetched('patient')
  //     .where('users.ID', '=', `${userID}`)
  //
  // const [testRequest] = await Patient.query()
  //     .withGraphFetched('testRequest')
  //     .where('patients.UserID', '=', `${patient.patient.UserID}`)
  //
  // const [mfpPoTestRequest] = await TestRequest.query()
  //     .withGraphFetched('mfpPoTestRequests')
  //     .where('test_requests.ID', '=', 6)

  // const knex = MfpPoTestRequests.knex();
  //
  // const res1 = await knex.from('mfp_po_test_requests')
  //     .innerJoin('test_requests', 'mfp_po_test_requests.TestRequestID', 'test_requests.ID')
  //     .where('test_requests.ID', '=', 6)
  //
  // console.dir({ mfpPoTestRequest }, { depth: 5 })
  // console.log({ patient, testRequest, res1 })



  /********************************************************/
  //
  // |const userID = 145
  //
  // const [patient] = await Patient.query()
  //     .withGraphFetched(Patient.userRelation)
  //  |   .where(`${Patient.tableName}.${Patient.UserIDColumn}`, '=', `${userID}`) // undefined

  // const [patient] = await Patient.query()
  //     .withGraphFetched('user')
  //     .where('patients.UserID', '=', `${userID}`) // undefined

  // |const [testRequest] = await TestRequest.query()
  //     .withGraphFetched(TestRequest.patientRelation)
  //  |   .where(`${TestRequest.tableName}.${TestRequest.PatientIDColumn}`, '=', `${patient.ID}`) // undefined

  // const [testRequest] = await TestRequest.query()
  //     .withGraphFetched('patient')
  //     .where('test_requests.PatientID', '=', `${patient.ID}`) // undefined

  //| const knex = MfpPoTestRequests.knex();
  //
  // const [mfpTestRequest] = await knex.from(MfpPoTestRequests.tableName)
  //     .innerJoin(TestRequest.tableName, `${MfpPoTestRequests.tableName}.${MfpPoTestRequests.TestRequestIDColumn}`, `${TestRequest.tableName}.${TestRequest.IDColumn}`)
  //  |   .where(`${MfpPoTestRequests.tableName}.${MfpPoTestRequests.TestRequestIDColumn}`, '=', `${testRequest.ID}`) // undefined

  // const [mfpTestRequest] = await knex.from('mfp_po_test_requests')
  //     .innerJoin('test_requests', 'mfp_po_test_requests.TestRequestID', 'test_requests.ID')
  //     .where('mfp_po_test_requests.TestRequestID', '=', `${testRequest.ID}`) // undefined

  // |const scanService = await ScanService.query().findById(mfpTestRequest.ScanServiceID); // undefined
  // |const prescriber = await MfpPoPrescribers.query().findById(mfpTestRequest.PerscriberID);
  // |const location = await MfpPoLocations.query().findById(mfpTestRequest.LocationID);

  // const [mfpPoPatientInfo] = await MfpPoPatients.query() // undefined
  //     .withGraphFetched(`[${MfpPoPatients.mfpPhysicianOrganizationsRelation}, ${MfpPoPatients.mfpPoPatientsInfoRelation}]`)
  //     .where(`${MfpPoPatients.tableName}.${MfpPoPatients.POIDColumn}`, '=', `${prescriber.POID}`)

  // const [mfpPoPatientInfo] = await MfpPoPatients.query() // undefined
  //     .withGraphFetched('[mfpPhysicianOrganizations, mfpPoPatientsInfo]')
  //     .where('mfp_po_patients.POID', '=', `${prescriber.POID}`)

  // |const knexMfpPoPatients = MfpPoPatients.knex();
  //
  // const [mfpPoPatientInfo] = await knex.from(`${MfpPoPatients.tableName}`)
  //     .innerJoin(`${MfpPhysicianOrganizations.tableName}`, `${MfpPhysicianOrganizations.tableName}.${MfpPhysicianOrganizations.IDColumn}`, `${MfpPoPatients.tableName}.${MfpPoPatients.POIDColumn}`)
  //     .innerJoin(`${MfpPoPatientsInfo.tableName}`, `${MfpPoPatientsInfo.tableName}.${MfpPoPatientsInfo.POUserIDColumn}`, `${MfpPoPatients.tableName}.${MfpPoPatients.IDColumn}`)
  //  |   .where(`${MfpPoPatientsInfo.tableName}.${MfpPoPatientsInfo.POUserIDColumn}`, '=', `${prescriber.POID}`) // undefined

  // const [mfpPoPatientInfo] = await knex.from('mfp_po_patients')
  //     .innerJoin('mfp_physician_organizations', `mfp_physician_organizations.ID`, `mfp_po_patients.POID`)
  //     .innerJoin('mfp_po_patients_info', `mfp_po_patients_info.POUserID`, `mfp_po_patients.ID`)
  //     .where(`mfp_po_patients.POID`, '=', `${prescriber.POID}`) // undefined

  //| console.log({ patient, testRequest, mfpTestRequest, scanService, prescriber, location, mfpPoPatientInfo })

  // const [notP] = await Patient.query()
  //     .withGraphFetched('user')
  //     .where('patients.UserID', '=', `${22222}`)
  //
  // const [testRequest1] = await TestRequest.query()
  //     .withGraphFetched('patient')
  //     .where('test_requests.PatientID', '=', `${22222}`)
  //
  // const [mfpTestRequest1] = await knex.from('mfp_po_test_requests')
  //     .innerJoin('test_requests', 'mfp_po_test_requests.TestRequestID', 'test_requests.ID')
  //     .where('mfp_po_test_requests.TestRequestID', '=', `${333333}`)
  //
  // const scanService1 = await ScanService.query().findById(666666);
  //
  // console.log([2,251,7,403.92,'08028',20,-75.11951000,39.70000800,'Sprain, contusion, other internal derangement',62,'2018-04-18 13:09:24',1,541.00,10.00,'percent',1,'src_1CIG25HLbXbhA2ahQbewixvX','src_client_secret_ChfMHIhgbnKGsJCZ5in5aAn6','',0,0,0,1,0.00,'NULL',0,'NULL','NULL','NULL','NULL','NULL']
  //   .length)
}

run()
