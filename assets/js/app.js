console.log("js loded!");

const omdbApiKey = "dcd0f9e";
const tmdbApiKey = "a7a13047807815d4e8c8a123fefcc6cb";

let imdbBtn = document.getElementById("imdbBtn");
let nameBtn = document.getElementById("nameBtn");
let searchInput = document.getElementById("searchInput");
let search_btn = document.getElementById("search_btn");
let movieResults = document.getElementById("movieResults");

let search_by = "imdb";

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

search_btn.addEventListener("click", () => {
  apiCall(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    apiCall(searchInput.value);
  }
});

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

  showResult(data.results[0]);
}

function showResult(movie) {
  console.log("Final Movie Data:", movie);
}
