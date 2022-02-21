const HttpException = require('../../errors/HttpException');
const scanService = require('../../services/scan-service.service')
const scanRequestService = require('../../services/scan-request.service')
const { s3RxConfig, uploadReadableStream } = require('../../storages/multer.js')
const { bucketRxsName, prescriptionExt } = require('../../config/cfg');
const { v4: uuidv4 } = require('uuid');

const BUCKET_RXS_NAME = bucketRxsName;
const DEFAULT_PRESCRIPTION_EXTENSION = prescriptionExt;

const generateErxPdfDocument = async (req, res, next) => {
  const payload = req.body;

  const service = await scanService.getScanServiceById(payload.ScanServiceID);
  const prescription = await scanRequestService.generateErxPdfDocument(payload, service);
  const uploaded = await uploadReadableStream(s3RxConfig, BUCKET_RXS_NAME, `${uuidv4()}.${DEFAULT_PRESCRIPTION_EXTENSION}`, prescription.theOutput);
  return res.send({ key: uploaded.key });
};

module.exports = generateErxPdfDocument;
