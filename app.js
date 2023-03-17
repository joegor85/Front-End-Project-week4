//First, be able to access the data
// $.get("https://xkcd.vercel.app/?comic=200", (data) => {
//   console.log(data);
// });

// Create function to generate 20 random numbers to use in finding comics
let numbersArray = [];
function randomNumbers() {
  for (let i = 0; i < 20; i++) {
    //console.log(Math.floor(Math.random() * (2500 - 1) + 1));
    let number = Math.floor(Math.random() * (2750 - 1) + 1);
    numbersArray.push(number);
  }
}

//------------------------FETCH COMICS---------------------------------//

// On button click, generate 20 random comics and store them in memory. Then display keywords found in those comics.
const fetch = document.querySelector(".fetch");
fetch.addEventListener("click", (e) => {
  numbersArray = [];
  randomNumbers();
  console.log(numbersArray);
  // console.log(e.target);
  // Remove any existing titles if button was clicked previously.
  $("#comicTitleContainer").children().remove();
  $("#comicContainer").children().remove();
  // Run a function that grabs random data
  fetchRandom();
});

// Set up some variables that we will need
let randomComics = [];
let comicTitleContainer = document.getElementById("comicTitleContainer");
let comicContainer = document.getElementById("comicContainer");
let comicDataContainer = document.getElementById("comicDataContainer");
// Define the function which requests the data through the API, compiles it, and places it on the page
function fetchRandom() {
  for (let i = 0; i < numbersArray.length; i++) {
    // Access the data
    $.get(`https://xkcd.vercel.app/?comic=${numbersArray[i]}`, (data) => {
      // Add it to our array of randomComics
      randomComics.push(data);
      console.log(data.title);
      // Create the elements needed for the page
      let eachTitle = document.createElement("div");
      eachTitle.innerText = data.title;
      eachTitle.classList = "title";
      let eachComic = document.createElement("img");
      eachComic.src = data.img;
      let eachComicData = document.createElement("div");
      eachComicData.classList = "data";
      eachComicData.innerText = `This is comic #${
        data.num
      } and it is from ${convertToMonth(data.month)} ${
        data.year
      }. Description/writer's comment:\n\n${data.alt}`;
      comicTitleContainer.append(eachTitle);
      // Add an event listener to each of the titles to make them clickable
      eachTitle.addEventListener("click", (e) => {
        // Remove the styling of the previously selected title
        let previousSelected = $(".selected");
        console.log(previousSelected);
        previousSelected.removeClass("selected");
        // Add classlist to style the selected title
        eachTitle.classList.add("selected");
        // Remove old comic (if any)
        $("#comicContainer").children().remove();
        $("#comicDataContainer").children().remove();
        // Add clicked comic image to div "comicContainer"
        comicContainer.append(eachComic);
        comicDataContainer.append(eachComicData);
      });
    });
  }
  // View the comics data in the console if needed
  console.log(randomComics);
}

// Define convertToMonth function for use in above function
function convertToMonth(month) {
  if (month == 1) {
    return "January";
  } else if (month == 2) {
    return "February";
  } else if (month == 3) {
    return "March";
  } else if (month == 4) {
    return "April";
  } else if (month == 5) {
    return "May";
  } else if (month == 6) {
    return "June";
  } else if (month == 7) {
    return "July";
  } else if (month == 8) {
    return "August";
  } else if (month == 9) {
    return "September";
  } else if (month == 10) {
    return "October";
  } else if (month == 11) {
    return "November";
  } else {
    return "December";
  }
}
//------------------------FAVORITES--------------------------//
// Make a container array to store our favorite data
let userFavorites = [];
// On user input, pull the comic from the API and display in favorites.
const favButton = document.querySelector(".favButton");
let userInput = document.querySelector("input");
favButton.addEventListener("click", (e) => {
  // Run a function that grabs the favorite comic and adds it to the favorite container
  getUserFavorite();
});

// Define the function to grab user's favorite
function getUserFavorite() {
  console.log(userInput.value);
  // Since there are only 2750 comics(as of now), best to limit the input with an alert message
  if (userInput.value > 2750) {
    alert(
      "As of the creation of this website, there are only 2750 xkcd comics..."
    );
  } else {
    // Create the HTML elements we need and put the fav data into them
    let eachFav = document.createElement("div");
    eachFav.classList = "eachFav";
    $.get(`https://xkcd.vercel.app/?comic=${userInput.value}`, (data) => {
      let favTitle = document.createElement("div");
      favTitle.innerHTML =
        data.title +
        "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp(" +
        convertToMonth(data.month) +
        " " +
        data.day +
        ", " +
        data.year +
        ")";
      favTitle.classList = "favTitle";
      let favComicImage = document.createElement("img");
      favComicImage.classList = "favComic";
      favComicImage.src = data.img;
      let favDesc = document.createElement("div");
      favDesc.innerText = data.alt;
      favDesc.classList = "favDesc";
      eachFav.append(favTitle);
      eachFav.append(favComicImage);
      eachFav.append(favDesc);
      let favoriteContainer = document.getElementById("favoriteContainer");
      favoriteContainer.append(eachFav);
      // Collect # and URL data on favorites for display later
      let combined = "#" + data.num + " " + data.img;
      userFavorites.push(combined);
    });
  }
}

// Add an event listener so when user clicks on "get links" button it provides them with direct links to their favorites
const urlButton = document.querySelector(".urlButton");
urlButton.addEventListener("click", (e) => {
  alert(userFavorites.join("                      "));
});
