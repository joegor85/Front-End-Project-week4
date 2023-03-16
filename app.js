//First, be able to access the data
// $.get("https://xkcd.vercel.app/?comic=200", (data) => {
//   console.log(data);
// });

let numbersArray = [];
function randomNumbers() {
  for (let i = 0; i < 20; i++) {
    //console.log(Math.floor(Math.random() * (2500 - 1) + 1));
    let number = Math.floor(Math.random() * (2500 - 1) + 1);
    numbersArray.push(number);
  }
}
randomNumbers();
console.log(numbersArray);

// On button click, generate 20 random comics and store them in memory. Then display keywords found in those comics.
const fetch = document.querySelector(".fetch");
fetch.addEventListener("click", (e) => {
  // console.log(e.target);
  // Run a function that grabs random data
  $("#comicTitleContainer").children().remove();
  $("#comicContainer").children().remove();
  fetchRandom();
});

let randomComics = [];
let comicTitleContainer = document.getElementById("comicTitleContainer");
let comicContainer = document.getElementById("comicContainer");
function fetchRandom() {
  for (let i = 0; i < numbersArray.length; i++) {
    $.get(`https://xkcd.vercel.app/?comic=${numbersArray[i]}`, (data) => {
      randomComics.push(data);
      console.log(data.title);
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
      eachTitle.addEventListener("click", (e) => {
        let previousSelected = $(".selected");
        console.log(previousSelected);
        previousSelected.removeClass("selected");
        //add classlist to style the selected title
        eachTitle.classList.add("selected");
        //remove old comic (if any)
        $("#comicContainer").children().remove();
        //add clicked comic image to div "comicContainer"
        comicContainer.append(eachComic);
        comicContainer.append(eachComicData);
      });
    });
  }
  console.log(randomComics);
}

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

// On user input, pull the comic from the API and display in favorites.
const favButton = document.querySelector(".favButton");
let userInput = document.querySelector("input");
favButton.addEventListener("click", (e) => {
  // Run a function that grabs the favorite comic and adds it to the favorite container
  getUserFavorite();
});

//define a function to grab user's favorite
function getUserFavorite() {
  //let favComicData = [];
  console.log(userInput.value);
  let eachFav = document.createElement("div");
  eachFav.classList = "eachFav";
  $.get(`https://xkcd.vercel.app/?comic=${userInput.value}`, (data) => {
    let favTitle = document.createElement("div");
    favTitle.innerText = data.title;
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
  });
}
