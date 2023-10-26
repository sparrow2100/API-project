const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();

//create a write stream

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

//set up the logger

app.use(morgan("combined", { stream: accessLogStream }));

//serve documentation.html from the public folder

app.use(express.static("public"));

//composers array

let topComposers = [
  {
    name: "Elizabeth Maconchy",
    years: "1907-1994",
  },
  {
    name: "Marie-Juliette (Lili) Boulanger",
    years: "1893-1918",
  },
  {
    name: "Fanny Mendelssohn",
    years: "1805-1847",
  },
  {
    name: "Sophie-Carmen Eckhardt-Gramatte",
    years: "1899-1974",
  },
  {
    name: "Clara Schumann",
    years: "1819-1896",
  },
  {
    name: "Barbara Strozzi",
    years: "1619-1677",
  },
  {
    name: "Francesca Caccini",
    years: "1587-1640",
  },
  {
    name: "Elisabeth Jacquet de La Guerre",
    years: "1665-1729",
  },
  {
    name: "Hildegard von Bingen",
    years: "1098-1179",
  },
  {
    name: "Valerie Coleman",
    years: "1970-present",
  },
];

// GET requests

app.get("/composers", (req, res) => {
  res.json(topComposers);
});

app.get("/", (req, res) => {
  res.send("Women are great composers!");
});

// error handling

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests

app.listen(8080, () => {
  console.log("Your app is listening on port 8080");
});
