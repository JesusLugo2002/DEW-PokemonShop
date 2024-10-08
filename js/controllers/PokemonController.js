import PokemonModel from "../models/PokemonModel.js";
import PokemonView from "../views/PokemonView.js";

export default class PokemonController {
    constructor() {
        this.model = new PokemonModel();
        this.view = new PokemonView();
        this.init();
    }

    // Inicializa la aplicación en varios pasos 
    async init() {
        await this.model.loadPokemons();
        this.view.hideLoading();
        this.view.displayPokemons(this.model.getAllPokemons())
        this.setClickables();
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
}