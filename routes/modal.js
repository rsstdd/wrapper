// 'use strict';
// 
// const express = require('express');
// const boom = require('boom');
// const knex = require('../knex');
// const { camelizeKeys, decamelizeKeys } = require('humps');
// 
// const ev = require('express-validation');
// const validations = require('../validations/airplanes');
// 
// // eslint-disable-next-line new-cap
// const router = express.Router();
// 
// router.get('/moal', (_req, res, next) => {
//   knex('airplanes')
//     .orderBy('name')
//     .then((rows) => {
//       const aircraft = camelizeKeys(rows);
// 
//       res.send(aircraft);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
// 
// module.exports = router;
