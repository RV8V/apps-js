const scanRequestService = require('../../services/scan-request.service');
const daticaService = require('../../services/datica.service');

const getListOfScans = async (req, res) => {
  const session = req.session;
  const scans = await scanRequestService.getListOfScans(session.organizationId);
  const daticaPatients = await daticaService.getPatientsByTestRequest(scans.map(scan => scan.TestRequestPatientId));
  const filted = scans.map(scan => {
    const patient = daticaPatients.find(patient => patient.UserID === scan.TestRequestPatientId);
    return !patient && [] || { ...scan, PatientName: patient.PatientName }
  })
  return res.send(filted.filter(patient => patient.length !== 0));
};

module.exports = getListOfScans;
