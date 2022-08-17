const router = require('express').Router();

const teams = [
  {
    name: 'McLaren',
    homeCountry: 'England',
    yearFounded: 1980,
    teamPrincipal: 'Andreas Seidl',
  },
];

router.post('/createTeam', (req, res) => {
  console.log('Req Body:', req.body);
  teams.push(req.body);
  return res.status(201).send();
});

router.get('/getAll', (req, res) => res.send(teams));

router.get('/getById/:id', (req, res) => {
  console.log(`Getting Team ID No. ${req.params}.`);
  return res.send(teams[req.params.id - 1]);
});

router.patch('/updateTeam/:id', (req, res) => {
  console.log(`Query: ${req.query.name}`);
  const activeTeam = teams[req.params.id - 1];
  if (req.query.name && req.query.name !== '') { activeTeam.name = req.query.name; }
  if (req.query.homeCountry && req.query.homeCountry !== '') { activeTeam.homeCountry = req.query.homeCountry; }
  if (req.query.yearFounded && req.query.yearFounded !== '') { activeTeam.yearFounded = parseInt(req.query.yearFounded, 10); }
  if (req.query.teamPrincipal && req.query.teamPrincipal !== '') { activeTeam.teamPrincipal = req.query.teamPrincipal; }

  teams[req.params.id - 1] = activeTeam;

  return res.send();
});

router.delete('/deleteTeam/:id', (req, res) => {
  console.log(`Deleting Team ID No. ${req.params}.`);
  teams.splice(req.params - 1, 1);
  return res.send();
});

module.exports = router;
