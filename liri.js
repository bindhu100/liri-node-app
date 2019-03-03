require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// 
// color for chalk
// https://www.npmjs.com/package/chalk 
// $ npm install chalk
// node liri.js movie-this '<movie name here>'
const chalk = require('chalk');
// 


// info for request
var request = require("request");

var moment = require("moment");

// Info for fs
var fs = require("fs");

var command = process.argv[2];

function movieThis(movieTitle) {
  if (movieTitle === undefined) {

    movieTitle = "Mr. Nobody";
  }

  request("https://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy", function (error, response, data) {
    if (!error && response.statusCode === 200) {
      console.log(data);
      console.log(chalk.bgCyan.whiteBright("**********************************************************************************************************************************************************************************"));
      console.log("");

      console.log(chalk.blue("Title: " + JSON.parse(data).Title));
      console.log(chalk.green("Year Released: " + JSON.parse(data).Year));
      console.log(chalk.cyan("IMDB Rating: " + JSON.parse(data).imdbRating));

      var rottenTomatoesExists = false;
      var index;
      var ratings = JSON.parse(data).Ratings;
      for (var i = 0; i < ratings.length; i++) {
        if (ratings[i].Source === 'Rotten Tomatoes') {
          rottenTomatoesExists = true;
          index = i;
          break;
        }
      }

      if (rottenTomatoesExists) {
        console.log(chalk.magenta('Rotten Tomatoes rating: ' + ratings[index].Value));
      } else {
        console.log(chalk.redBright('Rotten Tomatoes rating not found'));
      }

      console.log(chalk.cyanBright("Country Produced: " + JSON.parse(data).Country));
      console.log(chalk.yellow("Language: " + JSON.parse(data).Language));
      console.log(chalk.blueBright("Plot: " + JSON.parse(data).Plot));
      console.log(chalk.greenBright("Actors: " + JSON.parse(data).Actors));

      console.log("");
      console.log(chalk.bgCyan.whiteBright("**********************************************************************************************************************************************************************************"));
    }
  });
};

// concert-this
function concertThis(nameArtist) {
  request("https://rest.bandsintown.com/artists/" + nameArtist + "/events?app_id=codingbootcamp", function (error, response, data) {
    if (!error && response.statusCode === 200) {

      console.log(chalk.bgRed.whiteBright("**********************************************************************************************************************************************************************************"));
      console.log("");

      console.log(chalk.yellow("Venue: " + JSON.parse(data)[0].venue.name));
      console.log(chalk.green("Location: " + JSON.parse(data)[0].venue.city + " " + JSON.parse(data)[0].venue.region));
      console.log(chalk.blue("Date: " + moment(JSON.parse(data)[0].datetime).format("MM/DD/YYYY")));

      console.log("");
      console.log(chalk.bgRed.whiteBright("**********************************************************************************************************************************************************************************"));
    }

  });
}

function songThis(song) {
  if (song === undefined) {
    song = "The Sign";
  }
  spotify.search({ type: "track", query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);

    }
    console.log(chalk.bgGreenBright.whiteBright("**********************************************************************************************************************************************************************************"));
    console.log("");

    console.log(chalk.blueBright("Artist: " + data.tracks.items[0].artists[0].name));
    console.log(chalk.yellowBright("Song Name: " + data.tracks.items[0].name));
    console.log(chalk.redBright("Preview Link: " + data.tracks.items[0].preview_url));
    console.log(chalk.magentaBright("Album: " + data.tracks.items[0].album.name));

    console.log("");
    console.log(chalk.bgGreenBright.whiteBright("**********************************************************************************************************************************************************************************"));
  });
}

// movie
if (command === "movie-this") {

  var movie = process.argv[3];
  movieThis(movie);

}

// **********************
// concert
// node liri.js concert-this <artist/band name here>
// brand names :Alice in Chains, Alexisonfire , Animals as Leaders, Alice Cooper, 
else if (command === "concert-this") {

  var artist = process.argv[3];
  concertThis(artist);
}
// *****************
// song
// node liri.js spotify-this-song '<song name here>'
// songs name: This Time for Africa, All Of Me, Happy, Sorry, Love Yourself

else if (command === "spotify-this-song") {
  var song = process.argv[3];

  songThis(song);
}
// 8888888888888888888888
// 88888888888888888888888
// ************************
// do-what-it-says
// node liri.js do-what-it-says

else if (command === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    console.log(data);
    var dataArr = data.split(", ");
    console.log(dataArr);

    command = dataArr[0];
    doWhatItSays = dataArr[1];

    if (command === "concert-this") {
      var artist = doWhatItSays;
      concertThis(artist);

    } else if (command === "movie-this") {
      var movie = doWhatItSays;
      movieThis(movie);

    } else if (command === "spotify-this-song") {

      var song = doWhatItSays;
      songThis(song);

      if (song === undefined) {
        song = "The Sign";
      }
      spotify.search({ type: "track", query: song }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);

        }
        console.log("");
        console.log(chalk.bgRed.whiteBright("**********************************************************************************************************************************************************************************"));
        console.log("");

        console.log(chalk.yellowBright("Artist: " + data.tracks.items[0].artists[0].name));
        console.log(chalk.greenBright("Song Name: " + data.tracks.items[0].name));
        console.log(chalk.magentaBright("Preview Link: " + data.tracks.items[0].preview_url));
        console.log(chalk.blueBright("Album: " + data.tracks.items[0].album.name));

        console.log("");
        console.log(chalk.bgRed.whiteBright("**********************************************************************************************************************************************************************************"));
      });

    }
  });
} else {
  console.log("Error!")
}


// node liri.js concert-this <artist/band name here>
  // brand names :Alice in Chains, Alexisonfire , Animals as Leaders, Alice Cooper, 
// node liri.js spotify-this-song '<song name here>'
  // songs name: This Time for Africa, All Of Me, Happy, Sorry, Love Yourself
// node liri.js movie-this '<movie name here>'
// node liri.js do-what-it-says 
// movie-this, spider man

// spotify-this-song,"I Want it That Way"

// 


