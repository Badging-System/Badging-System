const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();


module.exports = {
  seedUsers: seedUsers
}

//seed our db
function seedUsers(callback) {
  const usersForTeam = [{
      Username: "bobbo",
      First_name: "Bob",
      Last_name: "Smith",
      Status: "User",
      Email: "bob@gmail.com"
    },
    {
      Username: "msrober",
      First_name: "Mitchell",
      Last_name: "Roberts",
      Status: "User",
      Email: "msrober@gmail.com"
    },
    {
      Username: "gdeshpande",
      First_name: "Gaurav",
      Last_name: "Deshpande",
      Status: "User",
      Email: "gdeshpande@gmail.com"
    },
    {
      Username: "dmaitha",
      First_name: "David",
      Last_name: "Maitha",
      Status: "User",
      Email: "dmaitha@gmail.com"
    },
    {
      Username: "rtonthat",
      First_name: "Ryan",
      Last_name: "Tonthat",
      Status: "User",
      Email: "rtonthat@gmail.com"
    },
    {
      Username: "hzhou",
      First_name: "Hongyuan",
      Last_name: "Zhou",
      Status: "User",
      Email: "hzhou@gmail.com"
    }
  ];

  return new Promise(function(resolve, reject) {
    mongoose.connect(process.env.HOST + process.env.DBNAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      if (process.env.ENV === 'DEV') {
        //use User model to insert/save
        User.deleteMany({}, () => {
          for (user of usersForTeam) {
            let newUser = new User(user);
            newUser.save();
          }
          resolve('Database has been seeded!'); // seeded
        });
      } else if (process.env.ENV === 'PROD') {
        reject('Database has not been seeded!');
      }
    });

    mongoose.Promise = global.Promise;
    mongoose.connection.on("error", error => {
      console.log('Problem connection to the database' + error);
    });
  });

}
