console.log("search js loded!");

const omdbApiKey = "dcd0f9e";
const tmdbApiKey = "a7a13047807815d4e8c8a123fefcc6cb";

let imdbBtn = document.getElementById("imdbBtn");
let nameBtn = document.getElementById("nameBtn");
let searchInput = document.getElementById("searchInput");
let search_btn = document.getElementById("search_btn");
let movieResults = document.getElementById("movieResults");

let search_by = "imdb";

if (imdbBtn && nameBtn && searchInput && search_btn && movieResults) {
  imdbBtn.addEventListener("click", () => {
    searchInput.placeholder = "Enter IMDb ID";
    imdbBtn.classList.add("bg-purple-600");
    imdbBtn.classList.remove("bg-gray-800");
    nameBtn.classList.remove("bg-purple-600");
    nameBtn.classList.add("bg-gray-800");
    search_by = "imdb";
  });

  nameBtn.addEventListener("click", () => {
    searchInput.placeholder = "Enter Movie Name";
    nameBtn.classList.add("bg-purple-600");
    nameBtn.classList.remove("bg-gray-800");
    imdbBtn.classList.remove("bg-purple-600");
    imdbBtn.classList.add("bg-gray-800");
    search_by = "name";
  });
}

if (search_btn && searchInput) {
  search_btn.addEventListener("click", () => {
    apiCall(searchInput.value);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      apiCall(searchInput.value);
    }
  });
}

async function apiCall(search) {
  if (search.trim() === "") {
    alert("Please enter a value!");
    return;
  }
  if (search_by === "imdb") {
    getByImdb(search);
  } else {
    getByName(search);
  }
}

async function getByImdb(id) {
  let url = "https://www.omdbapi.com/?i=" + id + "&apikey=" + omdbApiKey;

  let res = await fetch(url);
  let data = await res.json();

  console.log("OMDb Result:", data);

  showResult(data);
}

async function getByName(name) {
  let query = name.split(" ").join("+");

  let url =
    "https://api.themoviedb.org/3/search/movie?query=" +
    query +
    "&api_key=" +
    tmdbApiKey;

  let res = await fetch(url);
  let data = await res.json();

  console.log("TMDB Result:", data);

  if (data.results.length === 0) {
    alert("Movie not found!");
    return;
  }

  showResult(data.results);
}

async function showResult(movies) {
  movieResults.innerHTML = "";

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

    movieResults.innerHTML += `
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
