import express from 'express';
import logger from 'morgan';
import * as utilities from 'utilities.js';
import { users, employers, jobs } from 'utilities.js';
import { usersFile, employersFile, jobsFile } from 'utilities.js';
import { generateJobId } from './static/utilities';
 
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

this.server.use('/', express.static('static'));

//ROUTES TO HTML HERE:

//Route to homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
})

//route to login page for users
app.get('/user/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

//route to login page for employers
app.get('/employer/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

//route to user search page
app.get('/user/search', (req, res) => {
    res.sendFile(__dirname + '/static/search.html');
});

//route to job description of specified job for users to view
//NOT DONE YET
app.get('/jobs/:jobID/description', (req, res) => {
    res.sendFile(__dirname + '/static/jobDescription.html');
});

//route to employer homepage
app.get('/employer/homepage', (req, res) => {
    res.sendFile(__dirname + '/static/employerinterface.html');
});

//route to applicants list for a specified job for employer to view
//NOT DONE YET
app.get('/employer/:jobID/applicants', (req, res) => {
    res.sendFile(__dirname + '/static/applicants.html');
});




//LOGIN SERVER CODE HERE:
//for process input below
var loginValidation = [
    check('email', 'must be a valid email').isEmail().trim().escape().normalizeEmail(),
    check('password').isLength({ min: 8}).withMessage('password must be at least 8 characters').trim().escape()
];
//process input
app.post('/user/login', loginValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        let email = req.body.email;
        let password = req.body.password;
        res.send(`Email: ${email} Password: ${password} Type: user`);
    }
});

app.post('/employer/login', loginValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        let email = req.body.email;
        let password = req.body.password;
        res.send(`Email: ${email} Password: ${password}  Type: employer`);
    }
});


//CREATE STUFF HERE:

//creates new user
app.post('/user/create/:email/:name', async (req, res) => {
    utilities.createUser(res, req.params);
});

//creates new employer
app.post('/employer/create/:email/:name', async (req, res) => {
    utilities.createEmployer(res, req.params);
});

//creates new job
app.post('/employer/job/create/:email/:title/:desc/:rate/:hours/:location/:date', async (req, res) => {
    utilities.createJob(res, req.params);
});




//READ STUFF HERE:

//response will be JSON object representing all jobs 
app.get('/jobs', (req, res) => {
    res.json(jobs);
});

//response will be JSOn object representing all users
app.get('/users', (req, res) => {
    res.json(users);
});

//response will be JSON object representing all employers
app.get('/employers', (req, res) => {
    res.json(employers);
});

//response will be JSON object specified jobs 
app.get('/employer/job/:jobID', (req, res) => {
    res.json(jobs[req.jobID]);
});

//response will be JSOn object specified user
app.get('/user/:email', (req, res) => {
    res.json(users[req.email]);
});

//response will be JSON object representing specified employer
app.get('/employer/:email', (req, res) => {
    res.json(employers[req.email]);
});




//UPDATE STUFF HERE:

//specified user applys to specified job
app.put('/user/:email/apply/:jobID', async (req, res) => {
    utilities.apply(res, req.params.email, req.params.jobID);
});




//DELETE STUFF HERE:
app.delete('/employer/job/delete/:jobID', async (req, res) => {
    utilities.deleteJob(req.param.jobID);
});

app.delete('/employer/delete/:email', async (req, res) => {
    utilities.deleteEmployer(res, req.email);
});

app.delete('/user/delete/:email', async (req, res) => {
    utilities.deleteUser(res, req.email);
});


app.get('*', (req, res) => {
  console.log(req.path);
  res.status(404).json({ message: 'Unknown Request' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
