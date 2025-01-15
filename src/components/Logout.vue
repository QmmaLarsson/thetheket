<template>
    <button @click="logoutUser">Logga ut</button>
</template>

<script>
export default {
    name: "Logout",
    methods: {
        async logoutUser() {

            try {
                //Skickar en GET-förfrågan för att logga in
                const res = await fetch("https://projektfullstackramverk.onrender.com/users/logout", {
                    method: "GET",
                    credentials: "include"
                })

                if (res.ok) {
                    //Om utloggningen lyckas skickas användaren till login-sidan
                    this.$router.push("/login");
                }
            } catch (error) {
                console.error("Fel vid utloggning:", error)
            }
        }
    }
}
</script>