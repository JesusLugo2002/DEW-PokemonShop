import DBConnection from "../models/database.js"
import PokemonModel from "../models/PokemonModel.js"

const database = new DBConnection()
const pokemonModel = new PokemonModel()
const userId = window.location.search.substring(4)
const userFile = await database.getFile(userId)
const inventory = userFile["inventory"]
const itemsList = document.getElementById("items-list")

for (const item of inventory) {
    const pokemon = await pokemonModel.fetchPokemon(item)
    itemsList.innerHTML += `
    <li id="${pokemon.id}" class="list-group-item d-flex justify-content-between">
        <p><b>#${pokemon.id} ${pokemon.name}</b><p>
        <p>${pokemon.price}€</p>
    </li>`
}

$("#username").text(userFile["username"])
$("#my-balance").text(`${userFile["balance"]}€`)