import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class UserDatabase {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1,
        });
        // Get the database.
        this.db = this.client.db('users');
        // Init the database.
        await this.init();
    }

    async init() {
        this.collection = this.db.collection('users');
        const count = await this.collection.countDocuments();
        if (count === 0) {
          await this.collection.insertMany([
            { 
                _id: 1, name: 'Amanda Katt', 
                email: 'akatt@umass.edu', applied: []
            },
            { 
                _id: 2, name: 'John Smith', 
                email: 'jsmith@umass.edu', applied: [] 
            },
            {
                _id: 3, name: 'Jane Doe',
                email: 'jdoe@umass.edu', applied: []
            }
          ]);
        }
    }
    
    // Close the pool.
    async close() {
        this.client.close();
    }

    async createUser(name, email) {
        const res = await this.collection.insertOne({ 
            'name': name, 
            'email': email, 
            'applied': [] 
        });
        return res;
    }

    async deleteUser(email) {
        const res = await this.collection.deleteOne({ email: email });
        return res;
    }

    async readUser(email) {
        const res = await this.collection.findOne({ email: email });
        return res;
    }

    async updateApplied(email, jobId) {
        const res = await this.collection.updateOne(
            { email: email },
            { $push: { applied: jobId }}
        );
        return res;
    }

    async deleteApplied(email, jobId) {
        const res = await this.collection.deleteOne(
            { email: email },
            { $pull: { applied: jobId } }
        );
        return res;
    }

    async readAllUsers() {
        const res = await this.collection.find({}).toArray();
        return res;
    }
}

export class JobDatabase {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverApi: ServerApiVersion.v1,
        });
        // Get the database.
        this.db = this.client.db('jobs');
        // Init the database.
        await this.init();
    }

    async init() {
        this.collection = this.db.collection('jobs');
        const count = await this.collection.countDocuments();
        if (count === 0) {
            await this.collection.insertMany([
                {
                    _id: 0, name: 'Dishwasher', pay: 13, hourlow: 10, hourhigh: 20, location: 'On-Campus', 
                    description: 'Do you want flexible hours, and a free meal with every shift? Then this might be the job for you.',
                    applicants: [], date: new Date("2022-05-07")   
                },
                {
                    _id: 1, name: 'Dog Walker', pay: 12, hourlow: 5, hourhigh: 25, location: 'Off-Campus',
                    description: 'Need a part time gig where you are surrounded by dogs? Join our team of dog walkers today!',
                    applicants: [], date: new Date("2022-05-01")
                },
                {
                    _id: 2, name: 'IT Desk Intern', pay: 20, hourlow: 20, hourhigh: 24, location: 'On-Campus',
                    description: 'If you are looking for a summer internship and are a Computer Science major?',
                    applicants: [], date: new Date("2021-10-13")
                },
                {
                    _id: 3, name: 'Cafe Cashier', pay: 12.5, hourlow: 12, hourhigh: 20, location: 'Off-Campus',
                    description: 'Open cashier positions at a local cafe. Email for more information.',
                    applicants: [], date: new Date("2022-01-01")
                },
                {
                    _id: 4, name: 'Communications Intern', pay: 18, hourlow: 30, hourhigh: 40, location: 'Off-Campus',
                    description: 'Our company is currently looking for a full time intern for the summer who is a Communications major.',
                    applicants: [], date: new Date("2022-04-10")
                },
                {
                    _id: 5, name: 'Campus-Store Cashier', pay: 10, hourlow: 5, hourhigh: 10, location: 'On-Campus',
                    description: 'If you are interesting in working a retail position on campus, this might be the job for you!',
                    applicants: [], date: new Date("2020-09-01")
                }
            ]);
        }
    }
    
    // Close the pool.
    async close() {
        this.client.close();
    }

    async createJob(name, date, pay, hourlow, hourhigh, location, description) {
        const res = await this.collection.insertOne({ 
            "name": name,
            "date": date,
            "pay": pay,
            "hourslow": hourlow, 
            "hourshigh": hourhigh, 
            "location": location,
            "description": description
        });
        return res;
    }

    async deleteJob(jobId) {
        const res = await this.collection.deleteOne({ _id: jobId });
        return res;
    }

    async readJob(jobId) {
        const res = await this.collection.findOne({ _id: jobId });
        return res;
    }

    async updateApplied(applicant, jobId) {
        const res = await this.collection.updateOne(
            { _id: jobId },
            { $push: { applicants: applicant } }
        );
        return res;
    }

    async deleteApplied(applicant, jobId) {
        const res = await this.collection.deleteOne(
            { _id: jobId },
            { $pull: { applicants: applicant } }
        );
        return res;
    }

    async readAllJobs() {
        const res = await this.collection.find({}).toArray();
        return res;
    }
}
