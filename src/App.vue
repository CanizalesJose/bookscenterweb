<template>
  <div class="app-container">
    <router-view/>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script setup>
/* global M */
import {provide} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import FooterComponent from './components/FooterComponent.vue';
const router = useRouter();

function clearSession(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('usertype');
}

async function verifyAdmin(){
  let valid = false;
    if (!localStorage.getItem('token')){
        clearSession();
        M.toast({html: 'Página protegida: accede con un usuario administrador', classes: 'yellow darken-4'});
        router.push('/login');
        valid = false;
    }else{
        await axios.get(`${process.env.VUE_APP_API_URL}/users/validAdmin`,{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            if (res.status == 200)
                valid = true;
        })
        .catch(error => {
            if (error.code=='ERR_NETWORK'){
                M.toast({html: `${error.message}: No se puede conectar a la API`, classes: 'yellow darken-4'});
                router.push('/');
            }
            if (error.status == 401){
                M.toast({html: `Sesión caducada, volver a inicar sesión`, classes: 'yellow darken-4'});
                clearSession();
                router.push('/login');
            }
            if (error.status == 403){
                M.toast({html: `Privilegios insuficientes: inciar sesión con usuario con privilegios`, classes: 'yellow darken-4'});
                router.push('/')
            }
            valid = false;
        });
    }
    return valid;
}

async function verifyWorker(){
    let valid = false;
    if (!localStorage.getItem('token')){
        clearSession();
        M.toast({html: 'Página protegida: accede con un usuario con privilegios', classes: 'yellow darken-4'});
        router.push('/login');
        valid = false;
    }else{
        await axios.get(`${process.env.VUE_APP_API_URL}/users/validWorker`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            if (res.status == 200)
                valid = true;
            
        })
        .catch(error => {
            M.toast({html: `${error}`});
            if (error.code=='ERR_NETWORK'){
                M.toast({html: `${error.message}: No se puede conectar a la API`, classes: 'yellow darken-4'});
                router.push('/');
            }
            if (error.status == 401){
                M.toast({html: `Sesión caducada, volver a inicar sesión`, classes: 'yellow darken-4'});
                clearSession();
                router.push('/login');
            }
            if (error.status == 403){
                M.toast({html: `Privilegios insuficientes: inciar sesión con usuario con privilegios`, classes: 'yellow darken-4'});
                router.push('/')
            }
            valid = false;
        });
    }
    return valid;
}

async function verifyUser(){
    let pass = false;
    if (!localStorage.getItem('token'))
        return false;
    return axios.get(`${process.env.VUE_APP_API_URL}/users/validToken`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('usertype', res.data.user.usertype);
        pass = true;
        return pass;
    })
    .catch(error => {
        if (error.code=='ERR_NETWORK'){
                M.toast({html: `${error.message}: No se puede conectar a la API`, classes: 'yellow darken-4'});
                clearSession();
                router.push('/');
                pass = false;
        }
        if (error.status == 401){
            M.toast({html: `Sesión caducada, volver a inicar sesión`, classes: 'yellow darken-4'});
            clearSession();
            router.push('/login');
            pass = false;
        }
        return pass;
    });
}

provide('verifyUser', verifyUser);
provide('verifyWorker', verifyWorker);
provide('verifyAdmin', verifyAdmin);
</script>

<style>
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.page-footer {
    margin-top: auto;
}
</style>