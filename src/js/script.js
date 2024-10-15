import PokemonController from "./controllers/PokemonController.js";
import UserController from "./controllers/UserController.js"

document.addEventListener("DOMContentLoaded", () => {
    const userController = new UserController();
    const pokemonController = new PokemonController();
});