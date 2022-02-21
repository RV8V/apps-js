const HttpException = require('../errors/HttpException');
const { NOT_FOUND } = require('../errors/errorCodes');
const datica = require('../storages/datica/connection');

const getPatientsByTestRequest = async patientIds => {
  return (await datica.knex.raw(`
    SELECT UserID, CONCAT(FirstName, ' ', LastName) AS PatientName FROM patients
    WHERE UserID IN (?);
  `, [patientIds]
  ))
  .shift()
  .map(item => ({ ...item }))
}

const getPatientByTestRequestId = async patientId => {
  const patient = (await datica.knex.raw(`
    SELECT UserID, CONCAT(FirstName, ' ', LastName) AS PatientName FROM patients
    WHERE UserID = ?;
  `, [patientId]
  ))
  .shift()
  .shift()

  if (!patient) {
    throw new HttpException({ ...NOT_FOUND, message: `Patient was not found by id: ${patientId}` })
  }
  return patient;
}

module.exports = {
  getPatientsByTestRequest,
  getPatientByTestRequestId
}
