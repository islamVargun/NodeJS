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
app.use("/", express.static(path.join(__dirname, "public")));
//routes
app.use("/subdir", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

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
