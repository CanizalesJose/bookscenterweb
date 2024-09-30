<template>
  <div>
    <router-view/>
  </div>
</template>

<script setup>
/* global M */
import {provide} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();


async function verifyAdmin(){
  let valid = false;
    if (!localStorage.getItem('token')){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('usertype');
        M.toast({html: 'Página protegida: accede con un usuario administrador', classes: 'yellow darken-4'});
        router.push('/login');
        valid = false;
    }else{
        await axios('http://localhost:5000/api/users/validAdmin',{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            if (res.status == 200)
                valid = true;
        })
        .catch(error => {
            if (error.status == 401){
                M.toast({html: `Sesión caducada, volver a inicar sesión`, classes: 'red lighten-1'});
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('usertype');
                router.push('/login');
            }
            if (error.status == 403){
                M.toast({html: `Privilegios insuficientes: inciar sesión con usuario administrador`, classes: 'red lighten-1'});
                router.push('/')
            }
            valid = false;
        });
    }
    return valid;
}

provide('verifyAdmin', verifyAdmin);
</script>
