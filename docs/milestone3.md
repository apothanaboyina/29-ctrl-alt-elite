# ctrl-alt-elite

# UMass Job Board

# Team Overview

* Aditya Pothanaboyina: apothanaboyina
* Amanda Katt: akatt1221

# Innovative Idea

We would like to create a web application similar to that of the UMass Student Job Board. The current web page for the Student Job Board allows for viewers to gain information about the jobs being posted and apply using the email listed in the job descriptions. We believe that the UI of the application could be improved, as well as authenticating viewers so that students can use their umass information to login and apply directly through the application. This will allow for students to apply for more jobs efficiently without having to individually emailing the employers. As a result, students will be able to increase their chances in gaining employment without having to spend a lot of time on applications.

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
* /user/login: logs user profiles in
* /employer/login: logs employer profiles in
* /user/create/:email/:name : creates new user
* /employer/create/:email/:name : creates new employer
* /employer/job/create/:email/:name/:location/:date : creates new job
* /jobs : response will be JSON object representing all jobs
* /users : response will be JSON object representing all users
* /employers: response will be JSON object representing all employers
* /employer/job/:jobID: response will be JSON object of specified job
* /employer/:email: response will be JSON object of specified employer
* /user/:email: response will be JSON object of specified user
* /user/:email/apply/:jobID : Specified user applies to specified job. Adds jobID to list of applied jobs for user, adds email to list of applicants for specific jobs
* /employer/jobs/delete/:jobID: deletes specified job
* /employer/delete/:email : deletes specified employer
* /user/delete/:email : deletes specified user

# Work Distribution
* Amanda:

* Aditya: