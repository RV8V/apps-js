const testRequestFileService = require('../../services/test-request-file.service');

const getTestRequestNoteFilesByTestRequestId = async (req, res) => {
  const noteFiles = await testRequestFileService.getTestRequestFileNotesByTestRequestId(
    req.params.id
  );
  return res.send(noteFiles.map((note) => note.PathToFile));
};

module.exports = getTestRequestNoteFilesByTestRequestId;
