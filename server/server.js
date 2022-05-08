import 'dotenv/config';
import expressSession from 'express-session';
import express from 'express';
import logger from 'morgan';
const { check, validationResult } = require('express-validator');

app.use(logger('dev'));
app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
auth.configure(app);

// Session configuration
const sessionConfig = {
    // set this encryption key in Heroku config (never in GitHub)!
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
};

class JobSearchServer {
    constructor(dburl) {
        this.dburl = dburl;
        this.app = express();
        this.app.use('/', express.static('client'));
    }

    async initRoutes() {
        const self = this;
    //ROUTES TO HTML HERE:
        //Route to homepage
        this.app.get('/', (req, res) => {
            res.sendFile('static/index.html', { root: __dirname });
        })

        //route to login page for users
        this.app.get('/login', (req, res) => {
            res.sendFile('static/login.html', { root: __dirname });
        });

        /**
        app.get('/register', (req, res) =>
        res.sendFile('static/register.html', { root: __dirname })
        );
        */

        //route to user search page
        this.app.get('/search', (req, res) => {
            res.sendFile('static/search.html', { root: __dirname });
        });

        //route to job description of specified job for users to view
        this.app.get(':jobID/description', (req, res) => {
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

        this.app.post('/login', auth.authenticate('local', {
            successRedirect: '/private',  //when we login, go to /private
            failureRedirect: '/login',    //otherise, back to login
        }));

        // Handle logging out (takes us back to the login page).
        this.app.get('/logout', (req, res) => {
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
        
        this.app.get('/private', checkLoggedIn, (req, res) => {
            res.redirect('/private/' + req.user);
        });

        //CREATE STUFF HERE:

        //creates new user
        this.app.post('/user/create/:email/:name', async (request, response) => {
            const { email, name } = request.body;
            //if user already exists, error
            if (await utilities.userExists(email)) {
                response.status(400).send('User already exists');
            } else {
                await self.userdb.createUser(email, name);
                response.status(200).json({ status: 'success'});
            }
        });

        //READ STUFF HERE:
        //response will be JSON object representing all jobs 
        this.app.get('/jobs', async (request, response) => {
            const jobs = await self.jobdb.readAllJobs()
            response.status(200).json(jobs);
        });

        //response will be JSON object representing all users
        this.app.get('/users', async (request, response) => {
            const users = await self.userdb.readAllUsers();
            response.status(200).json(users);
        });

        //response will be JSON object specified jobs 
        this.app.get('/job/:jobId', async (request, response) => {
            const jobId = request.body.jobID;
            const job = await self.jobdb.readJob(jobId);
            response.status(200).json(job);
        });

        //response will be JSOn object specified user
        this.app.get('/user/:email', async (request, response) => {
            const email = request.body.email;
            const user = await self.userdb.readUser(email);
            response.status(200).json(user);
        });

        //used when searching for jobs
        //response will be JSON of all jobs that match search results
        this.app.get('/jobs/search/:text/:location/:date', async (request, response) => {
            const text = request.body.text;
            const location = request.body.location;
            const date = request.body.date;
            const result = self.jobdb.readAllJobs();
            if (location !== NULL) {
                //if location is "Both", then there is no need to filter
                if (location === "On-Campus" || location === "Off-Campus") {
                    result = result.filter((job) => job.location === location);
                }
            }
            if (text !== NULL) {
                result = result.filter((job) => { job.name.includes(text) });
            }
            //if date is more than month then there is no need to filter
            if (date !== NULL && date !== 'More than month') {
                let today = new Date().toLocaleDateString();
                let days;
                switch (date) {
                    case 'Past day': 
                        days = 1;
                        break;
                    case 'Past week':
                        days = 7;
                        break;
                    case 'Past 2 weeks':
                        days = 14;
                        break;
                    case 'Past month':
                        days = 31;
                        break;
                    default:
                        days = 365;
                        break;
                }
                result = result.filter((job) => {
                    let date = new Date(job.date); //not sure yet if job is saved as date or not
                    let difference = (today.getTime() - date.getTime()) / (1000 * 60 * 60 *24);
                    return difference <= days;
                });
            }
            response.status(200).json(result);
        }); 

        //UPDATE STUFF HERE:
        //specified user applys to specified job
        this.app.put('/user/:email/apply/:jobId', async (request, response) => {
            const { email, jobId } = request.body; 
            const user = await self.userdb.updateApplied(email, jobId);
            await self.jobdb.updateApplied(email, jobId);
            response.status(200).json(user);
        });

        //DELETE STUFF HERE:
        //deletes specified job
        this.app.delete('/job/delete/:jobId', async (request, response) => {
            const jobId = request.body.jobId;
            const result = await self.jobdb.deleteJob(jobId);
            response.status(200).json(result);
        });

        this.app.delete('/user/delete/:email', async (request, response) => {
            const email = request.body.email;
            const result = await self.userdb.deleteUser(email);
            response.status(200).json(result);
        });
    }

    async initDb() {
        this.userdb = new UserDatabase(this.dburl);
        this.jobdb = new JobDatabase(this.dburl);
        await this.db.connect();
    }

    async start() {
        await this.initRoutes();
        await this.initDb();
        const port = process.env.PORT || 8080;
        this.app.listen(port, () => {
            console.log(`JobBoardServer listening on port ${port}!`);
        });
    }

}

const server = new JobBoardDatabase(process.env.DATABASE_URL);
server.start();
