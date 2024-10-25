<template>
    <div class="col s3">
        <div @click="addBookModal()" class="card hoverable waves-effect waves-green">
            <div class="card-image">
                <img :src="cover">
                <span class="card-title white black-text sm">{{ title }}</span>
            </div>
            <div class="card-content left-align">
                <p><b>Escrito por: </b>{{ author }}</p>
                <p><b>Categoría: </b>{{ category }}</p>
                <p v-if="copies-loanCopies != 0"><b>Stock:</b> {{ copies - loanCopies }}</p>
                <p v-if="copies-loanCopies == 0" class="red-text">Out of Stock</p>
                <p class="truncate-multiline">
                    <b>Sinopsis: </b>{{ summary }}
                </p>
            </div>
        </div>
    </div>

    <!-- Modal Structure -->
    <div :id="`addBookModal${catalogId}${bookId}`" class="modal">
        <div class="modal-content">
            <h4 v-if="isVerified">¿Agregar libro al pedido?</h4>
            <h4 v-if="!isVerified">Detalles del libro</h4>
            <p v-if="isVerified">
                Al pedir prestado un libro se tiene una semana para devolverlo. En caso contrario se le penalizará con una multa.
            </p>
            <p>
                <br>
                <b>Sinopsis:</b>
                <br>
                {{ summary }}
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Categoría</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img :src="cover" class="listCover materialboxed"></td>
                        <td>{{ title }}</td>
                        <td>{{ category }}</td>
                        <td>{{ author }}</td>
                    </tr>
                </tbody>
            </table>
            <p class="red-text" v-if="copies-loanCopies == 0">Este libro está agotado.</p>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">Cerrar</a>
            <a v-if="isVerified && copies-loanCopies != 0" @click="confirmAddBook" class="modal-close waves-effect waves-green btn-flat">Agregar a la lista</a>
        </div>
    </div>
</template>

<script setup>
/* global M */
import {ref, defineEmits, onMounted} from 'vue';

onMounted(() => {
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
    const materialBoxedElems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialBoxedElems);
});

const emit = defineEmits(['book-added']);

const selBook = ref({catalogId:null, bookId:null, cover:null, title:null, author:null, category:null, summary:null, copies:null, loanCopies:null});

function addBookModal(){
    const modalInstance = M.Modal.getInstance(document.querySelector(`#addBookModal${props.catalogId}${props.bookId}`));
    modalInstance.open();
}
function confirmAddBook(){
    selBook.value.bookId = props.bookId;
    selBook.value.catalogId = props.catalogId;
    selBook.value.cover = props.cover;
    selBook.value.title = props.title;
    selBook.value.category = props.category;
    selBook.value.author = props.author;
    selBook.value.summary = props.summary;
    selBook.value.copies = props.copies;
    selBook.value.loanCopies = props.loanCopies;
    emit('book-added', selBook.value);
}

// eslint-disable-next-line
const props = defineProps(['bookId', 'catalogId', 'cover', 'title', 'category', 'author', 'summary', 'isVerified', 'copies', 'loanCopies']);

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
}
.card-image{
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card-content {
    height: 170px;
}
.card{
    min-height: 400px;
    min-width: 200px;
}
.truncate-multiline {
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 100%;
}
</style>