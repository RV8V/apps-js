const scanRequestNoteService = require('../../services/scan-request-note.service');

const uploadTestRequestNote = async (req, res) => {
  const files = scanRequestNoteService.uploadTestRequestNote(req.files);
  return res.send(files.map(({ key }) => key));
};

module.exports = uploadTestRequestNote;
