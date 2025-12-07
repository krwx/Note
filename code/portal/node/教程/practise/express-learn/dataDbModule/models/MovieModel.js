const mongoose = require("mongoose");

let MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
});

let MovieModel = mongoose.model('moview', MovieSchema);

module.exports = MovieModel;