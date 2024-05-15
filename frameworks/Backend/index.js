const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const app = express();
const schedule = require("node-schedule");
const completeDonations = require("./common/completeAllDonations.js");

require("dotenv").config();
//kjijo
const PORT = process.env.PORT || 8070;

app.use(credentials);

app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));

//admin routes
const adminRouter = require("./routes/admin/admin.routes");
app.use("/admin", adminRouter);

//Login routes
const loginRouter = require("./routes/login.js");
app.use("/login", loginRouter);

// Organization
const organizationRoutes = require("./routes/organization.routes");
app.use("/organization", organizationRoutes);

// Fund
const fundRoutes = require("./routes/fund.routes");
app.use("/fund", fundRoutes);

const donatorRoutes = require("./routes/donator/donator.routes.js");
app.use("/donator", donatorRoutes);

//requester
const requesterRoutes = require("./routes/requester.routes");
app.use("/requester", requesterRoutes);

const homeRoutes = require("./routes/home.routes");
app.use("/home", homeRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const URL =
  "mongodb+srv://node_Js_Server:102938Node@cluster0.eiackwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

completeDonations();

const job = schedule.scheduleJob("0 0 * * *", completeDonations);
