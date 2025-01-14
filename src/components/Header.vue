<template>
    <header>
        <nav>
            <RouterLink to="/">Produkter</RouterLink>
            <RouterLink to="/login">Logga in</RouterLink>
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