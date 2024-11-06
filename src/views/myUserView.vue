<template>
    <HeaderComponent></HeaderComponent>
    <div class="container center">
        <h3>Mi Cuenta</h3>
        <div class="divider"></div>
    </div>
    <div class="container center">
        <div class="row">
            <div class="col s5 left-align">
                <table>
                    <thead>
                        <tr>
                            <th>Username:</th>
                            <th>Tipo de usuario:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ user.username }}</td>
                            <td>{{ user.usertype }}</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <div class="input-field">
                    <input id="inputContactNumber" type="text" v-model="user.contactNumber">
                    <label for="inputContactNumber" class="active">Número de contacto:</label>
                </div>
                <div class="input-field">
                    <input id="inputEmail" type="text" v-model="user.email">
                    <label for="inputEmail" class="active">Correo electrónico:</label>
                </div>
                <div class="input-field">
                    <input class="tooltipped" placeholder="Contraseña actual" data-position="left" data-tooltip="Obligatorio" id="inputCurrentPassword" type="password" v-model="user.currentPassword">
                    <label for="inputCurrentPassword" class="active">Contraseña actual:</label>
                </div>
                <div class="input-field">
                    <input class="tooltipped" placeholder="Nueva contraseña (opcional)" data-position="left" data-tooltip="Dejar vacío para no cambiar" id="inputPassword" type="password" v-model="user.password">
                    <label for="inputPassword" class="active">Nueva contraseña:</label>
                </div>
                <br>
                <div class="center">
                    <p><b>Modificar datos:</b></p>
                    <button data-target="confirmUpdateModal" class="btn-floating btn-large waves-effect waves-light black modal-trigger">
                        <i class="material-icons">arrow_forward</i>
                    </button>
                </div>
            </div>
            <div class="col s7 center">
                <div v-if="loansList.length == 0">
                    <img style="width: 200px;" src="../assets/img/sinPrestamosUsuario.jpg">
                    <h6>Sin registro de libros prestados</h6>
                </div>
                <div class="tableContainer">
                    <table v-if="loansList.length > 0" class="centered">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Entrega</th>
                                <th>Portada</th>
                                <th>Titulo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="loan in loansListPagination" :key="loan.loanId">
                                <td>
                                    <i v-if="!loan.returned" class="material-icons">alarm</i>
                                    <i v-if="loan.returned" class="material-icons">check</i>
                                </td>
                                <td>{{ loan.returnDate }}</td>
                                <td>
                                    <img :src="loan.cover" class="listCover materialboxed" @load="initMaterialBoxed()">
                                </td>
                                <td>{{ loan.title }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul v-if="loansList.length > 0" class="pagination">
                    <li class="waves-effect" :class="{ 'disabled': currentPage === 1 }">
                        <a href="#" @click.prevent="changePage(currentPage - 1)">«</a>
                    </li>
                    <li v-for="page in pageCount" :key="page" class="waves-effect" :class="{ 'active': page === currentPage }">
                        <a href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="waves-effect" :class="{ 'disabled': currentPage === pageCount }">
                        <a href="#" @click.prevent="changePage(currentPage + 1)">»</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div id="confirmUpdateModal" class="modal">
        <div class="modal-content">
            <h4>Confirmar Actualización</h4>
            <p>¿Estas seguro de querer actualizar tus datos?</p>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">Cancelar</a>
            <a @click="updateUserData()" class="modal-close waves-effect waves-green btn-flat">Confirmar</a>
        </div>
    </div>
</template>

<script setup>
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import router from '@/router';
import axios from 'axios';
import { inject, onBeforeMount, onMounted, ref, computed } from 'vue';

const verifyUser = inject('verifyUser');
// eslint-disable-next-line
const user = ref({username: null, usertype: null, currentPassword: null, password:null, contactNumber: null, email: null, penalized: null});
const loansList = ref([]);
const checkEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
const checkNumber = /^[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

const currentPage = ref(1);
const rowsPerPage = 3;
const loansListPagination = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage;
    return loansList.value.slice(start, start + rowsPerPage);
});
const pageCount = computed(() => {
    return Math.ceil(loansList.value.length / rowsPerPage);
});
function changePage(page){
    if (page < 1 || page > pageCount.value)
        return;
    currentPage.value = page;
}


onBeforeMount(async () => {
    if (!await verifyUser()){
        M.toast({html: 'Debes estar autenticado para acceder', classes: 'red'});
        router.push('/');
        return;
    }
    await fetchUserLoans();
    await fetchUserData();
});
onMounted(async () => {
    initMaterialize();
});
function initMaterialize() {
    const tooltipElems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltipElems);
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
}
function initMaterialBoxed(){
    let elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
}
function fetchUserData(){
    axios.get(`${process.env.VUE_APP_API_URL}/users/findMe`, {
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
function fetchUserLoans(){
    axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchByUser`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        loansList.value = res.data;
    })
    .catch(error => {
        if (error.response)
                M.toast({html: `Error en petición: ${error.response.data.message}`, classes: 'yellow darken-4'});
            else
                M.toast({html: `Error: ${error.message}`, classes: 'red'});
    });
}
function updateUserData() {
    if (user.value.password && user.value.password.length == 0)
        user.value.password = null;
    if (!checkNumber.test(user.value.contactNumber)){
        M.toast({html: 'El número no cumple con el formato', classes: 'red'});
        return;
    }
    if (!checkEmail.test(user.value.email)){
        M.toast({html: 'El correo no cumple con el formato', classes: 'red'});
        return;
    }

    const data = {
        currentPassword: user.value.currentPassword,
        password: user.value.password,
        contactNumber: user.value.contactNumber,
        email: user.value.email
    }
    axios.patch(`${process.env.VUE_APP_API_URL}/users/updateClient`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(() => {
        M.toast({html: `Datos actualizados`, classes: 'green'});
        user.value.password = null;
        user.value.currentPassword = null;
    })
    .catch(error => {
        if (error.response)
            M.toast({html: `Error en petición: ${error.response.data.message}`, classes: 'yellow darken-4'});
        else
            M.toast({html: `Error: ${error.message}`, classes: 'red'});
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
    width: 75px;
    height: 100px;
}
.parallax-container {
    height: 200px;
}
.tableContainer {
    height: 450px;
}
</style>