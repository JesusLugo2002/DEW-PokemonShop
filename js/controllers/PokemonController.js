import PokemonModel from "../models/PokemonModel.js";
import PokemonView from "../views/PokemonView.js";

export default class PokemonController {
    constructor() {
        this.model = new PokemonModel();
        this.view = new PokemonView();
        this.init();
        this.addToWishlistButton = document.getElementById("add-to-wishlist");
        this.wishlistButton = document.getElementById("wishlist");
        this.addToShoppingCart = document.getElementById("add-to-shopping-cart");
        this.shoppingCartButton = document.getElementById("shopping-cart");
    }

    // Inicializa la aplicación en varios pasos 
    async init() {
        await this.model.loadPokemons();
        this.view.hideLoading();
        this.view.displayPokemons(this.model.getAllPokemons())
        this.setClickables();
        this.setButtons();
    }

    // Añade selección a las cartas de Pokemon
    setClickables() {
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

    // Configurar la función de los botones

    setButtons() {
        this.addToWishlistButton.addEventListener("click", () => {
            let selectedPokemons = document.getElementsByClassName("selected-card")
            for (let pokemon of selectedPokemons) {
                console.log(pokemon);
            }
        });

        this.wishlistButton.addEventListener("click", () => {
            // ToDo: Mostrar una lista de los pokemons deseados
        });

        this.addToShoppingCart.addEventListener("click", () => {
            let selectedPokemons = document.getElementsByClassName("selected-card")
            for (let pokemon of selectedPokemons) {
                console.log(pokemon);
            }
        });

        this.shoppingCartButton.addEventListener("click", () => {
            // ToDo: Mostrar una lista de los pokemons en el carrito de compra
        });
    }
}