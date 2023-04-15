let mainCardContainerEl = document.querySelector(".main--card-container");
const submitBtn = document.querySelector(".search-btn");
const mainLoadingScreenEl = document.querySelector(".main--loading-screen");

let addBtnEl;

let watchListMovieArray = [];

submitBtn.addEventListener("click", function () {
  getMovieData();
});

// GET THE MOVIE DATA FROM THE OMDb API 
function getMovieData() {
  const movieTitleInput = document.querySelector('[name="movie-title"]');
  if (movieTitleInput.value) {
    const movieTitle = movieTitleInput.value;
    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=8259adf`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          for (let element of data.Search) {
            searchSingleMovie(element);
          }
        } else {
          alert("No Movie Found");
        }
      });
  } else {
    alert("No movie title to search for...");
  }
  document.querySelector('[name="movie-title"]').value = "";
}


// SEARCH SINGLE MOVIE ACCORING TO THIER imdID
function searchSingleMovie(element) {
  mainCardContainerEl.innerHTML = ``;
  const imdID = element.imdbID;

  fetch(`https://www.omdbapi.com/?i=${imdID}&apikey=8259adf`)
    .then((response) => response.json())
    .then((data) => {
      generateHTML(data);
    });
}


// GENERATE HTML AND ADD IT TO THE DOM
function generateHTML(data) {
  const { Genre, Plot, Poster, Runtime, Title, imdbRating, imdbID } = data;

  const noImageFound = "../images/no-image-found.png";

  mainLoadingScreenEl.style.display = "none";
  mainCardContainerEl.innerHTML += `
        <article class="main--card">

        <img src="${
          Poster === "N/A" ? noImageFound : Poster
        }" alt="" class="main--img-left">

        <div class="main--card-body">

            <div class="main--card__movieTitle__rating">

                <h3 class="main--card__movie-title">${Title}</h3>

                <img src="./images/star-icon.png" alt="" class="main--card__star-icon">

                <p class="main--card__rating-number">${imdbRating}</p>

            </div>

        <div class="main--card__about--movie">

            <p class="main--card__total-minutes">${Runtime}</p>
            <p class="main--card__genre">${Genre}</p>

            <button class="btn add-btn" data-imdid=${imdbID}>
                <img src="./images/add-icon.png" alt="" class="main--card__add-icon">
                Watchlist
            </button>

        </div>

            <p class="main--card__movie-summary">${Plot}</p>

        </div>


        </article>

        <div class="divider"></div>
    `;

  addBtnEl = document.querySelectorAll(".add-btn");

  addBtnEl.forEach((addBtn) => {
    addBtn.addEventListener("click", addToWatchListArray);
  });
}


// TO ADD THE imdID OF SELECTED MOVIE TO THE ARRAY
function addToWatchListArray(e) {
  const imdID = e.target.dataset.imdid;

  watchListMovieArray.push(imdID);
  console.log(watchListMovieArray);
}


export default watchListMovieArray;