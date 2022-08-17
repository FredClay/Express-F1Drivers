const router = require('express').Router();

const drivers = [
  {
    name: 'Lando Norris',
    nationality: 'English',
    age: 24,
    height: 170.4,
  },
];

router.post('/createDriver', (req, res) => {
  console.log('Req Body:', req.body);
  drivers.push(req.body);
  return res.status(201).send();
});

router.get('/getAll', (req, res) => res.send(drivers));

router.get('/getById/:id', (req, res) => {
  console.log(`Getting driver ID No. ${req.params}.`);
  return res.send(drivers[req.params.id - 1]);
});

router.patch('/updateDriver/:id', (req, res) => {
  console.log(`Query: ${req.query.name}`);
  const activeDriver = drivers[req.params.id - 1];
  if (req.query.name && req.query.name !== '') { activeDriver.name = req.query.name; }
  if (req.query.nationality && req.query.nationality !== '') { activeDriver.nationality = req.query.nationality; }
  if (req.query.age && req.query.age !== '') { activeDriver.age = parseInt(req.query.age, 10); }
  if (req.query.height && req.query.height !== '') { activeDriver.height = parseFloat(req.query.height); }

  drivers[req.params.id - 1] = activeDriver;

  return res.send();
});

router.delete('/deleteDriver/:id', (req, res) => {
  console.log(`Deleting driver ID No. ${req.params}.`);
  drivers.splice(req.params - 1, 1);
  return res.send();
});

module.exports = router;
