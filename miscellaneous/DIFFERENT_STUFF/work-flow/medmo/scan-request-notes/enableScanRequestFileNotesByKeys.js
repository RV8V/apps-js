const testRequestFileService = require('../../services/test-request-file.service');

const enableScanRequestFileNotesByKeys = async (req, res) => {
  const enabledPrescriptionNotes = await testRequestFileService.enableScanRequestFileNotesByKeys(
    req.body.keys
  );
  return res.send(`Scan Request Prescription Notes were enabled: ${enabledPrescriptionNotes}`);
};

module.exports = enableScanRequestFileNotesByKeys;
