import * as utilities from 'utilities.js';
//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

const search = document.getElementById("searchButton");
const readmore = document.getElementById("readButton");
const apply = document.getElementById("applyButton");
const searchbar = document.getElementById("searchbar");
const location = document.getElementById("location");
const date = document.getElementById("date");

search.addEventListener("click", doSearch);

readmore.addEventListener("click", () => {

});

apply.addEventListener("click", () => {

});

async function doSearch() {
    const searchRequest = await fetch('/jobs/search/:text/:location/:date');
    const searchResults = searchRequest.ok ? await searchRequest.json() : [];
    const jobsContainer = document.getElementById('jobsContainer');

    //clear page of previous results
    while (jobsContainer.childNodes.length > 0) {
        jobsContainer.removeChild(jobsContainer.lastChild);
    }

    //(jobID, name, location, date, pay, hourlow, hourhigh, description): 
    //(name, pay, hourlow, hourhigh, location, description)
    for (let i = 0; i < searchResults.length; i++) {
        const job = searchResults[i];
        displayJob(job.name, job.pay, job.hourlow, job.hourhigh, job.location, job.description);
    }
}

//in case search was started on different page
window.onload = function() {
    let sb = localStorage.getItem('searchbar');
    let l = localStorage.getItem('location');
    let d = localStorage.getItem('date');
    if (sb !== NULL) {
        searchbar.value = sb;
    }
    if (d !== NULL) {
        let index;
        switch (l) {
            case 'Past day': 
                index = 0;
                break;
            case 'Past week':
                index = 1;
                break;
            case 'Past 2 weeks':
                index = 2;
                break;
            case 'Past month':
                index = 3;
                break;
            case 'More than month':
                index = 4;
                break;
        }
        date.getElementsByTagName('option')[index].selected = true;
    }
    if (l !== NULL) {
        let index;
        switch (d) {
            case 'On-Campus':
                index = 0;
                break;
            case 'Off-Campus':
                index = 1;
                break;
            case 'Both':
                index = 2;
                break;
        }
        location.getElementsByTagName('option')[index].selected = true;   
    }
    doSearch();
    localStorage.clear();
}

function displayJob(name, pay, hourlow, hourhigh, location, description) {
    const container = document.createElement('div');
    container.classList.add('container');
    const title1 = document.createElement('h4');
    const description1 = document.createElement('p');
    const payrate = document.createElement('h6');
    const hours = document.createElement('h6');
    const loc = document.createElement('h6');
    const readButton = document.createElement('button');
    const applyButton = document.createElement('button');
    const br = document.createElement('br');

    readButton.classList.add('btn btn-primary');
    readButton.setAttribute('id', 'readButton');
    readButton.setAttribute('type', 'submit');
    applyButton.classList.add('btn btn-primary');
    applyButton.setAttribute('id', 'applyButton');
    applyButton.setAttribute('type', 'submit');
    title1.innerText = name;
    description1.innerText = description;
    payrate.innerText = '$' + pay + ' hourly pay rate';
    hours.innerText = hourlow + ' - ' + hourhigh;

    container.appendChild(title1);
    container.appendChild(description1);
    container.appendChild(payrate);
    container.appendChild(hours);
    container.appendChild(loc);
    
    const jobsContainer = document.getElementById('jobsContainer');
    jobsContainer.appendChild(container);
    jobsContainer.appendChild(br);
}
