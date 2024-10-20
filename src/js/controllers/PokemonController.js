import PokemonModel from "../models/PokemonModel.js";
import PokemonView from "../views/PokemonView.js";
import UserController from "./UserController.js";

export default class PokemonController {
    constructor() {
        this.model = new PokemonModel();
        this.view = new PokemonView();
        this.user = new UserController();
        this.init()
    }

    // Inicializa la aplicación en varios pasos 
    async init() {
        await this.model.loadPokemons();
        const urlParameter = window.location.search.substring(4)
        await this.user.fetchData(urlParameter)
        this.view.hideLoading();
        this.view.displayUser(this.user)
        this.view.displayPokemons(this.model.getAllPokemons())
        this.bindingEvents();
    }

    async bindingEvents() {

        // Añade selección a las cartas de Pokemon
        this.setCardClickables();

        // Name filter
        const nameFilter = document.getElementById("filter-by-name");
        nameFilter.addEventListener("input", this.filterPokemons.bind(this))

        // Type filter
        const typeFilter = document.getElementById("filter-by-type");
        typeFilter.addEventListener("input", this.filterPokemons.bind(this))

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

    setCardClickables() {
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
    }

    addToWishlist() {
        console.log("Selected Pokemons added to wishlist!")
        const selectedCards = Array.from(document.getElementsByClassName("selected-card"))
        selectedCards.forEach(card => {
            if (!this.user.wishlist.includes(card.id)) {
                this.user.wishlist.push(card.id)
            } else {
                alert(`Warning: Pokemon #${card.id} already in wishlist. Not added.`)
            }
            card.className = "pokemon-card"
        });
        this.user.updateWishlist()
    }

    showWishlist() {
        window.open(`./wishlist.html?id=${this.user.id}`)
    }

    addToShoppingCart() {
        console.log("Selected Pokemons added to shopping cart!")
        const selectedCards = Array.from(document.getElementsByClassName("selected-card"))
        selectedCards.forEach(card => {
            if (!this.user.shoppingCart.includes(card.id)) {
                this.user.shoppingCart.push(card.id)
            } else {
                alert(`Warning: Pokemon #${card.id} already in shopping cart. Not added.`)
            }
            card.className = "pokemon-card"
        });
        this.user.updateShoppingCart();
    }

    showShoppingCart() {
        window.open(`./shopping-cart.html?id=${this.user.id}`)
    }

    filterPokemons() {
        const nameFilterValue = document.getElementById("filter-by-name").value.toLowerCase();
        const typeFilterValue = document.getElementById("filter-by-type").value.toLowerCase();

        const filteredPokemons = this.model.getAllPokemons().filter((pokemon) => {
            const matchName = pokemon.name.toLowerCase().includes(nameFilterValue);
            const matchType = pokemon.types.some(type => type.type.name.toLowerCase().includes(typeFilterValue));

            return matchName && matchType
        });

        this.view.displayPokemons(filteredPokemons);
        this.setCardClickables();
    }
}