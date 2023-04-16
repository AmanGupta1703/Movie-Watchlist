const mainLoadingScreenEl = document.querySelector(".main--loading-screen");

const mainContainerEl = document.querySelector(".main--container");

console.log(JSON.parse(localStorage.getItem("moviesList")));

async function getMovieListFromLocalStorage() {
  const movieListImdID = JSON.parse(localStorage.getItem("moviesList"));

  if (movieListImdID.length) {
    movieListImdID.forEach(async function (movieImdID) {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${movieImdID}&apikey=8259adf`
      );
      const data = await response.json();
      generateHTML(data);
    });
  }
}

function generateHTML(data) {
  const mainCardContainerEl = document.createElement("article");

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

        <button class="btn minus-btn" data-imdid=${imdbID}>
        <img src="../images/minus-icon.png" alt="" class="main--minus-icon">
        Watchlist
        </button>
        
        </div>

        <p class="main--card__movie-summary">${Plot}</p>
        
    </div>
        

    </article>
        
        <div class="divider"></div>
              `;
  mainContainerEl.append(mainCardContainerEl);
}

getMovieListFromLocalStorage();
