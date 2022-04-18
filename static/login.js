//this is not the official url but just example for now
const url = "https://ctrl-alt-elite-umass-job-board";
let currUrl = window.location.href;

const login = document.getElementById("loginButton");
const signup = document.getElementById("signUpButton");
if (currUrl.includes("user")) {
    login.addEventListener("click", () => {
        window.location.href = url + "/user/search"; //change this later?
    });
    //still need to do sign up
} else if (currUrl.includes("employer")) {
    login.addEventListener("click", () => {
        window.location.href = url + "/employer/homepage";
    });
    //still need to do sign up
}