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
    lifespan: "1907-1994",
    era: "modern",
    bio: "placeholder",
    nationality: "Irish/English",
    img: "placeholder",
    works: [
      {
        piece: "string quartet no.3",
        date: "1938",
        description:
          "The third of thirteen string quartets written by Maconchy.",
        recording: "https://www.youtube.com/watch?v=Z5dSGBWk8ek",
      },
      {
        piece: "Serenata concertante for violin and orchestra",
        date: "1962",
        description: "A piece for solo violin and orchestra.",
        recording: "https://www.youtube.com/watch?v=-mnxyOf-4O0",
      },
      {
        piece: "My Dark Heart",
        date: "1981",
        description:
          "Song cycle for soprano and chamber ensemble, with text by J.M. Synge.",
        recording: "https://www.youtube.com/watch?v=4MywZqES5qc",
      },
    ],
  },
  {
    name: "Marie-Juliette (Lili) Boulanger",
    lifespan: "1893-1918",
    era: "romantic",
    bio: "placeholder",
    nationality: "French",
    img: "placeholder",
    works: [
      {
        piece: "Les sirènes",
        date: "1911",
        description: "For solo soprano,three part choir, and piano.",
        recording: "https://www.youtube.com/watch?v=dt4hpEgMYNQ",
      },
      {
        piece: "Faust et Hélène",
        date: "1913",
        description:
          "Prix de Rome winning cantata for mezzo-soprano, tenor, baritone, chorus and orchestra.",
        recording: "https://www.youtube.com/watch?v=R2yhp5CWkNU",
      },
      {
        piece: "D'un soir triste",
        date: "placeholder",
        description: "Symphonic poem for orchestra.",
        recording: "https://www.youtube.com/watch?v=uYb3WMbzQpk",
      },
    ],
  },
  {
    name: "Fanny Mendelssohn",
    lifespan: "1805-1847",
    era: "early romantic",
    bio: "placeholder",
    nationality: "German",
    img: "placeholder",
    works: [
      {
        piece:
          "Sechs Lieder für eine Simme mit Begleitung des Pianoforte, Op.7",
        date: "1847",
        description: "Songs without words for the piano.",
        recording: "placeholder",
      },
      {
        piece: "Piano trio in D minor, Op. 11",
        date: "1850",
        description: "Published posthumously.",
        recording: "placeholder",
      },
      {
        piece: "Das Jahr: 12 Characterstucke No.12. December",
        date: "placeholder",
        description:
          "One of 12 piano pieces depicting the 12 months of the year.",
        recording: "placeholder",
      },
    ],
  },
  {
    name: "Sophie-Carmen Eckhardt-Gramatte",
    lifespan: "1899-1974",
    era: "modern",
    bio: "placeholder",
    nationality: "Russian/Canadian",
    img: "placeholder",
    works: [
      {
        piece: "Symphony No.1 in C major, E.117",
        date: "1946",
        description: "Eckhardt-Gramatte's first symphony.",
        recording: "placeholder",
      },
      {
        piece: "Le Départ D'un Train",
        date: "placeholder",
        description: "Caprice No.7 for solo violin.",
        recording:
          "https://soundcloud.com/fcreech59/sets/the-10-caprices-for-solo-violin-by-sc-eckhardt-gramatte",
      },
      {
        piece: "Duo for viola and cello",
        date: "1944",
        description: "E.109",
        recording: "1924",
      },
    ],
  },
  {
    name: "Clara Schumann",
    lifespan: "1819-1896",
    era: "romantic",
    bio: "placeholder",
    nationality: "German",
    img: "placeholder",
    works: [
      {
        piece: "Piano Concerto in A minor",
        date: "1836",
        description: "Op.7, for solo piano and orchestra.",
        recording: "placeholder",
      },
      {
        piece: "Piano Sonata in G minor",
        date: "1842",
        description:
          "Sonata for solo piano. Written 1841-1842 and published in 1991.",
        recording: "placeholder",
      },
      {
        piece: "Valses romantiques",
        date: "1835",
        description: "For piano.",
        recording: "placeholder",
      },
    ],
  },
  {
    name: "Barbara Strozzi",
    lifespan: "1619-1677",
    era: "baroque",
    bio: "placeholder",
    nationality: "Italian",
    img: "placeholder",
    works: [
      {
        piece: "Lagrime mie",
        date: "1659",
        description: "Cantata (lament).",
        recording: "https://www.youtube.com/watch?v=1z2xtmkqaAs",
      },
      {
        piece: "Se volete cosi me ne contento.",
        date: "placeholder",
        description: "For soprano and basso continuo.",
        recording: "https://www.youtube.com/watch?v=NW7E0vVNrt8",
      },
    ],
  },
  {
    name: "Francesca Caccini",
    lifespan: "1587-1640",
    era: "baroque",
    bio: "placeholder",
    nationality: "Italian",
    img: "placeholder",
    works: [
      {
        piece: "Chi desia di saper",
        date: "1618",
        description: "For voice and continuo.",
        recording: "https://www.youtube.com/watch?v=Z39HqtdNgzM",
      },
      {
        piece: "Rinaldo inamorato",
        date: "1626",
        description: "Commissioned by Prince Wladislaw of Poland.",
        recording: "placeholder",
      },
      {
        piece: "La liberazione di Ruggiero dall'isola d'Alcina",
        date: "1625",
        description: "Musical comedy",
        recording:
          "https://www.youtube.com/watch?v=KQAXxKcfook&list=OLAK5uy_mlQfaGeOKRBI7ybxbKT6OZ--XRgfFkoSc",
      },
    ],
  },
  {
    name: "Elisabeth Jacquet de La Guerre",
    lifespan: "1665-1729",
    era: "baroque",
    bio: "placeholder",
    nationality: "French",
    img: "placeholder",
    works: [
      {
        piece: "Suite in A minor",
        date: "1687",
        description: "from les pièces de clavessin",
        recording: "https://www.youtube.com/watch?v=_wYhLVX5kPQ",
      },
      {
        piece: "Sonata in D minor",
        date: "1695",
        description: "for violin, viola da gamba and basso continuo",
        recording: "https://www.youtube.com/watch?v=S49vjzhfNeQ",
      },
      {
        piece: "Le Sommeil d'Ulysse",
        date: "1715",
        description: "cantata for soprano, flute, strings and harpsichord",
        recording: "https://www.youtube.com/watch?v=X2YFrXO0l_g",
      },
    ],
  },
  {
    name: "Hildegard von Bingen",
    lifespan: "1098-1179",
    era: "medieval",
    bio: "placeholder",
    nationality: "German",
    img: "placeholder",
    works: [
      {
        piece: "Ordo Virtutum",
        date: "~1151",
        description: "'play of the virtues': a morality play",
        recording: "https://www.youtube.com/watch?v=f1sJ91rS0o0",
      },
      {
        piece: "O viridissima virga",
        date: "unknown",
        description: "vocal composition, text also by Hildegard",
        recording: "https://www.youtube.com/watch?v=LsL9H5tVPjw",
      },
      {
        piece: "De Sancta Maria",
        date: "unknown",
        description: "responsorio",
        recording: "https://www.youtube.com/watch?v=S_8Px_05Oxw",
      },
    ],
  },
  {
    name: "Valerie Coleman",
    lifespan: "1970-present",
    era: "modern",
    bio: "placeholder",
    nationality: "American",
    img: "placeholder",
    works: [
      {
        piece: "Seven O'Clock Shout",
        date: "2020",
        description: "for orchestra",
        recording: "https://www.youtube.com/watch?v=k3vO2xNxA8w",
      },
      {
        piece: "Umoja",
        date: "2001",
        description: "piece for wind quintet",
        recording: "https://www.youtube.com/watch?v=23Yx9gWHh0E",
      },
      {
        piece: "Red Clay and Mississippi Delta",
        date: "2009",
        description: "wind quintet",
        recording: "https://www.youtube.com/watch?v=ai6AFMV9S4Y",
      },
    ],
  },
];

// GET requests

app.get("/composers", (req, res) => {
  res.status(200).json(topComposers);
});

app.get("/", (req, res) => {
  res.send("Women are great composers!");
});

app.get("/composers/:name", (req, res) => {
  const { name } = req.params;
  const composer = topComposers.find((composer) => composer.name === name);
  console.log(name);

  if (composer) {
    res.status(200).json(composer);
  } else {
    res.status(400).send("composer not found");
  }
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
