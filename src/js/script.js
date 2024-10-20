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
    const inputUsername = document.getElementById("signup-username").value
    const inputPassword = document.getElementById("signup-password").value
    const repeatPassword = document.getElementById("signup-r-password").value

    const allUsers = await database.readAll()

    for (const user of allUsers) {
        if (user["username"] == inputUsername) {
            alert("Error: Username already used! Please use another username...")
            return
        }
    } 

    if (inputPassword == repeatPassword) {
        const data = {
            username: inputUsername,
            password: inputPassword,
            balance: 10000,
            wishlist: [],
            inventory: [],
            shoppingCart: []
        }
        await database.addFile(data)
        alert(`New user ${inputUsername} created! Please login into the shop...`)
    } else {
        alert("Password don't matches!")
    }
}

signupButton.addEventListener("click", function(e) {

});