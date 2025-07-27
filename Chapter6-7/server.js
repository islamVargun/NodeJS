const PORT = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
// Importing the logger middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const whiteList = [
  "https://www.youtube.com",
  "http://localhost:3000",
  "http://www.islamvargun.com.tr",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

//custom middleware
app.use(logger);
app.use(cors(corsOptions));
//urlencoded icin middleware
app.use(express.urlencoded({ extended: false }));
//json icin middleware
app.use(express.json());
//statik dosyalar icin middleware
app.use(express.static("public"));
app.get("^/|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("eklendi");
    next();
  },
  (req, res) => {
    res.send("hello world");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  next();
};
const four = (req, res, next) => {
  console.log("four");
  next();
};
const five = (req, res, next) => {
  console.log("five");
  res.send("finished");
  next();
};

app.get("/chain.html", [one, two, three, four, five]);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
