const HttpException = require('../../errors/HttpException');
const handOffPxService = require('../../services/hand-off-px.service');
const testRequestService = require('../../services/test-request.service')
const saveAvailableTimeSlotsInTestRequestProgress = require('../../utils/saveAvailableTimeSlotsInTestRequestProgress')

const {
  checkSelfPay,
  SELFPAY_IS_NULL,
  SELFPAY_IS_ZERO,
  SELFPAY_IS_ONE
} = require('../../utils/checkSelfPay.js')

const {
  checkIsAnyTime,
  IS_ANY_TIME_IS_ZERO,
  IS_ANY_TIME_IS_ONE
} = require('../../utils/checkIsAnyTime.js')

const updateTestRequestPxById = async (req, res, next) => {
  const testRequestId = req.params.id;
  const payload = req.body;

  const fromISOToTimeStamp = () => {
    const iso = new Date().toISOString().replace(/T/, ' ');
    return iso.slice(0, iso.indexOf('.'));
  }

  const formDateRequestedAndDateCompleted = slots => {
    return slots.split(',').map(date => date.split('/'));
  }

  const convertUndefinedToNull = value => value || null

  const oneIsAnyTimeHandler = () => {
    return {

    }
  };
  const zeroIsAnyTimeHandler = async payload => await saveAvailableTimeSlotsInTestRequestProgress({
    currID: convertUndefinedToNull(payload.CurrID),
    currTestRequestID: convertUndefinedToNull(testRequestId),
    newScanServiceID: payload.ScanServiceId,
    newZipCode: payload.ZipCode,
    newDistance: convertUndefinedToNull(payload.Distance),
    newIsAnyTime: payload.IsAnyTime,
    newAvailableSlots: payload.AvailableSlots,
    newSelfPay: payload.SelfPay,
    newPatientID: convertUndefinedToNull(payload.PatientID),
    currOrigin1: convertUndefinedToNull(payload.CurrOrigin1),
    currOrigin2: convertUndefinedToNull(payload.CurrOrigin2),
  });

  const isAnyTimeHandlers = {
    [IS_ANY_TIME_IS_ZERO]: zeroIsAnyTimeHandler,
    [IS_ANY_TIME_IS_ONE]: oneIsAnyTimeHandler,
  }

  const oneSelfPayHandler = async payload => {
    const defaultValues = {
      SelfPay: SELFPAY_IS_ONE,
      ZipCode: payload.ZipCode,
      PaymentID: payload.PaymentID,
      PaymentSecret: payload.PaymentSecret,
      CardType: payload.CardType,
      CardLast4: payload.CardLast4,
    }

    const testRequest = await testRequestService.updateTestRequestById(testRequestId, {
      PatientInsuranceID: payload.InsuranceId,
      ...defaultValues
    });

    const scanRequest = await handOffPxService.updateTestRequestPxById(testRequestId, {
      ...defaultValues
    });

    return { testRequest, scanRequest }
  }

  const zeroSelfPayHandler = async payload => {
    const defaultValues = {
      SelfPay: SELFPAY_IS_ZERO,
      ZipCode: payload.ZipCode,
    }

    const testRequest = await testRequestService.updateTestRequestById(testRequestId, {
      ...defaultValues
    });

    const scanRequest = await handOffPxService.updateTestRequestPxById(testRequestId, {
      ...defaultValues
    });

    return { testRequest, scanRequest }
  }

  const selfPayHandlers = {
    [SELFPAY_IS_ZERO]: zeroSelfPayHandler,
    [SELFPAY_IS_ONE]: oneSelfPayHandler,
  }

  try {
    const selfPay = checkSelfPay(payload.SelfPay);
    const isAnyTime = checkIsAnyTime(payload.IsAnyTime);
    const anyTime = await isAnyTimeHandlers[isAnyTime](payload);
    const requests = await selfPayHandlers[selfPay](payload);
    return res.send({ anyTime, ...requests });
  } catch(err) {
    return res.send({ ...err, message: err.message });
  }
};

module.exports = updateTestRequestPxById;
