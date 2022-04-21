//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

const view = document.getElementById("view");
const edit = document.getElementById("edit");
const post = document.getElementById("post");


post.addEventListener("click", () => {
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");
    const rate = document.getElementById("rate");
    const hours = document.getElementById("hours");
    const location = document.getElementById("location");

    

});

view.addEventListener("click", () => {
    window.location.href = url + '/employer/:jobID/applicants'
});