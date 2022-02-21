const scanRequestService = require('../../services/scan-request.service');
const testRequestWindowService = require('../../services/test-request-window.service');
const daticaService = require('../../services/datica.service');

const getTestRequestSchedulingInfoByTestRequestId = async (req, res) => {
  const testRequestId = req.params.id;
  const requestInfo = await scanRequestService.getTestRequestSchedulingInfoByTestRequestId(testRequestId);
  const windows = await testRequestWindowService.getWindowByTestRequestId(testRequestId);
  const daticaPatient = await daticaService.getPatientByTestRequestId(requestInfo.TestRequestPatientId);
  return res.send({ ...requestInfo, PatientName: daticaPatient.PatientName, windows });
};

module.exports = getTestRequestSchedulingInfoByTestRequestId;
