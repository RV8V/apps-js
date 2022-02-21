const HttpException = require('../../errors/HttpException');
const checkSession = require('../../utils/checkSession')
const scanRequestService = require('../../services/scan-request.service')
const locationService = require('../../services/location.service')
const prescriberService = require('../../services/prescriber.service')
const patientService = require('../../services/patient.service')
const scanStatusService = require('../../services/scan-status.service')
const scanService = require('../../services/scan-service.service')
const scanRequestFileService = require('../../services/scan-request-file.service')
const scanRequestNoteService = require('../../services/scan-request-note.service')
const scanRequestNoteTypeService = require('../../services/scan-request-note-type.service')
const testRequestService = require('../../services/test-request.service')
const patientInsuranceService = require('../../services/patient-insurance.service')
const {
  sendCompletedMfpPoTestRequestLink,
  sendNotCompletedMfpPoTestRequestLink,
  SCAN_REQUEST_NOT_COMPLETED,
  SCAN_REQUEST_COMPLETED
} = require('../../utils/email.js');

const {
  checkSelfPay,
  SELFPAY_IS_NULL,
  SELFPAY_IS_ZERO,
  SELFPAY_IS_ONE
} = require('../../utils/checkSelfPay.js')

const getPriceByServiceAndZip = require('../../utils/getPriceByServiceAndZip.js')

const completeTestRequestForm = async (req, res, next) => {
  const session = req.session;
  const payload = req.body;

  const nullSelfPayHandler = async (payload) => {
    const defaultValues = {
      ZipCode: payload.ZipCode,
      PaymentID: 'null',
      PaymentSecret: 'test',
      CardType: 'null',
      CardLast4: 0,
    }

    const testRequest = await testRequestService.createTestRequest({
      ScanServiceID: payload.ScanServiceID,
      Budget: 0,
      Distance: 0,
      Longitude: 0.0,
      Latitude: 0.0,
      PatientID: 51,
      AverageCost: 0,
      Rate: 0,
      EmailOutput: '',
      ...defaultValues
    });

    const scanRequest = await scanRequestService.createTestRequest(
      {
        POUserID: payload.PatientId,
        ScanServiceID: payload.ScanServiceID,
        PerscriberID: payload.PerscriberID,
        LocationID: payload.LocationID,
        Fax: payload.Fax,
        Reason: payload.Reason,
        ClinicalNotes: payload.ClinicalNotes,
        ClinicalNotesFile: payload.ClinicalNotesFile,
        OtherNotes: payload.OtherNotes,
        StatusID: payload.StatusID,
        TestRequestID: testRequest.id,
        ...defaultValues
      },
      session
    );

    return { testRequest, scanRequest, status: SCAN_REQUEST_NOT_COMPLETED }
  }

  const zeroSelfPayHandler = async (payload) => {
    const defaultValues = {
      ZipCode: payload.ZipCode,
      PaymentID: 'null',
      PaymentSecret: 'test',
      CardType: 'null',
      CardLast4: 0,
      SelfPay: '0',
    }

    const insurance = await patientInsuranceService.createPatientInsurance(
      {
        POUserID: payload.PatientId,
        InsurancePlanID: payload.InsurancePlanID,
        PolicyNumber: payload.PolicyNumber
      },
      session
    );

    const testRequest = await testRequestService.createTestRequest({
      ScanServiceID: payload.ScanServiceID,
      Budget: 0,
      Distance: 0,
      Longitude: 0.0,
      Latitude: 0.0,
      PatientID: 51,
      AverageCost: 0,
      Rate: 0,
      EmailOutput: '',
      PatientInsuranceID: 1,
      ...defaultValues
    });

    const scanRequest = await scanRequestService.createTestRequest(
      {
        POUserID: payload.PatientId,
        ScanServiceID: payload.ScanServiceID,
        PerscriberID: payload.PerscriberID,
        LocationID: payload.LocationID,
        Fax: payload.Fax,
        Reason: payload.Reason,
        ClinicalNotes: payload.ClinicalNotes,
        ClinicalNotesFile: payload.ClinicalNotesFile,
        OtherNotes: payload.OtherNotes,
        StatusID: payload.StatusID,
        TestRequestID: testRequest.id,
        PatientInsuranceID: insurance.id,
        ...defaultValues
      },
      session
    );

    return { testRequest, scanRequest, status: SCAN_REQUEST_NOT_COMPLETED }
  }

  const oneSelfPayHandler = async (payload) => {
    const defaultValues = {
      ZipCode: payload.ZipCode,
      PaymentID: payload.PaymentID,
      PaymentSecret: payload.PaymentSecret,
      CardType: payload.CardType,
      CardLast4: payload.CardLast4,
      SelfPay: '1',
    }

    const testRequest = await testRequestService.createTestRequest({
      ScanServiceID: payload.ScanServiceID,
      Budget: 0,
      Distance: 0,
      Longitude: 0.0,
      Latitude: 0.0,
      PatientID: 51,
      AverageCost: 0,
      Rate: 0,
      EmailOutput: '',
      ...defaultValues
    });

    const scanRequest = await scanRequestService.createTestRequest(
      {
        POUserID: payload.PatientId,
        ScanServiceID: payload.ScanServiceID,
        PerscriberID: payload.PerscriberID,
        LocationID: payload.LocationID,
        Fax: payload.Fax,
        Reason: payload.Reason,
        ClinicalNotes: payload.ClinicalNotes,
        ClinicalNotesFile: payload.ClinicalNotesFile,
        OtherNotes: payload.OtherNotes,
        StatusID: payload.StatusID,
        TestRequestID: testRequest.id,
        ...defaultValues
      },
      session
    );

    return { testRequest, scanRequest, status: SCAN_REQUEST_COMPLETED }
  }

  const selfPayHandlers = {
    [SELFPAY_IS_NULL]: nullSelfPayHandler,
    [SELFPAY_IS_ZERO]: zeroSelfPayHandler,
    [SELFPAY_IS_ONE]: oneSelfPayHandler,
  }

  const requestNotCompleted = async (email, testRequest) => {
    await sendNotCompletedMfpPoTestRequestLink(email, testRequest);
  }

  const requestCompleted = async (email, testRequest) => {
    await sendCompletedMfpPoTestRequestLink(email, testRequest);
  }

  const emailHandlers = {
    [SCAN_REQUEST_NOT_COMPLETED]: requestNotCompleted,
    [SCAN_REQUEST_COMPLETED]: requestCompleted
  }

  try {
    const validated = checkSession(session);
    const selfPay = checkSelfPay(payload.SelfPay);
    const requests = await selfPayHandlers[selfPay](payload)

    const testRequestFilesRxs = await Promise.all(payload.ScanRequestFileNames.map(fileName => {
      return scanRequestFileService.createScanRequestFile(
        {
          MfpTestRequestID: requests.scanRequest.id,
          PathToFile: fileName,
          FileTypeID: 1
        },
        session
      )
    }));

    const testRequestFilesNotes = await Promise.all(payload.ScanRequestNoteNames.map(noteName => {
      return scanRequestFileService.createScanRequestFile(
        {
          MfpTestRequestID: requests.scanRequest.id,
          PathToFile: noteName,
          FileTypeID: 2
        },
        session
      )
    }))

    const testRequestNote = await scanRequestNoteService.createScanRequestNote(
      {
        RequestID: requests.scanRequest.id,
        NoteTypeID: payload.NoteTypeId,
        NoteInfo: payload.NoteInfo,
      },
      session
    );

    await emailHandlers[requests.status](req.body.SendEmail, requests.testRequest);
    return res.send({ requests, testRequestFilesRxs, testRequestFilesNotes, testRequestNote })
  } catch(err) {
    return res.send({ ...err, message: err.message });
  }
};

module.exports = completeTestRequestForm;
