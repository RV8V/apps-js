const user = await MfpPoUsers.query()
  .where(`${MfpPoUsers.tableName}.${MfpPoUsers.ResetPasswordExpiresColumn}`, '>', raw(`NOW()`))
  .findOne({ ResetPasswordToken: token, });
