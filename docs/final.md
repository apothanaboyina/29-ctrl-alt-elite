# ctrl-alt-elite

# UMass Job Board

# Spring 2022

# Team Overview

* Aditya Pothanaboyina: apothanaboyina
* Amanda Katt: akatt1221

# Overview

We would like to create a web application similar to that of the UMass Student Job Board. The current web page for the Student Job Board allows for viewers to gain information about the jobs being posted and apply using the email listed in the job descriptions. We believe that the UI of the application could be improved, as well as authenticating viewers so that students can use their umass information to login and apply directly through the application. This will allow for students to apply for more jobs efficiently without having to individually emailing the employers. As a result, students will be able to increase their chances in gaining employment without having to spend a lot of time on applications.


# User Interface


# API Endpoints:
* /login: logs user profiles in
* /logout: logs user profiles out
* /user/create/:email/:name : creates new user
* /jobs : response will be JSON object representing all jobs
* /users : response will be JSON object representing all users
* /user/:email: response will be JSON object of specified user
* /job/:jobId: response will be JSON object of specified job
* /jobs/search/:text/:location/:date : response will wil be JSON of all jobs that match search results
* /user/:email/apply/:jobID : Specified user applies to specified job. Adds jobID to list of applied jobs for user, adds email to list of applicants for specific jobs
* /user/delete/:email : deletes specified user
* /job/delete/:jobId: deletes specified job

# Database

We used MongoDB for our database.

# URL Routes



# Authentication / Authorization

Users will log into the application using an email and password. The only UI accessible without logging in is the login page itself. In order to use the userInterface, search, or jobDescription UIs you must be logged in.

# Work Distribution
* Amanda:

* Aditya:


# Conclusion

Our group has had quite a lot of setbacks. We originally designed the project for 4 people, and didn't realize until later in doing the project that we bit off more than we could chew, especially when it was clear that the group was only 2 people. Our third member did not contribute to milestone 1 or milestone 2 when we split up the work, and so we had to cut many of the features. We originally had planned to have an employer interface as well and spent more time than we should have trying to make that work, only to delete it. 

We learned a lot about from end design and implementation in doing this project, as our big goal in doing this project was to make a better interface for the student job board. We learned about how to interact with HTML through javascript coding and use elements in javascript coding.

Our group struggled a lot on our back end and were not able to get our heroku deployment working. I think that if our group had a more solid grip on back end work we would have been more successful. I think we struggled with understanding the amount of work each step in building a website takes, so I think it would have made us more successful knowing that.
