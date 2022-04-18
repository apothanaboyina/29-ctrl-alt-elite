//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

const search = document.getElementById("searchButton");
const goback = document.getElementById("backButton");

goback.addEventListener("click", () => {
    window.location.href = url + "/user/search";
});

//NOT DONE YET
search.addEventListener("click", () => {
    //add stuff here once we know how to perform search operation
    window.location.href = url + "/user/search";
});
