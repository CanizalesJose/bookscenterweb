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
            <img src="https://img.freepik.com/free-photo/view-books-arrangement_23-2148882757.jpg?t=st=1728429445~exp=1728433045~hmac=cddf2eecac61ffc3ea9fa3c0644344e882f067eb039206d845254e9beb4517f2&w=826">
        </div>
    </div>
    <!-- Pendientes -->
    <div class="container">
        <div class="row">
            <div class="divider"></div>
            <div class="section center">
                <h3>Prestamos pendientes</h3>
            </div>
            <!-- Tablas de prestamos pendientes separados por id de prestamo -->
            <div v-for="loan in pendingLoansData" :key="loan.reference.id">
                <div class="row">
                    <div class="divider"></div>
                    <div class="col s12 m6 center">
                        <p style="font-size: 20px;"><b>Pedido:</b> {{ loan.reference.id }}</p>
                        <p style="font-size: 20px;"><b>Fecha de prestamo: </b>{{ loan.reference.date }}</p>
                    </div>
                    <div class="col s12 m6 center">
                        <p style="font-size: 20px;"><b>Usuario:</b> {{ loan.reference.username }}</p>
                        <p style="font-size: 20px;"><b>Fecha limite: </b>{{ loan.reference.returnDate }}</p>
                    </div>
                </div>
                <div class="row">
                    <table class="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Portada</th>
                                <th>Titulo</th>
                                <th>Autor</th>
                                <th>Categoría</th>
                                <th>ISBN</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in loan.books" :key="book.id">
                                <td>
                                    <img :src="book.cover" class="listCover">
                                </td>
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.category }}</td>
                                <td>{{ book.isbn }}</td>
                                <td v-if="book.returned==0">
                                    Pendiente
                                    <br><br>
                                    <button @click="changeStatusModal(book.id, loan.reference.id)" class="btn-floating waves-effect-light green lighten-1 center">
                                        <i class="material-icons prefix">check</i>
                                    </button>
                                </td>
                                <td v-if="book.returned==1">Entregado</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br><br>
            </div>
        </div>
    </div>
    <!-- Imagen -->
    <div class="parallax-container">
        <div class="parallax">
            <img src="https://img.freepik.com/free-photo/textbooks-lying-near-bookcase_23-2147845949.jpg?t=st=1728430549~exp=1728434149~hmac=b97c53a32592849739fb9252e946e071096f10c2d000cd254c00bc6f690572c4&w=740">
        </div>
    </div>
    <!-- Registro -->
    <div class="container">
        <div class="row">
            <div class="section center">
                <h3>Historial de prestamos</h3>
            </div>
            <!-- Tabla de historial -->
            <div v-for="loan in returnedLoansData" :key="loan.reference.id">
                <div class="row">
                    <div class="divider"></div>
                    <div class="col s12 m6 center">
                        <p style="font-size: 20px;"><b>Pedido:</b> {{ loan.reference.id }}</p>
                        <br>
                        <p style="font-size: 20px;"><b>Fecha de prestamo: </b>{{ loan.reference.date }}</p>
                    </div>
                    <div class="col s12 m6 center">
                        <p style="font-size: 20px;"><b>Usuario:</b> {{ loan.reference.username }}</p>
                        <br>
                        <p style="font-size: 20px;"><b>Fecha limite: </b>{{ loan.reference.returnDate }}</p>
                    </div>
                </div>
                <div class="row">
                    <table class="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Portada</th>
                                <th>Titulo</th>
                                <th>Autor</th>
                                <th>Categoría</th>
                                <th>ISBN</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in loan.books" :key="book.id">
                                <td>
                                    <img :src="book.cover" class="listCover">
                                </td>
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.category }}</td>
                                <td>{{ book.isbn }}</td>
                                <td v-if="book.returned==0">
                                    Pendiente
                                    <br><br>
                                    <button @click="changeStatusModal(book.id, loan.reference.id)" class="btn-floating waves-effect-light green lighten-1 center">
                                        <i class="material-icons prefix">check</i>
                                    </button>
                                </td>
                                <td v-if="book.returned==1">Entregado</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br><br>
            </div>
        </div>
    </div>
</template>

<script setup>
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
import { inject, onMounted, ref } from 'vue';

const verifyAdmin = inject('verifyAdmin');
const returnedLoans = ref([]);
const returnedLoansData = ref([]);
const pendingLoans = ref([]);
const pendingLoansData = ref([]);

onMounted(async () => {
    if (!await verifyAdmin())
        return;
    await initMaterialize();
    await fetchReturnedLoans();
    await fetchPendingLoans();
});

async function initMaterialize() {
    const parallaxElems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallaxElems);
}

async function fetchReturnedLoans(){
    await axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchReturned`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        returnedLoans.value = res.data;
        for (const loan of returnedLoans.value) {
            let newData = await axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchById/${loan.id}`,{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                return res.data;
            });
            returnedLoansData.value.push({reference: loan, books: newData});
        }
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
    });
}
async function fetchPendingLoans(){
    await axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchPending`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        pendingLoans.value = res.data;
        for (const loan of pendingLoans.value) {
            let newData = await axios.get(`${process.env.VUE_APP_API_URL}/loans/fetchById/${loan.id}`,{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => {
                return res.data;
            });
            pendingLoansData.value.push({reference: loan ,books: newData});
        }
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
    height: 300px;
}
</style>