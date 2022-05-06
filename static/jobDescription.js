//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";

const search = document.getElementById("searchButton");
const goback = document.getElementById("backButton");
const apply = document.getElementById("applyButton");

goback.addEventListener("click", () => {
    window.history.back();
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

//add stuff here to create text nodes to connect to main info, title, and description