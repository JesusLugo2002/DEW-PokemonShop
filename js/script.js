import Pokemon from "./Pokemon.js";
let totalPokemons = []

// Inicialización de la aplicación
const initButton = document.getElementById("init-button");
const inputBar = document.getElementById("input-bar");
const pokedex = document.getElementById("pokedex");

initButton.addEventListener('click', () => {
    initButton.style.visibility = 'hidden';
    inputBar.style.visibility = 'visible';
    getPokemons();
});

// Descarga y guardado de datos desde API
async function getPokemons() {
    const loadingDataText = document.getElementById("loading-data-text");
    loadingDataText.style.visibility = 'visible';
    for (var i = 1; i <= 151; i++) {
        try {
            await fetch("https://pokeapi.co/api/v2/pokemon/" + i + "/")
            .then((result) => {return result.json()})
            .then((data) => {totalPokemons.push(new Pokemon(data))})
        } catch(error) {
            alert(error);
        }
    }
    loadingDataText.remove();
    showPokemons(totalPokemons);
}

// Muestra de la Pokedex
function showPokemons(pokemons) {
    pokedex.innerHTML = ''
    for (const pokemon of pokemons) {
        getPokemonCard(pokemon)
    }
}

function getPokemonCard(pokemon) {
    let typesLine = 'Type: ';
    for (let type of pokemon.types) {
        typesLine += `${type.type.name} `
    }
    pokedex.innerHTML += `
    <div class="pokemon">
        <p>${pokemon.id}. ${pokemon.name}</p>
        <img src="${pokemon.sprite}">
        <p class='pokemon-types'>${typesLine}</p>
    </div>`
}

// Filtrado por nombre de Pokedex
const nameFilter = document.getElementById('name-filter')
nameFilter.addEventListener('input', () => {filterPokedex(nameFilter.value)})

function filterPokedex(query) {
    let pokemonsCopy = JSON.parse(JSON.stringify(totalPokemons));
    let filteredPokemons = pokemonsCopy.filter((pokemon) => pokemon.name.includes(query));
    showPokemons(filteredPokemons);
}