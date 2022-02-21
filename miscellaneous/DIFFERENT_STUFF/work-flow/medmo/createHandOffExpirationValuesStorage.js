const RESET_PASSWORD_LIMIT_ATTEMPTS = 5;

const createHandOffExpirationValuesStorage = (storage = {
  completedHandOffStatus: false,
  birthdayConfirmationAttempts: 0
}) => ({
  setCompletedHandOffStatus: (patientId) => storage[key] = { completedHandOffStatus: true },
  setFailedBirthdayConfirmations: (patientId) => {
    storage[patientId].birthdayConfirmationAttempts = (storage[patientId].birthdayConfirmationAttempts || 0) + 1;
    if (storage[patientId].birthdayConfirmationAttempts === RESET_PASSWORD_LIMIT_ATTEMPTS) {
      throw new Error(`Max attempts reached: ${RESET_PASSWORD_LIMIT_ATTEMPTS}`)
    }
  },
  getHandOffValue: (patientId) => storage[patientId],
  getCompletedHandOffStatus: (patientId) => storage[patientId].completedHandOffStatus
});

module.exports = createHandOffExpirationValuesStorage();
