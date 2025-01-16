<template>
   <div class="flex justify-center mb-8">
    <form @submit.prevent="loginUser" class="m-4 p-4 w-full max-w-[600px] bg-white rounded-lg shadow-lg">
        <p class="p-4">
        <label for="username" class="font-semibold"><strong>Användarnamn:</strong></label>
        <br>
        <!-- Two-way binding mellan inputfältet och reaktiv data (username) -->
        <input v-model="username" type="text" id="username" name="username" class="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        </p>
        <p class="p-4">
        <label for="password" class="font-semibold"><strong>Lösenord:</strong></label>
        <br>
        <!-- Two-way binding mellan inputfältet och reaktiv data (password) -->
        <input v-model="password" type="password" id="password" name="password" class="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
        </p>
        <div class="p-4">
        <button type="submit" class="bg-green-800 text-white font-bold py-2 px-4 rounded min-w-[110px] transition-all duration-300 ease-in-out hover:scale-105">Logga in</button>
        </div>
         <!-- Innehållet uppdateras om error finns -->
        <p v-if="error" class="error text-red-600 font-bold text-center m-4">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
    name: "Login",
    //Skapa ett reaktivt dataobjekt
    data() {
        return {
            username: "",
            password: "",
            error: null
        }
    },
    methods: {
        async loginUser() {
        //Kontrollera att användarnamn och lösenord inte är tomma
        if (!this.username.trim() || !this.password.trim()) {
            this.error = "Användarnamn och lösenord måste fyllas i";
            return;
            }

            let user = { 
                username: this.username,
                password: this.password
            }

            try {
                //Skickar en POST-förfrågan för att logga in
                const res = await fetch("https://projektfullstackramverk.onrender.com/users/login", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify(user),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                })

                if (res.ok) {
                    //Om inloggingen lyckas skickas användaren till produkt-sidan
                    this.$router.push("/");
                } else {
                    //Om inloggingen misslyckas visas ett felmeddelande
                    this.error = "Fel användaruppgifter"
                }
            } catch (error) {
                console.error("Fel vid inloggning:", error)
            }
        }
    }
}
</script>