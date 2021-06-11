require("dotenv").config();
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const flash = require("express-flash");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDbStore = require("connect-mongo");
const app = express();

const port = process.env.PORT || 3000;

// Data base connection
const url = "mongodb://localhost:27017/pizza";
mongoose
  .connect(url, {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established successfully");
  })
  .catch((err) => {
    console.log(err);
  });
// session store
// let mongoStore = new MongoDbStore({
//   mongooseConnection: mongoose.connection,
//   collection: "sessions",
// });

//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({ mongoUrl: url }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24hours
    // cookie: { maxAge: 1000 * 15 },
  })
);
app.use(flash());
// global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(port, () => {
  console.log(`server is running at ${port} ...`);
});
