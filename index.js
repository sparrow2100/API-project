const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
const uuid = require("uuid");
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

app.use(bodyParser.json());

//composers array

let topComposers = [
  {
    name: "Elizabeth Maconchy",
    life: {
      fullName: "Elizabeth Maconchy",
      lifespan: "1907-1994",
      bio: "placeholder",
      nationality: "Irish/English",
    },
    era: {
      name: "modern",
      description:
        "The modern era in classical music, roughly from the late 19th to the mid-20th century, witnessed a departure from traditional tonal structures and the exploration of dissonance. Composers during this period experimented with new forms, tonalities, and embraced diverse musical styles, reflecting the societal and technological shifts of the time.",
    },

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
    name: "Lili Boulanger",
    life: {
      fullName: "Lili Boulanger",
      lifespan: "1893-1918",
      bio: "placeholder",
      nationality: "French",
    },

    era: {
      name: "romantic",
      description:
        "The romantic era in classical music, spanning roughly the 19th century, unfolded as a passionate and emotive symphony of individual expression, where composers delved into profound emotional depths, embraced rich harmonies, and championed programmatic storytelling through their music; characterized by the pursuit of intense personal expression and the exploration of diverse themes, this era witnessed the rise of nationalism, virtuosic performances, and the birth of iconic masterpieces.",
    },

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
    life: {
      fullName: "Fanny Mendelssohn",
      lifespan: "1805-1847",
      bio: "placeholder",
      nationality: "German",
    },

    era: {
      name: "romantic",
      description:
        "The romantic era in classical music, spanning roughly the 19th century, unfolded as a passionate and emotive symphony of individual expression, where composers delved into profound emotional depths, embraced rich harmonies, and championed programmatic storytelling through their music; characterized by the pursuit of intense personal expression and the exploration of diverse themes, this era witnessed the rise of nationalism, virtuosic performances, and the birth of iconic masterpieces.",
    },

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
    life: {
      fullName: "Sophie-Carmen Eckhardt-Gramatte",
      lifespan: "1899-1974",
      bio: "placeholder",
      nationality: "Russian/Canadian",
    },

    era: {
      name: "modern",
      description:
        "The modern era in classical music, roughly from the late 19th to the mid-20th century, witnessed a departure from traditional tonal structures and the exploration of dissonance. Composers during this period experimented with new forms, tonalities, and embraced diverse musical styles, reflecting the societal and technological shifts of the time.",
    },

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
    life: {
      fullName: "Clara Schumann",
      lifespan: "1819-1896",
      bio: "placeholder",
      nationality: "German",
    },

    era: {
      name: "romantic",
      description:
        "The romantic era in classical music, spanning roughly the 19th century, unfolded as a passionate and emotive symphony of individual expression, where composers delved into profound emotional depths, embraced rich harmonies, and championed programmatic storytelling through their music; characterized by the pursuit of intense personal expression and the exploration of diverse themes, this era witnessed the rise of nationalism, virtuosic performances, and the birth of iconic masterpieces.",
    },

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
    life: {
      fullName: "Barbara Strozzi",
      lifespan: "1619-1677",
      bio: "placeholder",
      nationality: "Italian",
    },

    era: {
      name: "baroque",
      description:
        "The baroque era, flourishing from the early 17th to the mid-18th century, was marked by ornate and expressive music, defined by elaborate ornamentation and the emergence of instrumental forms like the concerto and the sonata. ",
    },

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
    life: {
      fullName: "Francesca Caccini",
      lifespan: "1587-1640",
      bio: "placeholder",
      nationality: "Italian",
    },

    era: {
      name: "baroque",
      description:
        "The baroque era, flourishing from the early 17th to the mid-18th century, was marked by ornate and expressive music, defined by elaborate ornamentation and the emergence of instrumental forms like the concerto and the sonata. ",
    },

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
    life: {
      fullName: "Elisabeth Jacquet de La Guerre",
      lifespan: "1665-1729",
      bio: "placeholder",
      nationality: "French",
    },

    era: {
      name: "baroque",
      description:
        "The baroque era, flourishing from the early 17th to the mid-18th century, was marked by ornate and expressive music, defined by elaborate ornamentation and the emergence of instrumental forms like the concerto and the sonata. ",
    },

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
    life: {
      fullName: "Hildegard von Bingen",
      lifespan: "1098-1179",
      bio: "placeholder",
      nationality: "German",
    },

    era: {
      name: "medieval",
      description:
        "The medieval era in classical music, spanning approximately the 5th to the 15th century, was characterized by a sacred and monophonic musical landscape, where Gregorian chant and plainchant flourished. This era embraced modal scales, intricate vocal textures, and often centred around Christian themes.",
    },

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
    life: {
      fullName: "Valerie Coleman",
      lifespan: "1970-present",
      bio: "placeholder",
      nationality: "American",
    },

    era: {
      name: "post-modern",
      description:
        "The latter half of the 20th century  into the 21st century. It draws from a wide range of musical styles from various periods, embracing eclecticism and rejecting the strict adherence to certain modernist principles.",
    },

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

//users array

let users = [
  {
    name: "Example name Jane",
    id: 1,
    favoriteComposers: ["Elizabeth Maconchy", "Lili Boulanger"],
  },
];

//CREATE new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("user needs a name");
  }
});

//CREATE favourite composer
app.post("/users/:id/:composerName", (req, res) => {
  const { id, composerName } = req.params;
  const favComposer = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteComposers.push(composerName);
    res
      .status(200)
      .send(
        `${composerName} has been added to user ${id}'s favorite composers`
      );
  } else {
    res.status(400).send("user not found");
  }
});

//DELETE favourite composer
app.delete("/users/:id/:composerName", (req, res) => {
  const { id, composerName } = req.params;

  let user = users.find((user) => user.id == id);
  if (user) {
    user.favoriteComposers = user.favoriteComposers.filter(
      (composer) => composer !== composerName
    );
    res
      .status(200)
      .send(
        `${composerName} has been removed from user ${id}'s favorite composers`
      );
  } else {
    res.status(400).send("user not found");
  }
});

//DELETE user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);
  if (user) {
    users = users.filter((user) => user.id != id);

    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("user not found");
  }
});

//UPDATE user name
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  let user = users.find((user) => user.id == id);
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("user not found");
  }
});

// GET requests (READ)

//GET all data
app.get("/composers", (req, res) => {
  res.status(200).json(topComposers);
});

app.get("/", (req, res) => {
  res.send("Women are great composers!");
});

//GET data about a composer by her name
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

//GET info (name, description) about era
app.get("/composers/era/:eraName", (req, res) => {
  const { eraName } = req.params;
  console.log("eraName", eraName);
  const era = topComposers.find(
    (composer) => composer.era.name === eraName
  ).era;
  if (era) {
    res.status(200).json(era);
  } else {
    res.status(400).send("no such era");
  }
});

//GET life info about composers based on full name
app.get("/composers/life/:fullName", (req, res) => {
  const { fullName } = req.params;
  const life = topComposers.find(
    (composer) => composer.life.fullName === fullName
  ).life;
  if (life) {
    res.status(200).json(life);
  } else {
    res.status(400).send("life does not exist");
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
