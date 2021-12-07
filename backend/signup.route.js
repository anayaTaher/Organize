const express = require("express");
const router = express.Router();
const userCopy = require("./users.model");
const bcrypt = require("bcrypt");

router.post("/login", async (request, response) => {
  let returnValue = 0;

  userCopy
    .find({}, async (err, users) => {
      for (const user of users) {
        if (user["email"] === request.body["email"]) {
          returnValue = 1;
          bcrypt
            .compare(request.body.password, user["password"])
            .then((res) => {
              if (res) {
                returnValue = 2;
              }
            });
        }
      }
    })
    .then((_) => {
      response.json(returnValue);
    });
});

router.post("/signup", async (request, response) => {
  if (request.body.hasOwnProperty("check")) {
    let returnValue = 1;

    userCopy
      .find({}, (err, users) => {
        users.forEach((user) => {
          if (user["email"] === request.body["email"]) {
            returnValue = 0;
          }
        });
      })
      .then((_) => {
        response.json(returnValue);
      });
  } else {
    const securePassword = await bcrypt.hash(request.body.password, 10);

    const newUser = new userCopy({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      username: request.body.username,
      email: request.body.email,
      password: securePassword,
    });

    newUser
      .save()
      .then((data) => response.json(data))
      .catch((err) => response.json(err));
  }
});

module.exports = router;
