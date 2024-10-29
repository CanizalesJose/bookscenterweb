<template>
    <HeaderComponent></HeaderComponent>
    <div class="container center">
        <h3>Mi Usuario</h3>
        <div class="divider"></div>
    </div>
    <div class="container center">
        <div class="row">
            <div class="col s5">
                <div class="container left-align">
                    {{ user }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import router from '@/router';
import axios from 'axios';
import { inject, onBeforeMount, onMounted, ref } from 'vue';

const verifyUser = inject('verifyUser');
// eslint-disable-next-line
const user = ref({username: null, usertype: null, contactNumber: null, email: null, penalized: null});

onBeforeMount(async () => {
    if (!await verifyUser()){
        M.toast({html: 'Debes estar autenticado para acceder', classes: 'red'});
        router.push('/');
        return;
    }
    await fetchUserData();
});
onMounted(async () => {

});

function fetchUserData(){
    axios.get(`${process.env.VUE_APP_API_URL}/users/find/me`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        user.value.username = res.data.user.username;
        user.value.usertype = res.data.user.usertype;
        user.value.contactNumber = res.data.user.contactNumber;
        user.value.email = res.data.user.email;
        user.value.penalized = res.data.user.penalized;
    })
    .catch(error => {
        M.toast({html: `Error en petición: ${error.message}`, classes: 'red'});
    });
}
</script>

<style scoped>
.row{
    padding-top: 5vh;
}
.responsive-table{
    overflow-x: auto;
}
table th, table td {
    text-align: center;
    vertical-align: middle;
    padding: 10px;
}
.modalContainer{
    padding-left: 5%;
    padding-right: 5%;
}
.listCover {
    width: 100px;
}
.parallax-container {
    height: 200px;
}
</style>