<template>
    <h5>Logout</h5>
</template>
<script setup>
    /* global M */
    import { onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router';
    const router = useRouter();

    onBeforeMount (() => {
        localStorage.clear();
        M.toast({html: 'Sesión cerrada', classes: 'red lighten-1'});
        router.push('/login');
    });
</script>