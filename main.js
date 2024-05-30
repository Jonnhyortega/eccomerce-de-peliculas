
export const arrayAll = [
  "Gladiator",
  "Avengers: Infinity War",
  "Avengers: Endgame",
  "Top Gun",
  "Die Hard",
  "Mad Max: Fury Road",
  "John Wick",
  "The Dark Knight",
  "Inception",
  "Mission: Impossible - Fallout",
  "Interstellar",
  "The Matrix",
  "Blade Runner 2049",
  "Back to the Future",
  "Star Wars: A New Hope",
  "Star Trek",
  "The Terminator",
  "Jurassic Park",
  "E.T. the Extra-Terrestrial",
  "The Avengers",
  "Superbad",
  "The Hangover",
  "Step Brothers",
  "Bridesmaids",
  "Dumb and Dumber",
  "Tropic Thunder",
  "Zoolander",
  "Old School",
  "Hot Fuzz",
  "The Shawshank Redemption",
  "Forrest Gump",
  "The Godfather",
  "The Dark Knight",
  "Fight Club",
  "Pulp Fiction",
  "Schindler's List",
  "The Green Mile",
  "12 Angry Men",
  "The Pianist",
  "Titanic",
  "Pride and Prejudice",
  "The Notebook",
  "La La Land",
  "Romeo + Juliet",
  "A Walk to Remember",
  "Crazy Rich Asians",
  "The Fault in Our Stars",
  "To All the Boys I've Loved Before",
  "Pretty Woman",
  "Casablanca",
  "The Good, the Bad and the Ugly",
  "Unforgiven",
  "Django Unchained",
  "The Magnificent Seven",
  "True Grit",
  "Once Upon a Time in the West",
  "Butch Cassidy and the Sundance Kid",
  "3:10 to Yuma",
  "The Revenant",
  "High Noon",
  "The Exorcist",
  "A Nightmare on Elm Street",
  "The Conjuring",
  "It",
  "Hereditary",
  "Halloween",
  "The Shining",
  "The Ring",
  "Paranormal Activity",
  "Saw",
  "Se7en",
  "Gone Girl",
  "Fight Club",
  "The Silence of the Lambs",
  "Zodiac",
  "Shutter Island",
  "Memento",
  "Prisoners",
  "Nightcrawler",
  "Black Swan",
  "No Country for Old Men",
];
export const arrayAccion = [
  "Gladiator",
  "Avengers: Infinity War",
  "Avengers: Endgame",
  "Top Gun",
  "Die Hard",
  "Mad Max: Fury Road",
  "John Wick",
  "The Dark Knight",
  "Inception",
  "Mission: Impossible - Fallout",
];
export const arrayCienciaFiccion = [
  "Interstellar",
  "The Matrix",
  "Blade Runner 2049",
  "Back to the Future",
  "Star Wars: A New Hope",
  "Star Trek",
  "The Terminator",
  "Jurassic Park",
  "E.T. the Extra-Terrestrial",
  "The Avengers",
];
export const arrayComedia = [
  "Superbad",
  "The Hangover",
  "Step Brothers",
  "Anchorman",
  "Bridesmaids",
  "Dumb and Dumber",
  "Tropic Thunder",
  "Zoolander",
  "Old School",
  "Hot Fuzz",
];
export const arrayDrama = [
  "The Shawshank Redemption",
  "Forrest Gump",
  "The Godfather",
  "The Dark Knight",
  "Fight Club",
  "Pulp Fiction",
  "Schindler's List",
  "The Green Mile",
  "12 Angry Men",
  "The Pianist",
];
export const arrayRomance = [
  "Titanic",
  "Pride and Prejudice",
  "The Notebook",
  "La La Land",
  "Romeo + Juliet",
  "A Walk to Remember",
  "Crazy Rich Asians",
  "The Fault in Our Stars",
  "To All the Boys I've Loved Before",
  "Pretty Woman",
];
export const arrayWestern = [
  "The Good, the Bad and the Ugly",
  "Unforgiven",
  "Django Unchained",
  "The Magnificent Seven",
  "True Grit",
  "Once Upon a Time in the West",
  "Butch Cassidy and the Sundance Kid",
  "3:10 to Yuma",
  "The Revenant",
  "High Noon",
];
export const arrayTerror = [
  "The Exorcist",
  "A Nightmare on Elm Street",
  "The Conjuring",
  "It",
  "Hereditary",
  "Halloween",
  "The Shining",
  "The Ring",
  "Paranormal Activity",
  "Saw",
];
export const arrayThriller = [
  "Se7en",
  "Gone Girl",
  "Fight Club",
  "The Silence of the Lambs",
  "Zodiac",
  "Shutter Island",
  "Memento",
  "Prisoners",
  "Nightcrawler",
  "Black Swan",
  "No Country for Old Men",
];
export const recommendedMovies = [
  "creed",
  "rocky",
  "moonfall",
  "hooligans",
  "blade",
  "oblivion",
  "i robot",
  "reservoir dogs",
  "flubber",
];
export const galleryPostersArray = [
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
let numberProducts = document.querySelector("#number-products");
let arrayCart = JSON.parse(localStorage.getItem("arrayCart")) || [];
let arrayProfiles = JSON.parse(localStorage.getItem("arrayProfiles")) || [];
let filterButton = document.querySelector("#filter-button");

// FUNCTION TO GET MOVIE DATA IN API
async function obtenerDatos(string) {
  const URL = "https://www.omdbapi.com/?apikey=712dcc23&t=";

  try {
    const response = await fetch(URL + string.replace(/ /g, "+"));

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
        <span>${object.Title} - ${object.Year}</span>
        <span>Puntuación: ${object.imdbRating} - ${renderStarsRate(object.imdbRating)}</span>
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
const saveToLocalStorageProfiles = () => {
  localStorage.setItem("arrayProfiles", JSON.stringify(arrayProfiles));
};

// FUNCTION TO ADD MOVIE TO ARRAY CART
function addEventListenersToButtons() {
  const btnAdd = document.querySelectorAll(".btn-add");
  btnAdd.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target.id);
      const movieTitle = e.currentTarget.id;
      obtenerDatos(movieTitle).then((data) => {
        console.log(data);
        if (!data) return;
        let existingMovie = arrayCart.find(
          (movie) => movie.Title === data.Title
        );
        if (!existingMovie) {
          let price = getRandomInt(2000, 10000);
          data.price = price;
          data.cantidad = 1;
          arrayCart.push(data);
          saveToLocalStorage();
          console.log(`Película ${data.Title} agregada al carrito.`);
        } else {
          console.log("La pelicula ya se encuentra en el carrito.");
          // existingMovie.cantidad + 1; // Increment the quantity
          // console.log(
          // );
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
        console.log(
          `Cantidad de película "${movie.Title}" actualizada en el carrito.`
        );
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

// HELPER FUNCTIONS TO VALID DATA
function containNumbers(texto) {
  let regex = /\d/;
  return regex.test(texto);
}

function isEmail(texto) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(texto);
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
        addEventListenersToButtons();
        section.scrollIntoView({ behavior: "smooth" });
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
      if (data.Poster === "N/A") {
        searchMoviesHTML.innerHTML = `
        <span > Nada para mostrar con ese nombre => ${data.Title} </span>  
      `;
        return ;
      }
      searchMoviesHTML.innerHTML = `
        ${createCardTemplate(data)}
      `;
      addEventListenersToButtons();
    });
  });
}

// FUNCTION TO RENDER STARS IN RATED
function renderStarsRate(rated) {
  switch (true) {
    case (rated >= 0 && rated <= 1):
      return `⭐`;
    case (rated > 1 && rated <= 3):
      return `⭐⭐`;
    case (rated > 3 && rated <= 7): 
      return `⭐⭐⭐`;
    case (rated >7 && rated <= 9):
      return `⭐⭐⭐⭐`;
    case (rated > 9):
      return `⭐⭐⭐⭐⭐`;
    case (rated == "N/A"):
      return `❗`;
      default:
      return `❗`;
  }
}

// FUNCTION TO FILTER MOVIES FOR CATEGORIES
filterButton.addEventListener("click", () => {
  let genreSelect = document.querySelector("#genre-select");
  console.log(genreSelect);
  let selectedValue = genreSelect.value;
  switch (selectedValue) {
    case "All":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayAll);
      break;
    case "Accion":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayAccion);
      break;
    case "Ciencia Ficcion":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayCienciaFiccion);
      break;
    case "Comedia":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayComedia);
      break;
    case "Drama":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayDrama);
      break;
    case "Romance":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayRomance);
      break;
    case "Western":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayWestern);
      break;
    case "Terror":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayTerror);
      break;
    case "Thriller":
      containerMainMovies.innerHTML = "";
      renderMovies(containerMainMovies, arrayThriller);
      break;
    default:
      containerMainMovies.innerHTML = "";
      console.log("Género no reconocido");
  }
});

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

  if(
    containNumbers(profile.name) == false &&
    isEmail(profile.email) == true){
    arrayProfiles.push(profile)
    saveToLocalStorageProfiles()

  }if(containNumbers(profile.name) == false){
    console.log("Escriba un nombre correcto sin numeros")
  }if(isEmail(profile.email) == false){
    console.log(`${profile.email} no es un dominio correcto` )
  }
  console.log("No se cumplio ninguna condicion")
  return
});

document.addEventListener("DOMContentLoaded", () => {
  renderMovies(containerRecommendedMovies, recommendedMovies);
  renderArrayCart();
  renderGallery(galleryPostersArray);
  renderMovies(containerMainMovies, arrayAll);
  searchMovie();
});
