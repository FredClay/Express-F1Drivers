/* eslint-disable consistent-return */
const router = require('express').Router();

const Driver = require('../db').driver;

router.post('/createDriver', (req, res, next) => {
  console.log('Req Body:', req.body);
  if (!req.body || Object.keys(req.body).length < 1) return next({ status: 400, msg: 'No Body Provided' });

  Driver.create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/getAll', (req, res, next) => {
  Driver.find().then((results) => res.json(results)).catch((err) => next(err));
});

router.get('/getById/:id', (req, res, next) => {
  console.log(`Getting driver ID No. ${req.params}.`);
  const { id } = req.params;
  if (id === null || id === undefined) return next({ status: 400, msg: 'Bad Request' });

  Driver.findById(id).then((result) => res.json(result)).catch((err) => next(err));
});

router.patch('/updateDriver/:id', (req, res, next) => {
  console.log(`Query: ${req.query.name}`);
  const { id } = req.params;
  const qs = req.query;

  Driver.findByIdAndUpdate(id, qs).then((result) => res.json(result)).catch((err) => next(err));
});

router.delete('/deleteDriver/:id', (req, res, next) => {
  console.log(`Deleting driver ID No. ${req.params}.`);
  const { id } = req.params;

  Driver.findByIdAndDelete(id).then((ans) => res.status(204).json(ans)).catch((err) => next(err));
});

module.exports = router;
