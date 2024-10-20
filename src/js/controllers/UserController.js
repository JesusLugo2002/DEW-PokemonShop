import DBConnection from "../models/database.js";

export default class UserController {
    constructor() {
        this.database = new DBConnection()
        this.id;
        this.username;
        this.password;
        this.balance;
        this.inventory;
        this.shoppingCart;
        this.wishlist;
    }

    async fetchData(id) {
        const allUsers = await this.database.readAll()
        for (let user of allUsers) {
            if (user["id"] == id) {
                this.id = user["id"]
                this.username = user["username"];
                this.password = user["password"];
                this.balance = user["balance"];
                this.inventory = user["inventory"];
                this.shoppingCart = user["shoppingCart"]
                this.wishlist = user["wishlist"]
                return
            }
        }
    }

    async updateWishlist() {
        await this.database.update(this.id, {wishlist: this.wishlist})
    }

    async updateShoppingCart() {
        await this.database.update(this.id, {shoppingCart: this.shoppingCart})
    }

    printData() {
        console.log(this)
    }
}