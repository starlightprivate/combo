'use strict';
import supertest from 'supertest';
import app from './../server.js';

describe('web application', function () {
  it('it has 200 on /', function (done) {
    supertest(app)
      .get('/')
      .expect(200, done);
  });
  it('it has 200 and pong on /api/v2/ping', function (done) {
    supertest(app)
      .get('/api/v2/ping')
      .expect(200)
      .expect('pong', done);
  });

  it('it has 200  /robots.txt', function (done) {
    supertest(app)
      .get('/robots.txt')
      .expect('Content-Type', /text\/plain/)
      .expect(200, done);
  });

  it('serves api v2');
  it('tons of other tests');
});
