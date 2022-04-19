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

function doSearch() {
    const searchResults = utilities.search(searchbar.value, location.value, date.value);
    //going to have to do something here where we input html code by container
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