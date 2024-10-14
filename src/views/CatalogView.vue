<template>
    <HeaderComponent></HeaderComponent>
    <!-- Botón para abrir el modal -->
    <div class="fixed-action-btn">
        <a @click="openModal" class="btn-floating btn-large red">
        <i class="large material-icons">shopping_cart_checkout</i>
        </a>
    </div>

    <!-- Modal Structure -->
    <div id="customModal" class="modal">
        <div class="modal-content">
            <h4>Confirmar pedido</h4>
            <p>Los libros prestados se deben devolver en una semana como máximo.</p>
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col s12 center">
                <h3>Catalogo</h3>
            </div>
        </div>
        <div class="divider"></div>
        <div class="row">
            <div class="col s12 m12">
                <div class="section center">
                    <!-- Aqui se construyen las cards con los libros -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
/* global M */
import { onMounted, inject, ref} from 'vue';
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';

const verifyUser = inject('verifyUser');
const bookList = ref([]);

onMounted(async () => {
    await verifyUser();
    await initMaterialize();
    await fetchBooks();
});
function initMaterialize(){
    const modal = document.querySelector('#customModal');
    M.Modal.init(modal);
}
async function fetchBooks(){
    await axios.get(`${process.env.VUE_APP_API_URL}/books/findAll`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        bookList.value = res.data;
    })
    .catch(() => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
        }
    });
}
function openModal() {
    const modalInstance = M.Modal.getInstance(document.querySelector('#customModal'));
    modalInstance.open();
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