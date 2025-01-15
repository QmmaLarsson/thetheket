<template>
    <form @submit.prevent="loginUser" class="border border-black w-full max-w-[800px]">
        <label for="username"><strong>Användarnamn:</strong></label>
        <br>
        <!-- Two-way binding mellan inputfältet och reaktiv data (username) -->
        <input v-model="username" type="text" id="username" name="username">
        <br><br>
        <label for="password"><strong>Lösenord:</strong></label>
        <br>
        <!-- Two-way binding mellan inputfältet och reaktiv data (password) -->
        <input v-model="password" type="password" id="password" name="password" required>
        <br><br>
        <button type="submit">Logga in</button>
        <p v-if="error" class="error">{{ error }}</p>
    </form>
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