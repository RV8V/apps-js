const testRequestFileService = require('../../services/test-request-file.service');

const disableScanRequestFileNotesByKeys = async (req, res) => {
  const softDeletedPrescriptionNotes =
    await testRequestFileService.disableScanRequestFileNotesByKeys(req.body.keys);
  return res.send(`Scan Request Prescription Notes were disabled: ${softDeletedPrescriptionNotes}`);
};

module.exports = disableScanRequestFileNotesByKeys;
