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
            <!-- Tabla de prestamos pendientes -->
            <div class="input-field">
                    <i class="material-icons prefix">search</i>
                    <input class="tooltipped" data-position="left" data-tooltip="Presiona Enter para buscar" type="text" id="search" v-model="pendingSearchText" @keyup.enter="performPendingSearch()">
                    <label for="search">Buscar</label>
                </div>
            <div class="pendingTableContainer">
                <!-- Si no hay prestamos pendientes -->
                <div v-if="pendingLoans.length == 0" class="container center">
                    <h6>No hay resultados</h6>
                    <br>
                    <img class="circle" style="width: 200px;" src="../assets/img/notFound.jpg">
                </div>
                <table v-if="pendingLoans.length != 0" class="responsive-table">
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
                        <tr v-for="loan in pendingLoansPagination" :key="'pending'+loan.loanId+loan.bookId">
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
            <ul class="pagination">
                <li class="waves-effect" :class="{ 'disabled': pendingCurrentPage === 1 }">
                    <a href="#" @click.prevent="changePendingPage(pendingCurrentPage - 1)">«</a>
                </li>
                <li v-for="page in pendingPageCount" :key="page" class="waves-effect" :class="{ 'active': page === pendingCurrentPage }">
                    <a href="#" @click.prevent="changePendingPage(page)">{{ page }}</a>
                </li>
                <li class="waves-effect" :class="{ 'disabled': pendingCurrentPage === pageCount }">
                    <a href="#" @click.prevent="changePendingPage(pendingCurrentPage + 1)">»</a>
                </li>
            </ul>
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
            <div class="input-field">
                    <i class="material-icons prefix">search</i>
                    <input class="tooltipped" data-position="left" data-tooltip="Presiona Enter para buscar" type="text" id="search2" v-model="returnedSearchText" @keyup.enter="performReturnedSearch()">
                    <label for="search2">Buscar</label>
                </div>
            <div class="returnedTableContainer">
                <!-- Si no hay registro -->
                <div v-if="returnedLoans.length == 0" class="container center">
                    <h6>No hay resultados</h6>
                    <br>
                    <img class="circle" style="width: 200px;" src="../assets/img/notFound.jpg">
                </div>
                <table v-if="returnedLoans.length != 0" class="responsive-table">
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
                        <tr v-for="loan in returnedLoansPagination" :key="'returned'+loan.loanId+loan.bookId">
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
                                <button @click="selectBook(loan.loanId, loan.bookId, loan.username, loan.contactNumber, loan.email, loan.date, loan.returnDate, loan.title, loan.author, loan.cover, loan.pending, loan.isbn)" class="btn-floating black modal-trigger" data-target="detailsModal">
                                    <i class="material-icons">search</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ul class="pagination">
                <li class="waves-effect" :class="{ 'disabled': returnedCurrentPage === 1 }">
                    <a href="#" @click.prevent="changeReturnedPage(returnedCurrentPage - 1)">«</a>
                </li>
                <li v-for="page in returnedPageCount" :key="page" class="waves-effect" :class="{ 'active': page === returnedCurrentPage }">
                    <a href="#" @click.prevent="changeReturnedPage(page)">{{ page }}</a>
                </li>
                <li class="waves-effect" :class="{ 'disabled': returnedCurrentPage === pageCount }">
                    <a href="#" @click.prevent="changeReturnedPage(returnedCurrentPage + 1)">»</a>
                </li>
            </ul>
        </div>
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

    <div id="detailsModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Detalles del pedido</h4>
            <div class="divider"></div>
            <br>
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
            <a class="modal-close waves-effect btn-flat">Cerrar</a>
        </div>
    </div>
</template>

<script setup>
/* global M */

import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
import { inject, onMounted, ref, computed } from 'vue';
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
const pendingSearchText = ref('');
const pendingCurrentPage = ref(1);
const pendingRowsPerPage = 3;
const pendingLoansPagination = computed(() => {
    const start = (pendingCurrentPage.value - 1) * pendingRowsPerPage;
    return pendingLoans.value.slice(start, start + pendingRowsPerPage);
});
const pendingPageCount = computed(() => {
    return Math.ceil(pendingLoans.value.length / pendingRowsPerPage);
});
function changePendingPage(page){
    if (page < 1 || page > pendingPageCount.value)
        return;
    pendingCurrentPage.value = page;
}
const returnedSearchText = ref('');
const returnedCurrentPage = ref(1);
const returnedRowsPerPage = 3;
const returnedLoansPagination = computed(() => {
    const start = (returnedCurrentPage.value - 1) * returnedRowsPerPage;
    return returnedLoans.value.slice(start, start + returnedRowsPerPage);
});
const returnedPageCount = computed(() => {
    return Math.ceil(returnedLoans.value.length / returnedRowsPerPage);
});
function changeReturnedPage(page){
    if (page < 1 || page > returnedPageCount.value)
        return;
    returnedCurrentPage.value = page;
}

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
    pendingCurrentPage.value = 1;
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
    returnedCurrentPage.value = 1;
}
function performPendingSearch(){
 if (pendingSearchText.value.length == 0){
    fetchPending();
 }else {
    // Realizar busqueda
    pendingLoans.value = [];
    axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchPending/${pendingSearchText.value}`, {
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
        pendingCurrentPage.value = 1;
 }
}
function performReturnedSearch(){
    if (returnedLoans.value.length == 0){
        fetchReturned();
    } else {
        // Realizar busqueda
        returnedLoans.value = [];
        axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchReturned/${returnedSearchText.value}`, {
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
        returnedCurrentPage.value = 1;
    }
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
.pendingTableContainer {
    height: 550px;
}
.returnedTableContainer {
    height: 550px;
}
</style>