'use strict'

const RefreshToken = require('../models/refreshToken')

const findRefreshTokenByUserId = async id => {
  const refreshToken = await RefreshToken.findOne({ refresh: id }).exec()
  return refreshToken
}

const deleteRefreshToken = async token => {
  const refreshToken = await RefreshToken.findOneAndRemove({ payload: token }).exec()
  return refreshToken
}

const findRefreshTokenByPayload = async token => {
  const refreshToken = await RefreshToken.findOne({ payload: token }).exec()
  return refreshToken
}

module.exports = { findRefreshTokenByUserId, deleteRefreshToken, findRefreshTokenByPayload }
