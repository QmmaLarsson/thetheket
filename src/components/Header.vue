<template>
    <header>
        <nav>
            <RouterLink to="/">Produkter</RouterLink>
            <RouterLink to="/add-product">Lägg till ny produkt</RouterLink>
            <Logout />
        </nav>
    </header>
</template>

<script>
import Logout from './Logout.vue';

export default {
    name: "Header",
    components: {
        Logout
    }
};
</script>