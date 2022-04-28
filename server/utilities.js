import { writeFile } from 'fs';
//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

export const usersFile = 'users.json';
export const jobsFile = 'jobs.json';


//UTILITY FUNCTIONS BELOW:
//gonna have to change the exists functions TODO
export async function userExists(email) { 
    const users = await readUsers();
    const result = users.filter((user) => user.email === email);
    return result.length > 0;
}

export async function jobExists(jobID) {
    const jobs = await readJobs();
    const result = jobs.filter((job) => job.jobID === jobID);
    return result.length > 0;
}

export function jobExists(jobID) {
    return jobID in jobs;
}

export function generateJobId() {
    let id = Math.floor(100000 + Math.random() * 900000);
    if (id in jobs) {
        generateJobId();
    }
    return id; 
}


export async function save(obj, file) {
    try {
        const data = JSON.stringify(obj);
        await writeFile(file, data, { encoding: 'utf8' })
    } catch (err) {
        console.log(err);
    }
}

//Create functions for reading from files
const readUsers = readFile(usersFile);
const readJobs = readFile(jobsFile);

//used to create a new user and add them to users file
export function saveUserToFile(path) {
    return async (email, name) => {
        const applied = [];
        const data = { email, name, applied };
        const users = await readUsers();
        users.push(data);
        writeFile(path, JSON.stringify(users), 'utf8');
    };
}

//used to create a new job and add them to jobs file
//not sure if we will need to use this yet
export function saveJobToFile(path) {
    return async (jobID, name, location, date, pay, hourlow, hourhigh, description) => {
        const applicants = [];
        const data = { jobID, name, location, date, pay, hourlow, hourhigh, description, applicants };
        const jobs = await readJobs();
        jobs.push(data);
        writeFile(path, JSON.stringify(jobs), 'utf8');
    };
}

//used when user applies to a job
//saves job to applied list for user and saves user to applicant list for job
export function saveApplicationToFile(userpath, jobpath) {
    return async (email, jobID) => {
        const users = await readUsers();
        const jobs = await readJobs();
        const userIndex = users.findIndex((user) => { user.email === email });
        const jobIndex = jobs.findIndex((job) => { job.jobID === jobID });
        users[userIndex].applied.push(jobID);
        jobs[jobIndex].applicants.push(email);
        writeFile(userpath, JSON.stringify(users), 'utf8');
        writeFile(jobpath, JSON.stringify(jobs), 'utf8');
    };
}

//Create functions for saving new users, jobs, and applications
const saveUser = saveUserToFile(usersFile);
const saveJob = saveJobToFile(jobsFile);
const saveApplication = saveApplicationToFile(usersFile, jobsFile);


export async function search(text, location, date) {
    let result = await readJobs();
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
    return result;
}
