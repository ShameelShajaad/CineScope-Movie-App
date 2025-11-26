console.log("js loded!");

const tmdbApiKey = "a7a13047807815d4e8c8a123fefcc6cb";


let keyword_search_btn = document.getElementById("keyword_search_btn");
let keyword_search_field = document.getElementById("keyword_search_field");
let keywordContainer = document.getElementById("keywordMovies");
let keyword_action_btn = document.getElementById("keyword_action_btn");
let keyword_comedy_btn = document.getElementById("keyword_comedy_btn");
let keyword_drama_btn = document.getElementById("keyword_drama_btn");
let keyword_horror_btn = document.getElementById("keyword_horror_btn");
let keyword_romance_btn = document.getElementById("keyword_romance_btn");
let keyword_scifi_btn = document.getElementById("keyword_scifi_btn");
let keyword_thriller_btn = document.getElementById("keyword_thriller_btn");
let keyword_fantasy_btn = document.getElementById("keyword_fantasy_btn");


if (keyword_search_btn && keyword_search_field) {
  keyword_search_btn.addEventListener("click", () => {
    isAValidGenre(keyword_search_field.value);
  });

  keyword_search_field.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      isAValidGenre(keyword_search_field.value);
    }
  });
}

if (keyword_action_btn) {
  let keywordButtons = [
    keyword_action_btn,
    keyword_comedy_btn,
    keyword_drama_btn,
    keyword_horror_btn,
    keyword_romance_btn,
    keyword_scifi_btn,
    keyword_thriller_btn,
    keyword_fantasy_btn,
  ];

  function resetKeywordButtons() {
    keywordButtons.forEach((btn) => {
      if (btn) {
        btn.classList.remove("bg-purple-600");
        btn.classList.add("bg-gray-800");
      }
    });
  }

  keyword_action_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_action_btn.classList.add("bg-purple-600");
    loadKeywordMovies(28);
  });

  keyword_comedy_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_comedy_btn.classList.add("bg-purple-600");
    loadKeywordMovies(35);
  });

  keyword_drama_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_drama_btn.classList.add("bg-purple-600");
    loadKeywordMovies(18);
  });

  keyword_horror_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_horror_btn.classList.add("bg-purple-600");
    loadKeywordMovies(27);
  });

  keyword_romance_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_romance_btn.classList.add("bg-purple-600");
    loadKeywordMovies(10749);
  });

  keyword_scifi_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_scifi_btn.classList.add("bg-purple-600");
    loadKeywordMovies(878);
  });

  keyword_thriller_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_thriller_btn.classList.add("bg-purple-600");
    loadKeywordMovies(53);
  });

  keyword_fantasy_btn.addEventListener("click", () => {
    resetKeywordButtons();
    keyword_fantasy_btn.classList.add("bg-purple-600");
    loadKeywordMovies(14);
  });
}

function setDefaultValuesToKeywordButtons() {}

function isAValidGenre(genre_value) {
  genre_value = genre_value.trim().toLowerCase();

  for (let id in genreArray) {
    if (genreArray[id].toLowerCase() === genre_value) {
      loadKeywordMovies(id);
      return;
    }
  }

  alert("Invalid Keyword");
}

async function loadKeywordMovies(genreId) {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${genreId}`;

  let res = await fetch(url);
  let data = await res.json();

  displayKeywordMovies(data.results);
}

async function displayKeywordMovies(movies) {
  keywordContainer.innerHTML = "";

  if (!Array.isArray(movies)) movies = [movies];

  for (let movie of movies) {
    let poster =
      movie.Poster ||
      (movie.poster_path
        ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
        : "assets/images/movie_placeholder.png");

    let title = movie.Title || movie.title || "Unknown";
    let year = movie.Year || movie.release_date?.split("-")[0] || "N/A";
    let rating = movie.imdbRating || movie.vote_average || "N/A";
    let genres = movie.genre_ids
      ? movie.genre_ids.map((id) => genreArray[id]).join(", ")
      : "N/A";

    let actors = movie.id ? await getMovieCredits(movie.id) : "N/A";

    let director, plot;

    if (movie.Director || movie.Plot) {
      director = movie.Director || "N/A";
      plot = movie.Plot || "N/A";
    } else if (movie.id) {
      ({ director, plot } = await getMovieDetails(movie.id));
    } else {
      director = "N/A";
      plot = "N/A";
    }

    keywordContainer.innerHTML += `
      <div class="relative group rounded overflow-hidden bg-gray-800 transform transition-all duration-300 hover:scale-110 hover:z-10" style="height: 28rem;">
        <img src="${poster}" alt="${title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
        <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-start overflow-y-auto">
          <h3 class="text-white font-bold text-lg mb-1">${title}</h3>
          <p class="text-gray-300 text-sm mb-1">Year: ${year}</p>
          <p class="text-gray-300 text-sm mb-1">Genre: ${genres}</p>
          <p class="text-gray-300 text-sm mb-1">Director: ${director}</p>
          <p class="text-gray-300 text-sm mb-1">Actors: ${actors}</p>
          <p class="text-gray-300 text-sm mb-2">Plot: ${plot}</p>
          <div class="flex items-center gap-1 mt-auto">
            <span class="material-symbols-outlined text-yellow-400">star</span>
            <span class="text-white font-semibold text-sm">${rating} / 10</span>
          </div>
        </div>
      </div>
    `;
  }
}



let genreArray = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

async function getMovieCredits(movieId) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${tmdbApiKey}`;
  let res = await fetch(url);
  let data = await res.json();
  let actors =
    data.cast
      ?.slice(0, 3)
      .map((a) => a.name)
      .join(", ") || "N/A";
  return actors;
}
async function getMovieDetails(movieId) {
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}&append_to_response=credits`;
  let res = await fetch(url);
  let data = await res.json();

  let director =
    data.credits?.crew?.find((c) => c.job === "Director")?.name || "N/A";

  let plot = data.overview || "N/A";

  return { director, plot };
}
