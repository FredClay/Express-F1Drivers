const express = require('express');

const app = express();

// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const driverRoutes = require('./routes/drivers');

app.use('/drivers', driverRoutes);

const teamRoutes = require('./routes/teams');

app.use('/teams', teamRoutes);

app.get('/greeting', (req, res) => res.send("Welcome to Fred's Formula 1 Driver API!"));

app.get('/getError', (req, res, next) => next({ status: 418, msg: 'Problem?' }));

// will catch all requests to non existent endpoints.
app.use('*', (req, res, next) => next({ status: 404, msg: 'No Valid URL Found' }));

// first error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('Error encountered:');
  console.log(err.msg);
  return res.status(err.status).send(err.msg);
});

const server = app.listen(4494, () => {
  console.log(`Started server on port No. ${server.address().port}`);
});
