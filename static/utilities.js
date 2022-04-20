import { writeFile } from 'fs';
//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

export const users = {};
export const employers = {};
export const jobs = {};

export const usersFile = 'users.json';
export const employersFile = 'employers.json';
export const jobsFile = 'jobs.json';

export async function createUser(response, userInfo) {
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

export async function createEmployer(response, employerInfo) {
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

export async function createJob(response, info) {
    let jobID = generateJobId(); //creates unique id
    jobs[jobID] = info;
    jobs[jobID].applicants = [];
    await save(jobs, jobsFile);
    employers[info.email].activeJobs.push(jobID);  //adds jobID to employer's active job array
    await save(employers, employersFile);
    response.json(jobs[jobID]);
}

export async function apply(response, user, jobID) {
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

export async function deleteJob(jobID) {

}

export function userExists(email) { 
    return email in users;
}

export function employerExists(email) {
    return email in employers;
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

export function search(text, location, date) {
    let result = jobs;
    if (location !== NULL) {
        //if location is "Both", then there is no need to filter
        if (location === "On-Campus" || location === "Off-Campus") {
            Object.keys(result).filter((e) => {
                return result[e].name === location;
            });
        }
    }
    if (text !== NULL) {
        Object.keys(result).filter((e) => {
            return result[e].name.includes(text);
        });
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
        Object.keys(result).filter((e) => {
            let date = new Date(result[e].date);
            let difference = (today.getTime() - date.getTime()) / (1000 * 60 * 60 *24);
            return difference <= days;
        });
    }
    return result;
    
}