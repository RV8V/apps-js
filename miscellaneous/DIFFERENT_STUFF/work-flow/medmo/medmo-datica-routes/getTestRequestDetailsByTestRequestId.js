const scanRequestService = require('../../services/scan-request.service');
const daticaService = require('../../services/datica.service');

const getTestRequestDetailsByTestRequestId = async (req, res) => {
  const testRequestId = req.params.id;
  const requestInfo = await scanRequestService.getTestRequestDetailsByTestRequestId(testRequestId);
  const daticaPatient = await daticaService.getPatientByTestRequestId(requestInfo.TestRequestPatientId);
  return res.send({ PatientName: daticaPatient.PatientName, ...requestInfo });
};

module.exports = getTestRequestDetailsByTestRequestId;
