import 'dotenv/config';
import expressSession from 'express-session';
import express from 'express';
import logger from 'morgan';
import * as utilities from 'utilities.js';
//import { users, employers, jobs } from 'utilities.js';
import { usersFile, employersFile, jobsFile } from 'utilities.js';
<<<<<<< HEAD
import { generateJobId } from './static/utilities';
 
=======
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import auth from './auth.js';
import users from './users.js';

>>>>>>> 40f38cbe0631ee0210cd8e7f79c9bd3b042363b8
const { check, validationResult } = require('express-validator');
//const bodyParser = require('body-parser'); 
const app = express();
<<<<<<< HEAD
const port = 3000;
=======
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));
>>>>>>> 40f38cbe0631ee0210cd8e7f79c9bd3b042363b8

app.use(logger('dev'));
app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: false }));
auth.configure(app);
app.use('/static', express.static('static'));


// Session configuration
const sessionConfig = {
    // set this encryption key in Heroku config (never in GitHub)!
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
};

//ROUTES TO HTML HERE:
//Route to homepage
app.get('/', (req, res) => {
    res.sendFile('static/index.html', { root: __dirname });
})

//route to login page for users
app.get('/login', (req, res) => {
    res.sendFile('static/login.html', { root: __dirname });
});

/**
app.get('/register', (req, res) =>
  res.sendFile('static/register.html', { root: __dirname })
);
*/

//route to user search page
app.get('/search', (req, res) => {
    res.sendFile('static/search.html', { root: __dirname });
});

//route to job description of specified job for users to view
app.get(':jobID/description', (req, res) => {
    res.sendFile('static/jobDescription.html', { root: __dirname });
});



//LOGIN SERVER CODE HERE:
//for process input below
var loginValidation = [
    check('email', 'must be a valid email').isEmail().trim().escape().normalizeEmail(),
    check('password').isLength({ min: 8}).withMessage('password must be at least 8 characters').trim().escape()
];

/**
//process input
app.post('/login', loginValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        let email = req.body.email;
        let password = req.body.password;
        res.send(`Email: ${email} Password: ${password} Type: user`);
    }
});
*/

app.post('/login', auth.authenticate('local', {
    successRedirect: '/private',  //when we login, go to /private
    failureRedirect: '/login',    //otherise, back to login
}));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});

/**
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.addUser(username, password)) {
      res.redirect('/login');
    } else {
      res.redirect('/register');
    }
});
*/
 
app.get('/private', checkLoggedIn, (req, res) => {
    res.redirect('/private/' + req.user);
});


//CREATE STUFF HERE:

//creates new user
app.post('/user/create/:email/:name', async (request, response) => {
    const { email, name } = request.body;
    //if user already exists, error
    if (await utilities.userExists(email)) {
        response.status(400).send('User already exists');
    } else {
        await utilities.saveUser(email, name);
        response.status(200).json({ status: 'success'});
    }
});

<<<<<<< HEAD
//creates new employer
app.post('/employer/create/:email/:name', async (req, res) => {
    utilities.createEmployer(res, req.params);
});

//creates new job
app.post('/employer/job/create/:email/:title/:desc/:rate/:hours/:location/:date', async (req, res) => {
    utilities.createJob(res, req.params);
});




=======
>>>>>>> 40f38cbe0631ee0210cd8e7f79c9bd3b042363b8
//READ STUFF HERE:

//response will be JSON object representing all jobs 
app.get('/jobs', async (request, response) => {
    const jobs = await utilities.readJobs();
    response.status(200).json(jobs);
});

//response will be JSON object representing all users
app.get('/users', async (request, response) => {
    const users = await utilities.readUsers();
    response.status(200).json(users);
});

//response will be JSON object specified jobs 
app.get('/job/:jobID', async (request, response) => {
    const jobID = request.body.jobID;
    const jobs = await utilities.readJobs();
    if (await utilities.jobExists(jobID)) {
        const thisJob = jobs.filter((job) => { job.jobID === jobID });
        return thisJob[0];
    } else {
        response.status(400).send('Job not found');
    }
});

//response will be JSOn object specified user
app.get('/user/:email', async (request, response) => {
    const email = request.body.email;
    const users = await utilities.readUsers();
    if (await utilities.userExists(email)) {
        const thisUser = users.filter((user) => { user.email === email });
        return thisUser[0];
    } else {
        response.status(400).send('User not found');
    }
});


//UPDATE STUFF HERE:

//specified user applys to specified job
app.put('/user/:email/apply/:jobID', async (req, res) => {
    utilities.apply(res, req.params.email, req.params.jobID);
});




//DELETE STUFF HERE:
app.delete('/employer/job/delete/:jobID', async (request, response) => {
    const jobID = request.body.jobID;
    if (await utilities.jobExists(jobID)) {
        let jobs = await utilities.readJobs();
        const jobIndex = jobs.findIndex((job) => job.jobID === jobID);
        delete jobs[jobIndex];
        writeFile(jobsFile, JSON.stringify(jobs), 'utf8');
        response.status(200).json({ status: 'success'});
    } else {
        response.status(404).send(`Job not found`);
    }
});

app.delete('/user/delete/:email', async (request, response) => {
    const email = request.body.email;
    if (await utilities.userExists(email)) {
        let users = await utilities.readUsers();
        const userIndex = users.findIndex((user) => user.email === email);
        delete users[userIndex];
        writeFile(usersFile, JSON.stringify(users), 'utf8');
        response.status(200).json({ status: 'success'});
    } else {
        response.status(404).send(`User not found`);
    }
});


app.get('*', (req, res) => {
  console.log(req.path);
  res.status(404).json({ message: 'Unknown Request' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
