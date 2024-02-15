const mongoose = require("mongoose");
const Models = require("./models.js");
const Composers = Models.Composer;
const Eras = Models.Era;
const Users = Models.User;
// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const path = require("path");
const app = express();
const { check, validationResult } = require("express-validator");

//create a write stream

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

//set up the logger

app.use(morgan("combined", { stream: accessLogStream }));

//serve documentation.html from the public folder

app.use(express.static("public"));

app.use(bodyParser.json());

const cors = require("cors");
let allowedOrigins = [
  "http://localhost:1234",
  "https://women-composers.netlify.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

let auth = require("./auth")(app);

const passport = require("passport");
require("./passport");

app.post(
  "/users",
  [
    check("username", "Username is required").isLength({ min: 5 }),
    check(
      "username",
      "Username contains non-alphanumeric characters: not allowed."
    ).isAlphanumeric(),
    check("password", "Password is required.").not().isEmpty(),
    check("email", "Email does not appear to be validated.").isEmail(),
  ],
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.password);
    await Users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.username + "already exists.");
        } else {
          Users.create({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            birthday: req.body.birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//CREATE favourite composer

app.post(
  "/users/:username/favouriteComposers/:composerId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.username !== req.params.username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate(
      { username: req.params.username },
      { $push: { favouriteComposers: req.params.composerId } },
      { new: true }
    )
      .then((updatedUser) => {
        res.status(201).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//DELETE favourite composer

app.delete(
  "/users/:username/favouriteComposers/:composerId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.username !== req.params.username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { favouriteComposers: req.params.composerId } },
      { new: true }
    )
      .then((updatedUser) => {
        res.status(201).json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//Delete a user by username
app.delete(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.username !== req.params.username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndDelete({ username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + " was not found");
        } else {
          res.status(200).send(req.params.username + " was deleted.");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

//update user info by username

app.put(
  "/users/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.username !== req.params.username) {
      return res.status(400).send("Permission denied");
    }
    await Users.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: req.body.birthday,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// GET requests (READ)

app.get("/", (req, res) => {
  res.send("Women are great composers!");
});

//get all composers

app.get(
  "/composers",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Composers.find()
      .then((composers) => {
        res.status(200).json(composers);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//get all users
app.get("/users", async (req, res) => {
  await Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET data about a composer by her name

app.get(
  "/composers/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Composers.findOne({ name: req.params.name })
      .then((composer) => {
        if (composer) {
          res.status(200).json(composer);
        } else {
          res.status(404).send("composer not found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send("Error: " + err);
      });
  }
);

//get info about all eras

app.get(
  "/eras",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Eras.find()
      .then((era) => {
        res.status(200).json(era);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//get info about an era by name
app.get(
  "/eras/:name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Eras.findOne({ name: req.params.name })
      .then((era) => {
        if (era) {
          res.status(200).json(era);
        } else {
          res.status(404).send("Era not found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// error handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("Your app is listening on port " + port);
});
