const HttpException = require('../../errors/HttpException');
const checkSession = require('../../utils/checkSession')
const { fileDestination } = require('../../config/cfg');
const scanRequestService = require('../../services/scan-request.service')

const downloadTestRequestFileById = async (req, res, next) => {
  const fileName = req.params.fileName;
  const session = req.session;

  try {
    const validated = checkSession(session)
  } catch(err) {
    return res.send(err)
  }

  const readStream = scanRequestService.downloadTestRequestFileByName(fileName)
    .on('error', err => {
      return res.send({ code: err.code, message: `File for Scan Request was deleted: ${fileName}` })
  });
  return readStream.pipe(res);
};

module.exports = downloadTestRequestFileById;

const downloadTestRequestFileByName = fileName => {
  const fileDest = path.join(fileDestination, fileName);
  return fs.createReadStream(fileDest);
}

const removeTestRequestFileByName = async fileName => {
  const fileDest = path.join(fileDestination, fileName);
  await util.promisify(fs.unlink)(fileDest);
}
