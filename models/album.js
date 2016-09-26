var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = {
    artistName: String,
    name: String,
    releaseDate: String,
    genres: []
};

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
