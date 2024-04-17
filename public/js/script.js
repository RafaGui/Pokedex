const namePokemon = document.querySelector(".pokemon-name");
const idPokemon = document.querySelector(".pokemon-id");
const typePokemon = document.querySelector(".pokemon-tipe");
const imagePokemon = document.querySelector(".pokemon-image");
const form = document.querySelector(".filter");
const input = document.querySelector("#pokemon");

var LocaleID = 1;

const APIrequire = async (pokemon) => {
  const fetchAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const dataFetchAPI = await fetchAPI.json();
  return dataFetchAPI;
};

const renderPokemon = async (response) => {
  namePokemon.textContent = "Loading...";

  let dataPokemon = await APIrequire(response);

  if (dataPokemon) {
    namePokemon.textContent = dataPokemon["name"];
    idPokemon.textContent = dataPokemon["id"];
    typePokemon.textContent = dataPokemon["types"]["0"]["type"]["name"];
    imagePokemon.src =
      dataPokemon["sprites"]["other"]["showdown"]["front_shiny"];
    imagePokemon.style.display = "block";
    input.value = "";
    LocaleID = dataPokemon['id'];
  } else {
    imagePokemon.style.display = "none";
    namePokemon.textContent = "Not Found";
    idPokemon.textContent = "";
    typePokemon.textContent = "";
  }
};
  // BTN NEXT
  const btnNext = document.querySelector(".btn-next").addEventListener("click", () => {
    LocaleID += 1;
    console.log(LocaleID);
    renderPokemon(LocaleID);
  });

// BTN PREV
const btnPrev = document
  .querySelector(".btn-prev")
  .addEventListener("click", () => {
    if (LocaleID > 1) {
      LocaleID -= 1;
      renderPokemon(LocaleID);
    }
  });

// FORM DE BUSCA
form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});
renderPokemon(LocaleID);
console.log(LocaleID);
