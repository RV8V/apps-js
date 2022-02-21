const noteStorage = require('../../storages/multer/note-s3');

const downloadTestRequestNote = async (req, res, next) => {
  noteStorage.downloadNoteByKey(req.params.key, (err, note) => {
    if (err) next(err);
    return res.send(note);
  });
};

module.exports = downloadTestRequestNote;
