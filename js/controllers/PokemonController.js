import PokemonModel from "../models/PokemonModel.js";
import PokemonView from "../views/PokemonView.js";

export default class PokemonController {
    constructor() {
        this.model = new PokemonModel();
        this.view = new PokemonView();
        this.wishlist = [];
        this.shoppingCart = [];
        this.init();
    }

    // Inicializa la aplicación en varios pasos 
    async init() {
        await this.model.loadPokemons();
        this.view.hideLoading();
        this.view.displayPokemons(this.model.getAllPokemons())
        this.bindingEvents();
    }

    async bindingEvents() {

        // Añade selección a las cartas de Pokemon
        const pokemonCards = document.getElementsByClassName("pokemon-card")
        for (let card of pokemonCards) {
            card.addEventListener("click", () => {
                if (card.className === "pokemon-card") {
                    card.className = "pokemon-card selected-card";
                } else {
                    card.className = "pokemon-card";
                }
            });
        }

        // Add to wishlist function
        const btnAddToWishlist = document.getElementById("add-to-wishlist");
        btnAddToWishlist.addEventListener("click", this.addToWishlist.bind(this));

        // Show wishlist function
        const btnWishlist = document.getElementById("wishlist");
        btnWishlist.addEventListener("click", this.showWishlist.bind(this));

        // Add to shopping cart
        const btnAddToShoppingCart = document.getElementById("add-to-shopping-cart");
        btnAddToShoppingCart.addEventListener("click", this.addToShoppingCart.bind(this));

        // Show shopping cart
        const btnShoppingCart = document.getElementById("shopping-cart");
        btnShoppingCart.addEventListener("click", this.showShoppingCart.bind(this))
    }

    addToWishlist() {
        console.log("Selected Pokemons added to wishlist!")
        const selectedCards = document.getElementsByClassName("selected-card")
        Array.from(selectedCards).forEach(card => {
            if (!this.wishlist.includes(card.id)) {
                this.wishlist.push(card.id)
            } else {
                alert(`Warning: Pokemon #${card.id} already in wishlist. Not added.`)
            }
            card.className = "pokemon-card"
        });
    }

    showWishlist() {
        let text = "Wishlist:\n\n"
        this.wishlist.forEach((id) => {
            text += `- Pokemon #${id}: ${this.model.getAllPokemons()[id-1].name} | ${this.model.getAllPokemons()[id-1].price}$ \n`
        });
        alert(text)
    }

    addToShoppingCart() {
        console.log("Selected Pokemons added to shopping cart!")
        const selectedCards = document.getElementsByClassName("selected-card")
        Array.from(selectedCards).forEach(card => {
            if (!this.shoppingCart.includes(card.id)) {
                this.shoppingCart.push(card.id)
            } else {
                alert(`Warning: Pokemon #${card.id} already in shopping cart. Not added.`)
            }
            card.className = "pokemon-card"
        });
    }

    showShoppingCart() {
        let text = "Shopping cart:\n\n"
        this.shoppingCart.forEach((id) => {
            text += `- Pokemon #${id}: ${this.model.getAllPokemons()[id-1].name} | ${this.model.getAllPokemons()[id-1].price}$ \n`
        });
        alert(text)
    }
}