console.log("js loded!");

const imdbBtn = document.getElementById("imdbBtn");
const nameBtn = document.getElementById("nameBtn");
const searchInput = document.getElementById("searchInput");

imdbBtn.addEventListener("click", () => {
  searchInput.placeholder = "Enter IMDb ID";
  imdbBtn.classList.add("bg-purple-600");
  imdbBtn.classList.remove("bg-gray-800");
  nameBtn.classList.remove("bg-purple-600");
  nameBtn.classList.add("bg-gray-800");
});

nameBtn.addEventListener("click", () => {
  searchInput.placeholder = "Enter Movie Name";
  nameBtn.classList.add("bg-purple-600");
  nameBtn.classList.remove("bg-gray-800");
  imdbBtn.classList.remove("bg-purple-600");
  imdbBtn.classList.add("bg-gray-800");
});
