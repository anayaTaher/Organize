const express = require("express");
const router = express.Router();
const userCopy = require("./Models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

router.post("/loginAuth", async (req, res) => {
  const { password, email } = req.body;
  try {
    const account = await userCopy.findOne({ email });
    if (!account)
      return res.status(404).json({ message: "User does not exist" });
    const isPasswordCorrect = await bcrypt.compare(password, account.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });
    const token = jwt.sign({ email, id: account._id }, "verysecret", {
      expiresIn: "12h",
    });
    console.log(token, email);
    const {accountPassword, ...userData} = account._doc;
    res.status(201).json({token, userData});
  } catch(error){
    console.log(error);
  }
});

router.post("/getName", async (req, res) => {
  try{
    const decodedData = jwt.verify(req.body.token, "verysecret");
    const user = await userCopy.findOne({email: decodedData.email});
    res.status(200).json({email: user.email});
    console.log(user.email);
  }
  catch (err){
    console.log(err);
  }
})

router.post("/getAccountData", async (req, res) => {
  try{
    const decodedData = jwt.verify(req.body.token, "verysecret");
    const account = await userCopy.findOne({ email: decodedData.email });
    res.json(account._doc);
  }
  catch (err){
    console.log(err);
  }
})

module.exports = router;
