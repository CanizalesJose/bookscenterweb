<template>
    <h1>Redireccionando</h1>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

router.push('/');
</script>