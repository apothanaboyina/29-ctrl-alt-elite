# UMass Job Board

# Spring 2022

# Team Overview

* Aditya Pothanaboyina: apothanaboyina
* Amanda Katt: akatt1221

# Overview
# Innovative Idea

We would like to create a web application similar to that of the UMass Student Job Board. The current web page for the Student Job Board allows for viewers to gain information about the jobs being posted and apply using the email listed in the job descriptions. We believe that the UI of the application could be improved, as well as authenticating viewers so that students can use their umass information to login and apply directly through the application. This will allow for students to apply for more jobs efficiently without having to individually emailing the employers. As a result, students will be able to increase their chances in gaining employment without having to spend a lot of time on applications.


# User Interface

Our user interface has 3 main components. Firstly, the search bar will be available to search for jobs based on filters. Next, the left half of the screen is dedicated to showing the user their application history, to provide information about application status so that users can act quickly. On the right half of the screen, the information about the users will be shown, and users can view and edit their information.

# Important Data

* Login for applicants
    * This allows for applicants to maintain a profile as well as ensure that only UMass students/staff are applying to jobs
* Jobs being posted
    * Allowing employers to post various jobs within their profiles allows for easy access to see which applicants applied for which job
* A personal user profile that contains resume, cover letter, etc
    * With a user profile, applicants can personalize their profile to showcase their strengths and skills through uploading documents as well as editing their profile.
* Number of applicants for a particular job(for employers)
    * Allows for employers to easily review applicants and their profiles as opposed to checking emails for application
* History of jobs applicant has previously applied to(for candidates)
    * Allows for applicants to quickly check on the status of their application if they have multiple applications.

# Objects:
* User
    * Email
    * Password
    * Name
    * Resume
    * List of Jobs applied
* Job
    * jobID   //6 digit unique number randomly generated to represent specific job
    * Email //email of employer who created
    * Name
    * Location
    * Date created
    * List of applicants*

# API Endpoints:
* /login: logs user profiles in
@@ -29,29 +51,9 @@ We would like to create a web application similar to that of the UMass Student J
* /user/:email/apply/:jobID : Specified user applies to specified job. Adds jobID to list of applied jobs for user, adds email to list of applicants for specific jobs
* /user/delete/:email : deletes specified user
* /job/delete/:jobId: deletes specified job

# Database

We used MongoDB for our database.

# URL Routes



# Authentication / Authorization

Users will log into the application using an email and password. The only UI accessible without logging in is the login page itself. In order to use the userInterface, search, or jobDescription UIs you must be logged in.
* 

# Work Distribution
* Amanda:
   * Created wireframs and html/css for search page and login page
   * created jobDescription html and css
   * created index.html and index.css
   * initialized server.js
   * api endpoints
   * crud functions
   * routes to html pages
   * created js files for all of the pages and havily worked on search.js, login.js, index.js and jobDescription.js
   * creating MongoDB databases including the User Database and the Job Database 
   * updating the server to make JobBoardServer class
   * updating javascript in static foler to match updated server

* Aditya:
   * Created wireframs and html/css files for employer interface and applicant pages
   * worked on applicants.js and emplyoerinterface.hs on emplyoer side
   * created crud operations for jobs
   * created milestone2 markdonw file
   * heroku deployment


# Conclusion

Our group has had quite a lot of setbacks. We originally designed the project for 4 people, and didn't realize until later in doing the project that we bit off more than we could chew, especially when it was clear that the group was only 2 people. Our third member did not contribute to milestone 1 or milestone 2 when we split up the work, and so we had to cut many of the features. We originally had planned to have an employer interface as well and spent more time than we should have trying to make that work, only to delete it. 

We learned a lot about from end design and implementation in doing this project, as our big goal in doing this project was to make a better interface for the student job board. We learned about how to interact with HTML through javascript coding and use elements in javascript coding.

Our group struggled a lot on our back end and were not able to get our heroku deployment working. I think that if our group had a more solid grip on back end work we would have been more successful. I think we struggled with understanding the amount of work each step in building a website takes, so I think it would have made us more successful knowing that.
