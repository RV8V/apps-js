'use strict'

const { expect } = require('chai')
const request = require('supertest')

const app = require('../../server')
const db = require('../../index')

describe('POST /login', () => {
  before(done => {
    db.connect()
      .then(() => done())
      .catch(err => done(err))
  }) 

  after(done => {
    db.close()
      .then(() => done())
      .catch(err => done(err))
  })

  it('OK, checking login', done => {
    request(app).post('/login')
      .send({ name: 'HELLO', password: 'z' })
      .then(res => {
        const body = res.body
        expect(body).to.contain.property('message')
        expect(body).to.contain.property('accessToken')
        expect(body).to.contain.property('refreshTokenPayload')
        done()
      })
      .catch(err => done(err))
  })

  it('Fail, login requires authentication', done => {
    request(app).post('/login')
      .send({ name: 'name', password: 'password' })
      .then(res => {
        const body = res.body
        expect(body).to.contain.property('message')
        done()
      })
      .catch(err => done(err))
  })
})

describe('POST /token', () => {
  before(done => {
    db.connect()
      .then(() => done())
      .catch(err => done(err))
  })

  after(done => {
    db.close()
      .then(() => done())
      .catch(err => done(err))
  })

  it('OK, get token', done => {
    request(app).post('/token')
      .send({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvZEBnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZWI5ZjAwMzRjMzM1ZTQ0N2QxNzFjY2EiLCJpYXQiOjE1ODkyNDQ1MjJ9.zwtglkrUXxosmA1K9ytZwuHOvt5YFzba7U8tkffYuaA' })
      .then(res => {
        const body = res.body
        expect(body).to.contain.property('accessToken')
        done()
      })
      .catch(err => done(err))
  })

  it('Fail, get token', done => {
    request(app).post('/token')
      .send({ name: 'token' })
      .then(res => {
        const body = res.body
        expect(body.length).to.equal(undefined)
        done() // Forbidden
      })
      .catch(err => done(err))
  })
})
