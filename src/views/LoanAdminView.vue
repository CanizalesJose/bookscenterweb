<template>
    <HeaderComponent></HeaderComponent>
    <!-- Titulo -->
    <div class="container">
        <div class="row">
            <div class="divider"></div>
            <div class="section center">
                <h3>Prestamos</h3>
                <br>
                <p>
                    Desde este apartado es posible ver y administrar los distintos libros que se encuentran prestados. En primer lugar aparecerán aquellos que se encuentren todavía sin retornar, y despues se encuentra un registro que muestra un registro de aquellos que ya han sido entregados.
                </p>
            </div>
            <div class="divider"></div>
        </div>
    </div>
    <!-- Imagen -->
    <div class="parallax-container">
        <div class="parallax">
            <img src="../assets/img/generalBackground04.jpg">
        </div>
    </div>
    <!-- Pendientes -->
    <div class="container">
        <div class="row">
            <div class="divider"></div>
            <div class="section center">
                <h3>Prestamos pendientes</h3>
            </div>
            <!-- Si no hay prestamos pendientes -->
            <div v-if="pendingLoans.length == 0" class="container center">
                <img style="width: 300px;" src="../assets/img/todo-bien.png">
                <h5>No hay prestamos pendientes</h5>
            </div>
            <!-- Tabla de prestamos pendientes -->
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th><!-- Portada --></th>
                        <th>Titulo</th>
                        <th>Prestamo Id.</th>
                        <th>ISBN</th>
                        <th>Autor</th>
                        <th>Estado</th>
                        <th>Usuario</th>
                        <th>Ver</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="loan in pendingLoans" :key="'pending'+loan.loanId+loan.bookId">
                        <td>
                            <img :src="loan.cover" class="listCover materialboxed" @load="initMaterialBoxed()">
                        </td>
                        <td>{{ loan.title }}</td>
                        <td>{{ loan.loanId }}</td>
                        <td>{{ loan.isbn }}</td>
                        <td>{{ loan.author }}</td>
                        <td>
                            <i v-if="loan.returned == 1" class="material-icons">check</i>
                            <i v-if="loan.returned == 0" class="material-icons">alarm</i>
                        </td>
                        <td>{{ loan.username }}</td>
                        <td>
                            <button @click="selectBook(loan.loanId, loan.bookId, loan.username, loan.contactNumber, loan.email, loan.date, loan.returnDate, loan.title, loan.author, loan.cover, loan.pending, loan.isbn)" class="btn-floating black modal-trigger" data-target="changeStatusModal">
                                <i class="material-icons">search</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Imagen -->
    <div class="parallax-container">
        <div class="parallax">
            <img src="../assets/img/generalBackground05.jpg">
        </div>
    </div>
    <!-- Registro -->
    <div class="container">
        <div class="row">
            <div class="section center">
                <h3>Historial de prestamos</h3>
            </div>
            <!-- Tabla de historial -->
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th><!-- Portada --></th>
                        <th>Titulo</th>
                        <th>Prestamo Id.</th>
                        <th>ISBN</th>
                        <th>Autor</th>
                        <th>Estado</th>
                        <th>Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="loan in returnedLoans" :key="'returned'+loan.loanId+loan.bookId">
                        <td>
                            <img :src="loan.cover" class="listCover materialboxed" @load="initMaterialBoxed()">
                        </td>
                        <td>{{ loan.title }}</td>
                        <td>{{ loan.loanId }}</td>
                        <td>{{ loan.isbn }}</td>
                        <td>{{ loan.author }}</td>
                        <td>
                            <i v-if="loan.returned == 1" class="material-icons">check</i>
                            <i v-if="loan.returned == 0" class="material-icons">alarm</i>
                        </td>
                        <td>{{ loan.username }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Si no hay registro -->
    <div v-if="returnedLoans.length == 0" class="container center">
        <img style="width: 300px;" src="../assets/img/todo-bien.png">
        <h5>No hay registro por mostrar</h5>
    </div>

    <div id="changeStatusModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>¿Confirmar entrega?</h4>
            <div class="divider"></div>
            <p>Solo presiona confirmar si estas seguro de querer cambiar el estado del libro prestado, ten en cuenta que no puede deshacerse.</p>
            <div class="row">
                <p><b>Id del Prestamo</b> - {{ selBook.loanId }}</p>
            </div>
            <div class="row">
                <div class="col s6 left-align">
                    <p><b>Fecha del prestamo</b> - {{ selBook.date }}</p>
                    <p><b>Pedido por</b> - {{ selBook.username }}</p>
                    <p><b>Correo:</b> {{ selBook.email }}</p>
                </div>
                <div class="col s6 right-align">
                    <p>{{ selBook.returnDate }} - <b>Fecha de entrega</b></p>
                    <p>{{ selBook.contactNumber }} - <b>Número</b></p>
                </div>
            </div>
            <table class="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img :src="selBook.cover" class="listCover materialboxed">
                        </td>
                        <td>{{ selBook.title }}</td>
                        <td>{{ selBook.author }}</td>
                        <td>{{ selBook.isbn }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <div class="divider"></div>
            <a class="modal-close waves-effect waves-red btn-flat">Cancelar</a>
            <a @click="confirmChangeStatus" class="waves-effect waves-light btn-flat">Confirmar Entrega</a>
        </div>
    </div>
</template>

<script setup>
/* global M */

import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
import { inject, onMounted, ref } from 'vue';
/* eslint-disable */
const verifyWorker = inject('verifyWorker');
const pendingLoans = ref([]);
const returnedLoans = ref([]);
const selBook = ref({
    loanId: null,
    bookId: null,
    username: null,
    contactNumber: null,
    email: null,
    date: null,
    returnDate: null,
    title: null,
    author: null,
    cover: null,
    pending: null,
    isbn: null
});

onMounted(async () => {
    if (!await verifyWorker())
        return;
    await fetchPending();
    await fetchReturned();
    await initMaterialize();
});

async function initMaterialize() {
    const parallaxElems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallaxElems);
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
}
function initMaterialBoxed(){
    const materialBoxedElems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialBoxedElems);
}
async function fetchPending() {
    pendingLoans.value = [];
    axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchPending`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        pendingLoans.value = res.data;
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
    });
}
async function fetchReturned() {
    returnedLoans.value = [];
    axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchReturned`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        returnedLoans.value = res.data;
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
    });
}
function selectBook(loanId, bookId, username, contactNumber, email, date, returnDate, title, author, cover, pending, isbn){
    selBook.value.loanId = loanId;
    selBook.value.bookId = bookId;
    selBook.value.username = username;
    selBook.value.contactNumber = contactNumber;
    selBook.value.email = email;
    selBook.value.date = date;
    selBook.value.returnDate = returnDate;
    selBook.value.title = title;
    selBook.value.author = author;
    selBook.value.cover = cover;
    selBook.value.pending = pending;
    selBook.value.isbn = isbn;
}
function confirmChangeStatus(){
    axios.patch(`${process.env.VUE_APP_API_URL}/loans/update/${selBook.value.loanId}/${selBook.value.bookId}/1`, null, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(() => {
        M.toast({html: 'Libro entregado!', classes: 'green lighten-1'});
        fetchPending();
        fetchReturned();
        let changeStatusModal = M.Modal.getInstance(document.querySelector('#changeStatusModal'));
        changeStatusModal.close();
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
    });
}
</script>

<style scoped>
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
    height: 145px;
}
.parallax-container {
    height: 200px;
}
</style>