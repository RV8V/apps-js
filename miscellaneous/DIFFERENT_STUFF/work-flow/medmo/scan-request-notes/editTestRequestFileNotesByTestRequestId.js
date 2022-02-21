const testRequestFileService = require('../../services/test-request-file.service');
const testRequestFileTypeService = require('../../services/test-request-file-type.service');
const scanRequestService = require('../../services/scan-request.service');

const editTestRequestFileNotesByTestRequestId = async (req, res) => {
  const session = req.session;
  const requestId = req.params.id;
  const editPayload = req.body;

  const clinicalNoteType = await testRequestFileTypeService.getNoteTypeByName('Clinical note');

  if (editPayload.KeysToRemove.length) {
    await testRequestFileService.disableScanRequestFileNotesByKeys(editPayload.KeysToRemove);
  }

  await Promise.all(
    editPayload.KeysToSave.map((noteName) => {
      return testRequestFileService.createTestRequestFile(
        {
          TestRequestID: Number(requestId),
          PathToFile: noteName,
          FileTypeID: clinicalNoteType.ID
        },
        session
      );
    })
  );

  const request = await scanRequestService.updateTestRequestByTestRequestId(requestId, {
    ClinicalNotes: editPayload.ClinicalNotes,
    OtherNotes: editPayload.LogisticNotes
  });

  return res.send(request);
};

module.exports = editTestRequestFileNotesByTestRequestId;
