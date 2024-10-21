<template>
    <HeaderComponent></HeaderComponent>
    <!-- Botón para abrir el modal -->
    <div class="fixed-action-btn">
        <a @click="openModal" class="btn-floating btn-large red">
        <i class="large material-icons">shopping_cart_checkout</i>
        </a>
    </div>

    <!-- Modal Structure -->
    <div id="loanModal" class="modal">
        <div class="modal-content">
            <h4>Confirmar pedido</h4>
            <p>Los libros prestados se deben devolver en una semana como máximo.</p>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
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
                    <div v-for="book in bookList" :key="book.catalogId+'-'+book.bookId">
                        <BookCardComponent
                        @book-added="addBookToList"
                        :book-id="book.bookId"
                        :catalog-id="book.catalogId"
                        :cover="book.imageUrl"
                        :title="book.title"
                        :category="book.descr"
                        :author="book.fullName"
                        :summary="book.summary"
                        :is-verified="isVerified"
                        />
                    </div>
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
import BookCardComponent from '@/components/BookCardComponent.vue';

const verifyUser = inject('verifyUser');
const bookList = ref([]);
const isVerified = ref(false);

onMounted(async () => {
    isVerified.value = await verifyUser();
    await initMaterialize();
    await fetchBooks();
    console.log(bookList.value);
});
function initMaterialize(){
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
}
async function fetchBooks(){
    await axios.get(`${process.env.VUE_APP_API_URL}/catalog/fetchCatalog`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        bookList.value = res.data;
    })
    .catch(error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
        }
    });
}
function openModal() {
    const modalInstance = M.Modal.getInstance(document.querySelector('#loanModal'));
    modalInstance.open();
}
function addBookToList(res){
    M.toast({html: `${JSON.stringify(res)}`});
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