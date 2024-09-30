<template>
    <HeaderComponent></HeaderComponent>
    <h3 class="center">Prestamos</h3>
    <div class="container">
        <br>
        <h3>Página en desarrollo</h3>
        <br>
        <p>Lo sentimos, la página que buscas se encuentra en desarrollo y todavía no está lista</p>
        <a href="/" class="waves-effect waves-light btn">Volver al inicio</a>
    </div>
</template>

<script setup>
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import axios from 'axios';
verifyAdmin();

async function verifyAdmin(){
    if (!localStorage.getItem('token')){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('usertype');
        M.toast({html: 'Página protegida: accede con un usuario administrador', classes: 'yellow darken-4'});
        router.push('/login');
    }else{
        try {
            await axios('http://localhost:5000/api/users/validAdmin',{
                headers: {
                    token: localStorage.getItem('token')
                }
            });
        } catch (error) {
            if (error.status == 401){
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('usertype');
                M.toast({html: 'Sesión caducada: accede con un usuario administrador', classes: 'yellow darken-4'});
                router.push('/login');
            }
            if (error.status == 403){
                M.toast({html: 'Página protegida: solo administradores', classes: 'yellow darken-4'});
                router.push('/');
            }
        }
    }
}

</script>