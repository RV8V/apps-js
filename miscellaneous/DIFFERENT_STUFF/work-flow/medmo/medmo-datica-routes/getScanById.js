const scanRequestService = require('../../services/scan-request.service');
const daticaService = require('../../services/datica.service');

const getScanById = async (req, res) => {
  const session = req.session;
  const requestId = req.params.id;

  const scan = await scanRequestService.getScanById(session.organizationId, requestId);
  const daticaPatient = await daticaService.getPatientByTestRequestId(scan.TestRequestPatientId);
  return res.send({ ...scan, PatientName: daticaPatient.PatientName });
};

module.exports = getScanById;
