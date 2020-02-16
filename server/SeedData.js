
const user_data = [{
    Username: "bobbo",
    First_name: "Bob",
    Last_name: "Smith",
    Role: "User",
    Active: true,
    Email: "bob@gmail.com"
  },
  {
    Username: "msrober",
    First_name: "Mitchell",
    Last_name: "Roberts",
    Role: "User",
    Active: true,
    Email: "msrober@gmail.com"
  },
  {
    Username: "gdeshpande",
    First_name: "Gaurav",
    Last_name: "Deshpande",
    Role: "User",
    Active: true,
    Email: "gdeshpande@gmail.com"
  },
  {
    Username: "dmaitha",
    First_name: "David",
    Last_name: "Maitha",
    Role: "User",
    Active: true,
    Email: "dmaitha@gmail.com"
  },
  {
    Username: "rtonthat",
    First_name: "Ryan",
    Last_name: "Tonthat",
    Role: "User",
    Active: true,
    Email: "rtonthat@gmail.com"
  },
  {
    Username: "hzhou",
    First_name: "Hongyuan",
    Last_name: "Zhou",
    Role: "User",
    Active: true,
    Email: "hzhou@gmail.com"
  }
];

const team_data = [{
    Name: "Paw Patrol",
    Coach: "Alex",
    Admin: "Smith",
    Badges: ['Badge 1', 'Badge 2', 'Badge 3'],
    Memebers: user_data
  },
  {
    Name: "Power Rangers",
    Coach: "Mitchell",
    Admin: "Smith",
    Badges: ['Badge 1', 'Badge 2', 'Badge 3'],
    Memebers: user_data
  },
  {
    Name: "Power Puff Girls",
    Coach: "Gaurav",
    Admin: "Smith",
    Badges: ['Badge 1', 'Badge 2', 'Badge 3'],
    Memebers: user_data
  },
  {
    Name: "Edward",
    Coach: "David",
    Admin: "Smith",
    Badges: ['Badge 1', 'Badge 2', 'Badge 3'],
    Memebers: user_data
  }
];

module.exports.user_data = user_data;
module.exports.team_data = team_data;