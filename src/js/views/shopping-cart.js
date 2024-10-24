import DBConnection from "../models/database.js"
import PokemonModel from "../models/PokemonModel.js"

const database = new DBConnection()
const pokemonModel = new PokemonModel()
const userId = window.location.search.substring(4)
const userFile = await database.getFile(userId)
const shoppingCart = userFile["shoppingCart"]
const itemsList = document.getElementById("items-list")
let totalPrice = 0;

for (const item of shoppingCart) {
    const pokemon = await pokemonModel.fetchPokemon(item)
    totalPrice += parseFloat(pokemon.price)
    itemsList.innerHTML += `
    <li id="${pokemon.id}" class="list-group-item d-flex justify-content-between">
        <p>Pokemon #${pokemon.id} - ${pokemon.name} - ${pokemon.price}€</p>
        <button class="btn btn-danger remove-button">Remove</button>
    </li>`
}

$(".remove-button").click(function() {
    const pokemonId = $(this).parents("li").attr("id")
});

const accountBalance = document.getElementById("account-balance")
accountBalance.textContent = `${userFile.balance}€`
const totalPriceSpan = document.getElementById("total-price")
totalPriceSpan.textContent = `${totalPrice}€`
