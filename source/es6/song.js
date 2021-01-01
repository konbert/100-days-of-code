/*  
    song.js 

    Homework #1: Data Types
                 Favorite Song
    
    Author: Michael Stöckel
    Date: 2021-01-01
*/

// Defining favorite song
var artist = "Abba";
var genre  = "Pop";
var title  = "The Winner Takes it All";
var album  = "Super Trouper";
var released = 1980;
var length = 4*60 + 55;
var writers = ["Benny Andersson", "Björn Ulvaeus"];
var noOne = true;
var charts = {
    "DE": 4,
    "AT": 3,
    "CH": 3,
    "UK": 1,
    "US": 8,
}


// Logging out favorite song
console.log("Title:      " + title);
console.log("Artist:     " + artist);
console.log("Genre:      " + genre);
console.log("Album:      " + album);
console.log("Released:   " + released);
console.log("Length:     " + length);
console.log("Writers:   ", writers);
console.log("Number One: " + noOne)
console.log("Charts:    ", charts);

