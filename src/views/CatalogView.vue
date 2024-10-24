<template>
    <HeaderComponent></HeaderComponent>
    <!-- Botón para abrir el modal -->
    <div v-if="isVerified" class="fixed-action-btn">
        <a @click="openModal" class="btn-floating btn-large red">
        <i class="large material-icons">shopping_cart_checkout</i>
        </a>
    </div>

    <!-- Modal Structure -->
    <div id="loanModal" class="modal">
        <div class="modal-content">
            <h4>Confirmar pedido</h4>
            <p>Los libros prestados se deben devolver en una semana como máximo.</p>
            <table>
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="book in loanBooks" :key="book.bookId">
                        <td>
                            <img :src="book.cover" class="listCover">
                        </td>
                        <td>{{ book.title }}</td>
                        <td>{{ book.author }}</td>
                        <td>{{ book.category }}</td>
                        <td>
                            <button @click="removeFromList(book)" class="btn-floating waves-effect-light black center">
                                <i class="material-icons">delete</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">Cerrar</a>
            <a @click="confirmLoan()" class="modal-close waves-effect waves-light btn-flat">Confirmar</a>
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
                        :copies="book.copies"
                        :loan-copies="book.loanCopies"
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
const loanBooks = ref(new Set());
const isVerified = ref(false);

onMounted(async () => {
    isVerified.value = await verifyUser();
    await initMaterialize();
    await fetchBooks();
});
function initMaterialize(){
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
}
async function fetchBooks(){
    await axios.get(`${process.env.VUE_APP_API_URL}/catalog/fetchVisibleCatalog`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        bookList.value = [];
        // Elimina del catalogo los libros en lista de pedidos prestados
        for(const book of loanBooks.value) {
            for (let i = 0; i < res.data.length; i++) {
                const catalogBook = res.data[i];
                if (book.bookId == catalogBook.bookId)
                    res.data.splice(i, 1);
            }
        }
        bookList.value = res.data;
    })
    .catch(error => {
        if (error.response && error.response.data){
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
    loanBooks.value.add(res);
    M.toast({html: `${res.title} agregado a la lista`, classes: 'green'});
    fetchBooks();
}
async function removeFromList(res){
    if (loanBooks.value.delete(res))
        M.toast({html: `${res.title} eliminado de la lista`, classes: 'red lighten-1'});
    const modalInstance = M.Modal.getInstance(document.querySelector('#loanModal'));
    await modalInstance.close();
    fetchBooks();
}
function confirmLoan(){
    if (loanBooks.value.size == 0){
        M.toast({html: `La lista de libros pedidos está vacía`, classes: 'red'});
        return;
    }
    const data = {booksList:[]};
    for (const book of loanBooks.value){
        data.booksList.push(book.bookId);
    }
    data.booksList = JSON.stringify(data.booksList);
    axios.post(`${process.env.VUE_APP_API_URL}/loans/new`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(() => {
        M.toast({html: `Pedido realizado: pasar por el libro al establecimiento a la brevedad`, classes: 'green'});
        fetchBooks();
    })
    .catch(error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
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
    height: 200px;
}
</style>