'use strict';
import supertest from 'supertest';
import app from './../server.js';

describe('web application can be started', function () {
  it('serves 200 on / with proper headers', function (done) {
    supertest(app)
      .get('/')
      .expect('X-Powered-By', 'TacticalMastery')
      .expect(200, done);
  });
});

describe('server side generated templates', function () {
  it('serves  proper /', function (done) {
    supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
  it('serves  proper /checkout.html', function (done) {
    supertest(app)
      .get('/checkout.html')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
  it('serves  proper /customercare', function (done) {
    supertest(app)
      .get('/customercare.html')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
  it('serves  proper /partner.html', function (done) {
    supertest(app)
      .get('/partner.html')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
  it('serves  proper /privacy.html', function (done) {
    supertest(app)
      .get('/privacy.html')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
  it('serves  proper /terms.html', function (done) {
    supertest(app)
      .get('/terms.html')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
  it('serves  proper /us_batteryoffer.html', function (done) {
    supertest(app)
      .get('/us_batteryoffer.html')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
  it('serves  proper /us_headlampoffer.html', function (done) {
    supertest(app)
      .get('/us_headlampoffer.html')
      .expect(200)
      .expect('Content-Type', /text\/html/, done);
  });
});

describe('v2 api', function () {
  it('serves 200 and pong on /api/v2/ping', function (done) {
    supertest(app)
      .get('/api/v2/ping')
      .expect(200)
      .expect('pong', done);
  });
});

describe('statis assets', function () {
  it('serves  200 and text-plain for /robots.txt', function (done) {
    supertest(app)
      .get('/robots.txt')
      .expect('Content-Type', /text\/plain/)
      .expect(200, done);
  });
});