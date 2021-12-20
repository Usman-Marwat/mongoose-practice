const mongoose = require("mongoose");
const User = require("./Users");

mongoose.connect("mongodb://localhost:27017/testdb");

// run();
async function run() {
  try {
    const user = new User({
      name: "Khan",
      age: 10,
      email: "usMan@mAil.com",
      hobbies: ["Weight lifting", "Bowling"],
      address: {
        street: "main street New York",
      },
    });
    // user.createdAt = 5;
    await user.save();
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
}
// up();
async function up() {
  try {
    const user = await User.findById("61b7825979fc31837f58d98f");
    user.name = "khan";
    await user.save();
    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

// finding();
async function finding() {
  const user = await User.exists({ name: "khan" });
  console.log(user);
  const user2 = await User.find({ name: "khan" });
  console.log(user2);
  const user3 = await User.deleteOne({ _id: "61b77ccbf5372a76d76ff251" });
  console.log(user3); //shows the deleted count
  const user4 = await User.where("age")
    .gt(7)
    .lt(20)
    .where("name")
    .equals("Khan")
    .limit(2)
    .select(["age", "name"]);

  console.log(user4);
}

// populating();
async function populating() {
  const user = await User.where("age")
    .gt(7)
    .lt(20)
    .where("name")
    .equals("Khan")
    .populate("bestFriend");
  // user[0].bestFriend = "61b78c85ddc7ddbc429e0475";
  // await user[0].save();

  console.log(user);
  // console.log(user[0].bestFriend.hobbies);
}

//Mapping of the this keyword
const obj = {
  name: "Usman",
  login: function () {
    console.log(this.name);
  },
};

//This also does not work with arrow function
const obj2 = {
  name: "Usman",
  login: function (callback) {
    callback(this.name);
  },
  login2: (callback) => {
    callback(this.name);
  },
};

// obj.login();

obj2.login((name) => console.log(name));
obj2.login2((name) => console.log(name));
