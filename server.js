import express from 'express';
import { writeFile } from 'fs';
import logger from 'morgan';
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

const users = {};
const employers = {};
const jobs = {}

const usersFile = 'users.json';
const employersFile = 'employers.json';
const jobsFile = 'jobs.json';

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
app.get('/jobs/:jobID/applicants', (req, res) => {
    res.sendFile(__dirname + '/static/applicants.html');
});




//LOGIN SERVER CODE HERE:
//for process input below
var loginValidation = [
    check('email', 'must be a valid email').isEmail().trim().escape().normalizeEmail(),
    check('password').isLength({ min: 8}).withMessage('password must be at least 8 characters').trim().escape()
];
//process input
app.post('/login', loginValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        let email = req.body.email;
        let password = req.body.password;
        res.send(`Email: ${email} Password: ${password}`);
    }
});




//CREATE STUFF HERE:

//creates new user
app.post('/user/create/:email/:name', async (req, res) => {
    createUser(res, req.params);
});

//creates new employer
app.post('/employer/create/:email/:name', async (req, res) => {
    createEmployer(res, req.params);
});

//creates new job
app.post('/employer/job/create/:email/:name/:location/:date', async (req, res) => {
    createJob(res, req.params);
});

async function createUser(response, userInfo) {
    if (userExists(userInfo.email)) {
        response.status(400).json({ error: 'User already exists '});
    } else {
        //reload of some kind here?
        users[userInfo.email] = userInfo;
        users[userInfo.email].applied = [];
        await save(users, usersFile);
        response.json(users[userInfo.email]);
    }
}

async function createEmployer(response, employerInfo) {
    if (employerExists(employerInfo.email)) {
        response.status(400).json({ error: 'Employer already exists '});
    } else {
        //reload of some kind here?
        employers[employerInfo.email] = employerInfo;
        employers[employerInfo.email].activeJobs = [];
        await save(employers, employersFile);
        response.json(employers[employerInfo.email]);
    }
}

async function createJob(response, info) {
    let jobID = generateJobId(); //creates unique id
    jobs[jobID] = info;
    jobs[jobID].applicants = [];
    await save(jobs, jobsFile);
    employers[info.email].activeJobs.push(jobID);  //adds jobID to employer's active job array
    await save(employers, employersFile);
    response.json(jobs[jobID]);
}




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
    res.json(employers)
});




//UPDATE STUFF HERE:

//specified user applys to specified job
app.put('/user/:email/apply/:jobID', async (req, res) => {
    apply(res, req.params.email, req.params.jobID);
});

async function apply(response, user, jobID) {
    if (!userExists(user)) {
        response.status(404).json({ error: 'user not found '});
    }
    if (!jobExists(jobID)) {
        response.status(404).json({ error: 'job not found' });
    }
    users[user].applied.push(jobID);
    jobs[jobID].applicants.push(email);
    await save(users, usersFile);
    await save(jobs, jobsFile);
    response.status(204);
}


//DELETE STUFF HERE:

app.delete('/job/delete/:jobID', async (req, res) => {
    deleteJob(req.param.jobID);
});

async function deleteJob(jobID) {

}


app.get('*', (req, res) => {
  console.log(req.path);
  res.status(404).json({ message: 'Unknown Request' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});




//RANDOM HELPER FUNCTIONS HERE:

function userExists(email) { 
    return email in users;
}

function employerExists(email) {
    return email in employers;
}

function jobExists(jobID) {
    return jobID in jobs;
}

function generateJobId() {
    let id = Math.floor(100000 + Math.random() * 900000);
    if (id in jobs) {
        generateJobId();
    }
    return id; 
}

async function save(obj, file) {
    try {
        const data = JSON.stringify(obj);
        await writeFile(file, data, { encoding: 'utf8' })
    } catch (err) {
        console.log(err);
    }
}



