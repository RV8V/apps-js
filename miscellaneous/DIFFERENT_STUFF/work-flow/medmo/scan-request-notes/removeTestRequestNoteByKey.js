const noteStorage = require('../../storages/multer/note-s3');

const removeTestRequestNoteByKey = async (req, res, next) => {
  noteStorage.removeNoteByKey(req.params.key, (err, note) => {
    if (err) next(err);
    return res.send(note);
  });
};

module.exports = removeTestRequestNoteByKey;
