const clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY,
});

const handleApiCall = (req, res) => {
  app.models
    .initModel({
      id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((generalModel) => {
      return generalModel
        .predict(req.body.input)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("unable to work with API"));
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
