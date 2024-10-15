export default class UserView {
    constructor() {
        this.container = document.getElementById("profile-container");
    }

    showProfile(user) {
        this.container.innerHTML = `
        <b>${user.username}</b>
        <p style="color: green;">Balance: ${user.balance}$</p>
        <button id="logout-button">Log Out</button>
        `
    }

    showLogin() {
        this.container.innerHTML = `
        <label for="username-input">Username: </label>
        <input type="text" name="username"><br>
        <label for="password-input">Password: </label>
        <input type="password" name="password"><br>
        <input type="submit" value="Login">
        `
    }
}