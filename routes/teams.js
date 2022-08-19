/* eslint-disable consistent-return */
const router = require('express').Router();

const { Team } = require('../db');

router.post('/createTeam', (req, res, next) => {
  if (!req.body || Object.keys(req.body).length < 1) return next({ status: 400, msg: 'No Body Provided' });

  Team.create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/getAll', (req, res, next) => {
  Team.find().then((results) => res.json(results)).catch((err) => next(err));
});

router.get('/getById/:id', (req, res, next) => {
  const { id } = req.params;
  if (id === null || id === undefined) return next({ status: 400, msg: 'Bad Request' });

  Team.findById(id).then((result) => res.json(result)).catch((err) => next(err));
});

router.patch('/updateTeam/:id', (req, res, next) => {
  const { id } = req.params;
  const qs = req.query;

  Team.findByIdAndUpdate(id, qs).then((result) => res.json(result)).catch((err) => next(err));
});

router.delete('/deleteTeam/:id', async (req, res, next) => {
  const { id } = req.params;

  // Team.findByIdAndDelete(id).then((ans) => res.status(204).json(ans)).catch((err) => next(err));
  // trying async/await
  try {
    const result = await Team.findByIdAndDelete(id);
    return res.status(204).send(result);
  } catch (err) {
    return next(err);
  }
});

router.delete('/deleteAllTeams', (req, res, next) => {
  Team.deleteMany({}).then((result) => res.json(result)).catch((err) => next(err));
});

module.exports = router;
