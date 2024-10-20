import DBConnection from "./models/database.js";

const database = new DBConnection()
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");

loginButton.addEventListener("click", login);

signupButton.addEventListener("click", register);

async function login() {
    const inputUsername = document.getElementById("login-username").value;
    const inputPassword = document.getElementById("login-password").value;

    const allUsers = await database.readAll()

    for (const user of allUsers) {
        if (user["username"] == inputUsername && user["password"] == inputPassword) {
            window.open(`shop.html?id=${user["id"]}`)
            return
        }
    }
}


async function register() {
    console.log("pipipi")
}

signupButton.addEventListener("click", function(e) {

});