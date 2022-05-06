import * as utilities from 'utilities.js';
//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

const searchbar = document.getElementById("searchbar");
const search = document.getElementById("searchButton");
const location = document.getElementById("location");
const date = document.getElementById("date");

//gets current user email from url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const userEmail = params.email;
const fetchString = '/user/?email=' + userEmail;
const userRequest = await fetch(fetchString);
const userData = userRequest.ok ? await userRequest.json() : [];

function displayAppliedJobs() {
    //<li class="list-group-item">Vestibulum at eros</li>
    const jobList = document.getElementById('appliedList');
    const jobs = userData.applied;
    for (let i = 0; i < jobs.length; i++) {
        let jname = utilities.getJobName(jobs[i]);
        const thisJob = document.createElement('li');
        thisJob.classList.add("list-group-item");
        thisJob.innerText = jname;
        jobList.appendChild(thisJob);
    }
}

function displayUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const name = document.createElement('h5');
    const email = document.createElement('h5');
    name.innerText = userData.name;
    email.innerText = userEmail;
    userInfo.appendChild(name);
    userInfo.appendChild(email);
}

displayAppliedJobs();
displayUserInfo();