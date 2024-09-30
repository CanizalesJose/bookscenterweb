<template>
    <HeaderComponent></HeaderComponent>
</template>
<script setup>
    /* global M */
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import { onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router';
    const router = useRouter();

    onBeforeMount (() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');
        localStorage.removeItem('username');
        M.toast({html: 'Sesión cerrada', classes: 'deep-purple lighten-2'});
        router.push('/login');
    });
</script>