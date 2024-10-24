import DBConnection from "../models/database.js"
import PokemonModel from "../models/PokemonModel.js"

const database = new DBConnection()
const pokemonModel = new PokemonModel()
const userId = window.location.search.substring(4)
const userFile = await database.getFile(userId)
const shoppingCart = userFile["shoppingCart"]
let inventory = userFile["inventory"]
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

$(".remove-button").click(async function() {
    let new_shopping_cart = []
    const pokemonId = $(this).parents("li").attr("id")
    for (let index = 0; index < shoppingCart.length; index++) {
        if (pokemonId != shoppingCart[index]) {
            new_shopping_cart.push(shoppingCart[index])
        }        
    }
    
    await database.update(userId, {
        shoppingCart: new_shopping_cart
    });
    location.reload()
});

$(".buy-button").click(async function() {
    if (totalPrice <= userFile.balance) {
        for (let item of shoppingCart) {
            inventory.push(item)
        }
        await database.update(userId, {
            shoppingCart: [],
            balance: userFile["balance"] - totalPrice,
            inventory: inventory
        });
        location.reload()
    } else {
        alert("There isn't sufficient balance in the account")
    }
});

const accountBalance = document.getElementById("account-balance")
accountBalance.textContent = `${userFile.balance}€`
const totalPriceSpan = document.getElementById("total-price")
totalPriceSpan.textContent = `${totalPrice}€`
