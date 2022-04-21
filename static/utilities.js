import { writeFile } from 'fs';
//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

export const users = {};
export const employers = {};
export const jobs = {};

export const usersFile = 'users.json';
export const employersFile = 'employers.json';
export const jobsFile = 'jobs.json';


//UTILITY FUNCTIONS BELOW:
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

export async function createEmployer(email, password, fname, lname) {
    

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
