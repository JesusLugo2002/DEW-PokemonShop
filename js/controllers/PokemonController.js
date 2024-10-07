import PokemonModel from "../models/PokemonModel.js";
import PokemonView from "../views/PokemonView.js";

export default class PokemonController {
    constructor() {
        this.model = new PokemonModel();
        this.view = new PokemonView();
    }

    async init() {
        await this.model.loadPokemons();
        this.view.hideLoading();
        this.view.displayPokemons(this.model.getAllPokemons())
    }
}