const mainMovies = [
  "joker",
  "matilda",
  "jurassic",
  "top gun",
  "django",
  "house of wax",
  "disturbia",
  "simpatia",
  "shrek",
  "batman",
];

const recommendedMovies = [
  "creed",
  "rocky",
  "interestelar",
  "moonfall",
  "hooligans",
  "blade",
  "oblivion",
  "i robot",
  "reservoir dogs",
  "flubber",
];

const galleryPostersArray = [
  ["harry potter", "toy story", "robocop", "small soldiers"],
  ["titanic", "john wick", "benjamin button", "jaws"],
  [
    "lord of the rings",
    "pirates of the caribbean ",
    "robocop",
    "small soldiers",
  ],
  [
    "Dawn of the Dead",
    "eternal sunshine of the spotless mind",
    "Sleepy Hollow",
    "Interstellar",
  ],
];

let containerMainMovies = document.querySelector("#list-main-movies");
let containerRecommendedMovies = document.querySelector("#list-recommended");
let cart = document.querySelector("#dropdown-cart");
let galleryPoster = document.querySelector("#gallery-poster");
let searchButton = document.querySelector("#search-button");
let nextGallery = document.querySelector("#next-gallery");
let previousGallery = document.querySelector("#previous-gallery");
let numberProducts = document.querySelector("#number-products");
let arrayCart = JSON.parse(localStorage.getItem("arrayCart")) || [];
let arrayProfiles = JSON.parse(localStorage.getItem("arrayCart")) || [];
// FUNCTION TO GET MOVIE DATA IN API
async function obtenerDatos(string) {
  const URL = "https://www.omdbapi.com/?apikey=712dcc23&t=";

  try {
    const response = await fetch(URL + string.replace(" ", "+").trim());

    if (!response.ok) {
      throw new Error("No se pudo acceder al servidor");
    }

    const data = await response.json();
    if (data.Response === "False") {
      console.log("No existe la película");
      return null;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return null;
  }
}

// FUNCTION TO CREATE CARD TEMPLATE WITH DATA FROM API
function createCardTemplate(object) {
  return `
    <div id="movie">
        <img src="${object.Poster}" alt="${object.Title}">
        <span>${object.Title}</span>
        <span>${object.Year}</span>
        <span>Puntuación: ${object.imdbRating}</span>
        <button id="${object.Title}" class="btn-add"><i class="fa-solid fa-circle-plus"></i></button>
    </div>
  `;
}

// FUNCTION TO RENDER MOVIES
async function renderMovies(place, array) {
  for (const movie of array) {
    try {
      const movieToRender = await obtenerDatos(movie);
      if (movieToRender) {
        place.innerHTML += createCardTemplate(movieToRender);
      } else {
        console.log(`No se pudo renderizar la película: ${movie}`);
      }
    } catch (error) {
      console.error(`Error al renderizar la película ${movie}:`, error);
    }
  }
  addEventListenersToButtons();
}

// FUNCTION TO SAVE CHANGES IN LOCALSTORAGE
const saveToLocalStorage = () => {
  localStorage.setItem("arrayCart", JSON.stringify(arrayCart));
};

// FUNCTION TO ADD MOVIE TO ARRAY CART
function addEventListenersToButtons() {
  const btnAdd = document.querySelectorAll(".btn-add");
  btnAdd.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const movieTitle = e.target.id;
      obtenerDatos(movieTitle).then((data) => {
        if (!data) return;
        let existingMovie = arrayCart.find(
          (movie) => movie.Title === data.Title
        );
        if (!existingMovie) {
          let price = data.price || getRandomInt(2000, 10000);
          data.price = price;
          data.cantidad = 1;
          arrayCart.push(data);
          saveToLocalStorage();
          console.log(`Película ${data.Title} agregada al carrito.`);
        } else {
          existingMovie.cantidad + 1; // Increment the quantity
          console.log(
            `Cantidad de la película ${data.Title} actualizada en el carrito.`
          );
        }
        saveToLocalStorage();
        renderArrayCart(); // Render the cart again to show the updated list
      });
    });
  });
}

// FUNCTION TO RENDER ARRAY CART
function renderArrayCart() {
  let totalProductsCart = 0;
  cart.innerHTML = "";
  if (arrayCart.length === 0) {
    cart.innerHTML = `<span>El carrito esta vacio</span>`;
    numberProducts.textContent = totalProductsCart;
  } else {
    // CART TITLE
    cart.innerHTML = `<p>Productos <i class="fa-brands fa-product-hunt"></i></p>`;
    // PRODUCTS RENDERIZED
    arrayCart.forEach((product) => {
      cart.innerHTML += `
        <div id="movie-add">
            <img src="${product.Poster}" alt="${product.Title}">
            <span>${product.Title}</span>
            <span>$${product.price}</span>
            <div id="movie-add-buttons">
              <button class="btn-increment" data-title="${product.Title}"><i class="fa-solid fa-plus"></i></button>
              <span>${product.cantidad}</span>
              <button class="btn-decrement" data-title="${product.Title}"><i class="fa-solid fa-minus"></i></button>
            </div>
        </div>
      `;
    });
    // FUNCTION TO UPDATE TOTAL PRODUCTS
    let total = 0;
    arrayCart.forEach((movie) => {
      let totalPrice = movie.price * movie.cantidad;
      totalProductsCart += movie.cantidad;
      total += totalPrice;
      numberProducts.textContent = totalProductsCart;
    });
    cart.innerHTML += `
    <div id="container-total">
      <p>${" $" + total}</p>
      <button id="buy-button"><i class="fa-solid fa-bag-shopping"></i></button>
      <button id="delete-all"><i class="fa-solid fa-trash-can"></i></button>
    </div>
      `;
    deleteAllProducts();
    function deleteAllProducts() {
      document.querySelector("#delete-all").addEventListener("click", () => {
        let responseUser = window.confirm(
          "Estas seguro que deseas borrar todo?"
        );
        if (responseUser) {
          arrayCart = [];
          saveToLocalStorage();
          renderArrayCart();
        } else {
          window.alert("Ok tene cuidado la proxima");
        }
      });
    }
  }

  // Add event listeners to the increment and decrement buttons
  document.querySelectorAll(".btn-increment").forEach((button) => {
    button.addEventListener("click", (e) => {
      const title = e.currentTarget.getAttribute("data-title");
      const movie = arrayCart.find((m) => m.Title === title);
      if (movie) {
        movie.cantidad += 1;
        saveToLocalStorage();
        renderArrayCart();
      }
    });
  });

  document.querySelectorAll(".btn-decrement").forEach((button) => {
    button.addEventListener("click", (e) => {
      const title = e.currentTarget.getAttribute("data-title");
      const movie = arrayCart.find((m) => m.Title === title);
      if (movie) {
        if (movie.cantidad > 1) {
          movie.cantidad -= 1;
        } else {
          arrayCart = arrayCart.filter((m) => m.Title !== title);
        }
        saveToLocalStorage();
        renderArrayCart();
      }
    });
  });
}

// Helper function to generate a random price
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// FUNCTION TO RENDER POSTER IN HERO SECTION
async function renderGallery(array) {
  let numberArrayToRender = 0;

  const renderImages = async (movieArray) => {
    galleryPoster.innerHTML = "";
    for (const movie of movieArray) {
      try {
        const movieToRender = await obtenerDatos(movie);
        if (movieToRender) {
          galleryPoster.innerHTML += `
            <img id="${movieToRender.Title}" class="poster" src="${movieToRender.Poster}" alt="${movieToRender.Title}">
          `;
        } else {
          console.log(`No se pudo renderizar la película: ${movie} en HERO`);
        }
      } catch (error) {
        console.error(
          `Error al renderizar la película en HERO ${movie}:`,
          error
        );
      }
    }

    addEventListenersToPosters();
  };

  // Función para cambiar entre los diferentes arrays de películas
  const changeArray = () => {
    numberArrayToRender = (numberArrayToRender + 1) % array.length;
    renderImages(array[numberArrayToRender]);
  };

  renderImages(array[numberArrayToRender]);
  setInterval(changeArray, 15000);
}

// FUNCTIONS GALLERY POSTERS
function addEventListenersToPosters() {
  let posters = document.querySelectorAll(".poster");
  posters.forEach((poster) => {
    poster.addEventListener("click", (e) => {
      let movieSelect = e.target.id;
      let searchMoviesHTML = document.querySelector("#container-search-movies");
      let section = document.getElementById("search-movies");
      searchMoviesHTML.innerHTML = "";

      obtenerDatos(movieSelect).then((data) => {
        if (!data) {
          return;
        }
        searchMoviesHTML.innerHTML = `
      ${createCardTemplate(data)}
      `;
        section.scrollIntoView({ behavior: "smooth" });
        addEventListenersToButtons();
        console.log(data.Title);
      });
    });
  });
}

// FUNCTIONS TO SEARCH MOVIES
async function searchMovie() {
  searchButton.addEventListener("click", () => {
    let input = document.querySelector("#input-search-movie");
    let searchMoviesHTML = document.querySelector("#container-search-movies");
    searchMoviesHTML.innerHTML = "";
    obtenerDatos(input.value).then((data) => {
      if (!data) {
        searchMoviesHTML.innerHTML = `<p>La pelicula que busco no ha sido encontrada, por favor vuelva a intentarlo.</p>
        `;
      }
      searchMoviesHTML.innerHTML = `
        ${createCardTemplate(data)}
      `;
      addEventListenersToButtons();
    });
  });
}

// FUNCTION TO FORM CONTACT
let formContact = document.querySelector("#contact-form");
let inputName = document.querySelector("#name");
let inputEmail = document.querySelector("#email");
let message = document.querySelector("#message");
formContact.addEventListener("submit", (e) => {
  e.preventDefault();

  let profile = {
    name: inputName.value,
    email: inputEmail.value,
    message: message.value,
  };

  console.log(profile);
});

document.addEventListener("DOMContentLoaded", () => {
  renderMovies(containerMainMovies, mainMovies);
  renderMovies(containerRecommendedMovies, recommendedMovies);
  renderArrayCart();
  renderGallery(galleryPostersArray);
  searchMovie();
});

console.log(arrayCart);
