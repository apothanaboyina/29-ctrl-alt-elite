import * as utilities from 'utilities.js';
//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

const search = document.getElementById("searchButton");

search.addEventListener("click", () => {
    const searchbar = document.getElementById("searchbar");
    const location = document.getElementById("location");
    const date = document.getElementById("date");
    localStorage.setItem('searchbar', searchbar);
    localStorage.setItem('location', location);
    localStorage.setItem('date', date);
    window.location.href = url + "/user/search";
});

//gets current user email from url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const userEmail = params.email;
const fetchString = '/user/?email=' + userEmail;
const userRequest = await fetch(fetchString);
const userData = userRequest.ok ? await userRequest.json() : [];

function displayAppliedJobs() {
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