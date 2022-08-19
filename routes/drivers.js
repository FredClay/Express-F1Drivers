/* eslint-disable consistent-return */
const router = require('express').Router();

const { Driver } = require('../db');

router.post('/createDriver', (req, res, next) => {
  if (!req.body || Object.keys(req.body).length < 1) return next({ status: 400, msg: 'No Body Provided' });

  Driver.create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/getAll', (req, res, next) => {
  Driver.find().then((results) => res.json(results)).catch((err) => next(err));
});

router.get('/getById/:id', (req, res, next) => {
  const { id } = req.params;
  if (id === null || id === undefined) return next({ status: 400, msg: 'Bad Request' });

  Driver.findById(id).then((result) => res.json(result)).catch((err) => next(err));
});

router.patch('/updateDriver/:id', (req, res, next) => {
  const { id } = req.params;
  const qs = req.query;

  Driver.findByIdAndUpdate(id, qs).then((result) => res.json(result)).catch((err) => next(err));
});

router.delete('/deleteDriver/:id', (req, res, next) => {
  const { id } = req.params;

  Driver.findByIdAndDelete(id).then((ans) => res.status(204).json(ans)).catch((err) => next(err));
});

router.delete('/deleteAllDrivers', (req, res, next) => {
  Driver.deleteMany({}).then((result) => res.status(204).json(result)).catch((err) => next(err));
});

module.exports = router;
