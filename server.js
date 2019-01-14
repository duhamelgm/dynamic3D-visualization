const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const keys = require("./config/keys");

const app = express();

// Body Parser middleware
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json({ limit: "5mb" }));

// DB Config
const db = keys.mongoURI;
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

// Passport middleware

app.use(passport.initialize());

// Passport config

require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
