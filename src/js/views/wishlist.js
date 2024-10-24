import DBConnection from "../models/database.js"
import PokemonModel from "../models/PokemonModel.js"

const database = new DBConnection()
const pokemonModel = new PokemonModel()
const userId = window.location.search.substring(4)
const userFile = await database.getFile(userId)
const wishlist = userFile["wishlist"]
let shoppingCart = userFile["shoppingCart"]
const itemsList = document.getElementById("items-list")

for (const item of wishlist) {
    const pokemon = await pokemonModel.fetchPokemon(item)
    itemsList.innerHTML += `
    <li id="${pokemon.id}" class="list-group-item d-flex justify-content-between">
        <p>Pokemon #${pokemon.id} - ${pokemon.name} - ${pokemon.price}€</p>
        <div>
            <button class="btn btn-success to-shop-button">Add to shopping cart</button>
            <button class="btn btn-danger remove-button">Remove</button>
        </div>
    </li>`
}

$(".remove-button").click(async function() {
    let new_wishlist = []
    const pokemonId = $(this).parents("li").attr("id")
    for (let index = 0; index < wishlist.length; index++) {
        if (pokemonId != wishlist[index]) {
            new_wishlist.push(wishlist[index])
        }        
    }
    await database.update(userId, {
        wishlist: new_wishlist
    });
    location.reload()
});

$(".to-shop-button").click(async function() {
    let new_wishlist = []
    const pokemonId = $(this).parents("li").attr("id")
    shoppingCart.push(pokemonId)
    for (let index = 0; index < wishlist.length; index++) {
        if (pokemonId != wishlist[index]) {
            new_wishlist.push(wishlist[index])
        }        
    }
    await database.update(userId, {
        wishlist: new_wishlist,
        shoppingCart: shoppingCart
    });
    location.reload()
});