const JSONStream = require('JSONStream');
const Promise = require('bluebird');
const es = require('event-stream');
const fs = require('fs');
const request = require('request-promise');

let i = 100000;


fs.ReadStream('1.txt')
  .pipe(JSONStream.parse('*'))
  .pipe(es.mapSync(function (data) {
    data.ID = i++;
    data.PROC = '2';
    return request({
      uri: 'http://10.25.8.129:3000/api/internacao',
      method: 'POST',
      body: data,
      json: true
    });
  }))
