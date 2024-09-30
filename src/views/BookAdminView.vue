<template>
    <HeaderComponent></HeaderComponent>
    <h1 class="center">Libros</h1>
    <div class="container">
        <br>
        <h3>Página en desarrollo</h3>
        <br>
        <p>Lo sentimos, la página que buscas se encuentra en desarrollo y todavía no está lista</p>
        <a href="/" class="waves-effect waves-light btn">Volver al inicio</a>
    </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted, inject } from 'vue';

const verifyAdmin = inject('verifyAdmin');

onMounted(async () => {
    if (!await verifyAdmin())
        return;

});


</script>