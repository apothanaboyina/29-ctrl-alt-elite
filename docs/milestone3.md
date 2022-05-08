# ctrl-alt-elite

# UMass Job Board

# Database

We had 2 databases in our application. There is a user database, which contains information about the users/students. There is also a job database which contains information about the jobs and their specifics. Example documents for both databases are included below.

User Document
{
    id: <ObjectID>
    Name: String, //The name of the user
    email: String, //User email
    applied: Array //contains an array of the jobs the user applied for
}

Job Document
{
    id: <ObjectID>
    Name: String, //Job Name
    date: Date //Date Posted
    pay: Integer //Hourly Pay
    hourlow: Integer //Minimum Hours per week
    hourhigh: Integer //Maximum hours per week
    location: String //On or off campus
    description: String //Job description
    applicants: Array //An Array of applicant job ids
}

# Division of Labor

* Amanda:
    creating MongoDB databases including the UserDatabase and the JobDatabase
    updating the server to make JobBoardServer class
    updating javascript in static folder to match updated server

* Aditya:
    Deployed
