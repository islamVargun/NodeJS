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
module.exports = corsOptions;
