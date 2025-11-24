console.log("js loded!");

const apiKey = dcd0f9e;

let imdbBtn = document.getElementById("imdbBtn");
let nameBtn = document.getElementById("nameBtn");
let searchInput = document.getElementById("searchInput");
let search_btn = document.getElementById("search_btn");

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
  let url = "";
  if (search_by === "imdb") {
    url = "https://www.omdbapi.com/?i=" + search + "&apikey=" + apiKey;
  } else {
    url = "https://www.omdbapi.com/?t=" + search + "&apikey=" + apiKey;
  }

  let res = await fetch("url");
  let data = await res.json();
}
