import DBConnection from "./models/database.js";
import UserController from "./controllers/UserController.js";

const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const database = new DBConnection()

loginButton.addEventListener("click", login);

signupButton.addEventListener("click", register);

async function login() {
    const inputUsername = document.getElementById("login-username").value;
    const inputPassword = document.getElementById("login-password").value;

    const allUsers = await database.readAll()

    for (const user of allUsers) {
        if (user["username"] == inputUsername && user["password"] == inputPassword) {
            const userController = new UserController(user)
            window.open("shop.html")
        }
    }
}

async function register() {
    console.log("pipipi")
}

signupButton.addEventListener("click", function(e) {

});