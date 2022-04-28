//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

document.getElementById("userButton").addEventListener("click", () => {
    window.location.href = url + '/user/login';
});

document.getElementById("employerButton").addEventListener("click", () => {
    window.location.href = url + '/employer/login';
});