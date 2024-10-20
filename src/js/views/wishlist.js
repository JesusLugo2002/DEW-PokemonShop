import DBConnection from "../models/database.js"
import PokemonModel from "../models/PokemonModel.js"

const database = new DBConnection()
const pokemonModel = new PokemonModel()
const userId = window.location.search.substring(4)
const userFile = await database.getFile(userId)
const wishlist = userFile["wishlist"]
const itemsList = document.getElementById("items-list")

for (const item of wishlist) {
    const pokemon = await pokemonModel.fetchPokemon(item)
    itemsList.innerHTML += `
    <li class="list-group-item">
        Pokemon #${pokemon.id} - ${pokemon.name} - ${pokemon.price}€
    </li>`
}