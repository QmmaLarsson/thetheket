<template>
    <form @submit.prevent="loginUser" class="border border-black w-full max-w-[800px]">
        <p v-if="error" class="error">{{ error }}</p>
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
            //KONYTROLLERA så inte input är tomt
            let user = {
                username: this.username,
                password: this.password
            }

            try {
                //Skickar en POST-förfrågan för att logga in
                const res = await fetch("http://localhost:5000/users/login", {
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
                console.log(error)
            }
        }
    }
}
</script>