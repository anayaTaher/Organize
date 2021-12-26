const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const signupUrls = require("./signup.route");
const projectRoutes = require("./project.route");
const contributorRouters = require("./contributor.route");
const teamRouters = require("./teams.route");
const cors = require("cors");
const flash = require("connect-flash");

dotenv.config();
mongoose.connect(
  process.env.DATABASE_ACCESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Database Successfully Connected")
);

app.get("");

app.use(flash());
app.use(express.json());
app.use(cors());
app.use("/", signupUrls);
app.use("/", projectRoutes);
app.use("/", contributorRouters)
app.use("/", teamRouters)
app.listen(4000, () => console.log("Server Is Listening On Port 4000..."));
