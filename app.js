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
function fetchRandom() {
  let comicTitleContainer = document.getElementById("comicTitleContainer");
  let comicContainer = document.getElementById("comicContainer");
  for (let i = 0; i < numbersArray.length; i++) {
    $.get(`https://xkcd.vercel.app/?comic=${numbersArray[i]}`, (data) => {
      randomComics.push(data);
      console.log(data.title);
      let eachComic = document.createElement("img");
      eachComic.src = data.img;
      let eachTitle = document.createElement("div");
      eachTitle.innerText = data.title;
      eachTitle.classList = "title";
      comicTitleContainer.append(eachTitle);
      eachTitle.addEventListener("click", (e) => {
        //remove old comic (if any)
        $("#comicContainer").children().remove();
        //add clicked comic image to div "comicContainer"
        comicContainer.append(eachComic);
      });
    });
  }
  console.log(randomComics);
}

function deleteChild() {
    var e = document.querySelector("ul");
    
    //e.firstElementChild can be used.
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
var btn = document.getElementById(
"btn").onclick = function() {
    deleteChild();
}