<template>
    <h1>Tebutiken</h1>
    <!-- Loopar igenom alla produkter och skriver ut dem en och en till Products-komponenten, varje produkt skickas som en prop till Movie-komponenten -->
    <Products v-for="product in products" :product="product" :key="product._id" />
</template>

<script>
import Products from '../components/Products.vue';

export default {
    //Skapa dataobjekt
    data() {
        return {
            //Array som lagrar alla produkter som hämtas
            products: []
        }
    },
    components: {
        Products
    },
    methods: {
        //Hämtar alla produkter från en extern webbtjänst
        async fetchProducts() {
            try {
                //Skickar en GET-förfrågan för att hämta produkter
                const res = await fetch("http://localhost:5000/products", {
                    headers: {
                        "Accept": "application/json"
                    },
                    credentials: "include"
                })
                const data = await res.json()
                if (res.ok) {
                    //Fyll products-arrayen med hämtad data
                    this.products = data;
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.fetchProducts();
    }

}

</script>