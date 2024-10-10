import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkPpSJplvEVCmtTjSO2FHbjTfNLs_rhe8",
  authDomain: "dew-pokemonshop.firebaseapp.com",
  projectId: "dew-pokemonshop",
  storageBucket: "dew-pokemonshop.appspot.com",
  messagingSenderId: "190767219010",
  appId: "1:190767219010:web:5eb4aa40187ac9e775c8db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect with Firebase database
const db = getFirestore(app)

class DBConnection {
    constructor() {
        this.usersCollection = collection(db, "pokemon");
    }

    async addFile(data) {
        try {
            const docRef = await addDoc
        } catch (e) {
            console.error("Error añadiendo registro: ", e)
        }
    }
}