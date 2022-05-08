//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

const search = document.getElementById("searchButton");
const goback = document.getElementById("backButton");
const apply = document.getElementById("applyButton");

//gets current job from url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const jobId = params.jobId;
const fetchString = '/job/?jobId=' + jobId;
const jobRequest = await fetch(fetchString);
const jobData = jobRequest.ok ? await jobRequest.json() : [];

goback.addEventListener("click", () => {
    window.history.back();
});

apply.addEventListener("click", () => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}
    };
    //need to add more stuff here
});

search.addEventListener("click", () => {
    const searchbar = document.getElementById("searchbar");
    const location = document.getElementById("location");
    const date = document.getElementById("date");
    localStorage.setItem('searchbar', searchbar);
    localStorage.setItem('location', location);
    localStorage.setItem('date', date);
    window.location.href = url + "/user/search";
});

function displayJob() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    
    const locationmain = document.getElementById('locationmain');
    const hourslowmain = document.getElementById('hourslowmain');
    const hourshighmain = document.getElementById('hourshighmain');
    const ratemain = document.getElementById('ratemain');
    const datemain = document.getElementById('datemain');

    title.innerText = jobData.name;
    description.innerText = jobData.description;

    locationmain.innerText = 'Location: ' + jobData.location;
    hourslowmain.innerText = jobData.hourslow;
    hourshighmain.innerText = jobData.hourshigh;
    ratemain.innerText = 'Hourly Pay Rate: ' + jobData.pay;
    datemain.innerText = 'Date Posted: ' + jobData.date;
}

displayJob();