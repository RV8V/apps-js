const uploadTestRequestNote = require('./uploadTestRequestNote');
const downloadTestRequestNote = require('./downloadTestRequestNote');
const getTestRequestNoteFilesByTestRequestId = require('./getTestRequestNoteFilesByTestRequestId');
const removeTestRequestNoteByKey = require('./removeTestRequestNoteByKey');
const editTestRequestFileNotesByTestRequestId = require('./editTestRequestFileNotesByTestRequestId');
const disableScanRequestFileNotesByKeys = require('./disableScanRequestFileNotesByKeys.js');
const enableScanRequestFileNotesByKeys = require('./enableScanRequestFileNotesByKeys.js');

module.exports = {
  uploadTestRequestNote,
  downloadTestRequestNote,
  getTestRequestNoteFilesByTestRequestId,
  removeTestRequestNoteByKey,
  editTestRequestFileNotesByTestRequestId,
  enableScanRequestFileNotesByKeys,
  disableScanRequestFileNotesByKeys
};
