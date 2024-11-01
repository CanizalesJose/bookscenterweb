<template>
    <HeaderComponent></HeaderComponent>
    <div class="fixed-action-btn">
        <a @click="registerModal()" class="btn-floating btn-large green lighten-1 hoverable">
            <i class="large material-icons">add</i>
        </a>
    </div>
        <!-- Modal para confirmar creación -->
        <div id="registerModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Confirmar registro</h4>
            <div class="divider"></div>
            <!-- Nuevos datos -->
            <label>Portada</label>
            <input v-model="selImageUrl" autocomplete="off">
            <label>Titulo:</label>
            <input v-model="selTitle" autocomplete="off">
            <label>ISBN</label>
            <input v-model="selIsbn" autocomplete="off">
            <!-- Author selector -->
            <br>
            <label>Autor</label>
            <select v-model="selAuthor" @change="updateAuthorSelection">
                <option v-for="author in authorsList" :key="author.id" :value="JSON.stringify({id: author.id, fullName: author.fullName})">
                    {{ author.fullName }}
                </option>
            </select>
            <br>
            <label>Editor</label>
            <input v-model="selPublisher" autocomplete="off">
            <label>Año de publicación</label>
            <input v-model="selPublishYear" type="number" autocomplete="off">
            <!-- Category selector -->
             <br>
             <label>Categoría</label>
             <select v-model="selCategory" @change="updateCategorySelection">
                <option v-for="category in categoriesList" :key="category.id" :value="JSON.stringify({id: category.id, descr: category.descr})">
                    {{ category.descr }}
                </option>
             </select>
            <br>
            <label>Copias:</label>
            <input type="number" autocomplete="off" v-model="selCopies">

            <p>¿Estás seguro de querer crear este libro?</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <!-- Headers del libro -->
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Editora</th>
                        <th>Año de publicación</th>
                        <th>Categoría</th>
                        <th>Copias</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Datos del libro creado -->
                        <td>
                           <img class="listCover materialboxed" v-bind:src="selImageUrl" alt="Portada">
                        </td>
                         <td>{{ selTitle }}</td>
                         <td>{{ selFullname }}<br>({{ selAuthor }})</td>
                         <td>{{ selIsbn }}</td>
                         <td>{{ selPublisher }}</td>
                         <td>{{ selPublishYear }}</td>
                         <td>{{ selDescr }}<br>({{ selCategory }})</td>
                         <td>{{ selCopies }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <div class="divider"></div>
            <a class="modal-close waves-effect waves-red btn-flat">Cancelar</a>
            <a @click="confirmRegister" class="modal-close waves-effect waves-green btn-flat">Registrar</a>
        </div>
    </div>
    <!-- Modal para confirmar actualización -->
    <div id="updateModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Confirmar actualización</h4>
            <div class="divider"></div>
            <!-- Ingresar nuevos datos -->
            <label>Portada</label>
            <input v-model="selImageUrl" autocomplete="off">
            <label>Titulo:</label>
            <input v-model="selTitle" autocomplete="off">
            <label>ISBN</label>
            <input v-model="selIsbn" autocomplete="off">
            <!-- Author selector -->
            <br>
            <label>Autor</label>
            <select v-model="selAuthor" @change="updateAuthorSelection">
                <option :value="selAuthor" selected disabled>
                    {{ selFullname }}
                </option>
                <option v-for="author in authorsList" :key="author.id" :value="JSON.stringify({id: author.id, fullName: author.fullName})">
                    {{ author.fullName }}
                </option>
            </select>
            <br>
            <label>Editor</label>
            <input v-model="selPublisher" autocomplete="off">
            <label>Año de publicación</label>
            <input v-model="selPublishYear" type="number" autocomplete="off">
            <!-- Category selector -->
            <br>
            <label>Categoría</label>
            <select v-model="selCategory" @change="updateCategorySelection">
                <option :value="selCategory" selected disabled>
                    {{ selDescr }}
                </option>
                <option v-for="category in categoriesList" :key="category.id" :value="JSON.stringify({id: category.id, descr: category.descr})">
                    {{ category.descr }}
                </option>
            </select>
            <br>
            <label>Copias en inventario:</label>
            <input v-model="selCopies" type="number" autocomplete="off">
            

            <p>¿Estás seguro de querer actualizar este registro?</p>
            <br>
            <p>El nuevo registro quedará de la siguiente manera:</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <!-- Datos de libro -->
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Editora</th>
                        <th>Año</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Nuevos datos -->
                        <td><img v-bind:src="selImageUrl" class="listCover materialboxed"></td>
                        <td>{{ selTitle }}</td>
                        <td>{{ selFullname }} <br> ({{ selAuthor }})</td>
                        <td>{{ selIsbn }}</td>
                        <td>{{ selPublisher }}</td>
                        <td>{{ selPublishYear }}</td>
                        <td>{{ selDescr }} <br> ({{ selCategory }})</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <div class="divider"></div>
            <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancelar</a>
            <a href="#!" @click="confirmUpdate" class="modal-close waves-effect waves-green btn-flat">Actualizar</a>
        </div>
    </div>
    <!-- Modal para confirmar eliminación -->
    <div id="deleteModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Confirmar Eliminación</h4>
            <div class="divider"></div>
            <p>¿Estás seguro de querer eliminar este libro?</p>
            <table>
                <thead>
                    <tr>
                        <!-- Datos de libro -->
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Año</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Datos del registro eliminado-->
                        <td><img :src="selImageUrl" class="listCover materialboxed"></td>
                        <td>{{ selTitle }}</td>
                        <td>{{ selFullname }}</td>
                        <td>{{ selPublishYear }}</td>
                        <td>{{ selDescr }}</td>
                    </tr>
                </tbody>
            </table>
            <p>
                Esta acción no puede deshacerse.
            </p>
        </div>
        <div class="modal-footer">
            <div class="divider"></div>
            <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancelar</a>
            <a href="#!" @click="confirmDelete" class="modal-close waves-effect waves-green btn-flat">Eliminar</a>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="divider"></div>
            <div class="section center">
                <h3>Libros</h3>
                <br>
                <p>
                    En este apartado es posible administrar los registros de libros
                    <br>
                </p>
            </div>
            <div class="divider"></div>
        </div>

    </div>
    <div class="parallax-container">
        <div class="parallax">
            <img src="../assets/img/generalBackground03.jpg">
        </div>
    </div>
    <div class="container">
        <div class="row">

            <div class="section center">
                <h3>Gestión de Libros</h3>
            </div>
            <!-- Construir tabla con datos de libros -->
            <div class="tableContainer">
                <div class="input-field">
                    <i class="material-icons prefix">search</i>
                    <input class="tooltipped" data-position="left" data-tooltip="Presiona Enter para buscar" type="text" id="search" v-model="searchText" @keyup.enter="performSearch()">
                    <label for="search">Buscar</label>
                </div>
                <table class="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Portada</th>
                            <th>ISBN</th>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>Editora</th>
                            <th>Año</th>
                            <th>Categoría</th>
                            <th>Copias</th>
                            <th>Copias prestadas</th>
                            <th>Actualizar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Generar registros de tabla dinámicamente -->
                        <tr v-for="book in booksListPagination" :key="book.id">
                            <td><img @load="initMaterialBoxed()" class="listCover materialboxed" v-bind:src="book.imageUrl" v-bind:alt="book.title"></td>
                            <td>{{ book.isbn }}</td>
                            <td>{{ book.title }}</td>
                            <td>{{ book.fullName }}</td>
                            <td>{{ book.publisher }}</td>
                            <td>{{ book.publishYear }}</td>
                            <td>{{ book.descr }}</td>
                            <td>{{ book.copies }}</td>
                            <td>{{ book.loanCopies }}</td>
                            <td>
                                <button @click="updateModal(book.id, book.title, book.isbn, book.author, book.fullName, book.publisher, book.publishYear, book.category, book.copies, book.loanCopies, book.descr, book.imageUrl)" class="btn-floating waves-effect waves-light green lighten-1 hoverable">
                                    <i class="material-icons prefix">edit</i>
                                </button>
                            </td>
                            <td>
                                <button @click="deleteModal(book.id, book.title, book.isbn, book.author, book.fullName, book.publisher, book.publishYear, book.category, book.descr, book.imageUrl)" class="btn-floating waves-effect waves-light red lighten-1 hoverable">
                                    <i class="material-icons prefix">delete</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <ul class="pagination">
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
</template>

<script setup>
/* eslint-disable */
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
import { onMounted, inject, ref, computed } from 'vue';

const verifyAdmin = inject('verifyAdmin');
const selId = ref(null);
const selTitle = ref(null);
const selIsbn = ref(null);
const selAuthor = ref(null);
const selFullname = ref(null);
const selPublisher = ref(null);
const selPublishYear = ref(null);
const selCategory = ref(null);
const selDescr = ref(null);
const selCopies = ref(null);
const selLoanCopies = ref(null);
const selImageUrl = ref(null);
const booksList = ref([]);
const categoriesList = ref([]);
const authorsList = ref([]);
const searchText = ref('');
const currentPage = ref(1);
const rowsPerPage = 3;
const booksListPagination = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage;
    return booksList.value.slice(start, start + rowsPerPage);
});
const pageCount = computed(() => {
    return Math.ceil(booksList.value.length / rowsPerPage);
});
function changePage(page){
    if (page < 1 || page > pageCount.value)
        return;
    currentPage.value = page;
}

onMounted(async () => {
    if (!await verifyAdmin())
        return;
    await initMaterialize();
    await fetchBooks();
});

async function fetchBooks(){
    await axios.get(`${process.env.VUE_APP_API_URL}/books/findAll`,{
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        booksList.value = res.data;
    })
    .catch(error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
        }
    });
}
async function fetchCategories(){
    await axios.get(`${process.env.VUE_APP_API_URL}/categories/find/All`,{
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        categoriesList.value = res.data;
    })
    .catch(error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
        }
    });
}
async function fetchAuthors(){
    await axios.get(`${process.env.VUE_APP_API_URL}/authors/findAll`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        authorsList.value = res.data;
    })
    .catch(error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
        }
    });
}
async function initMaterialize() {
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
    const parallaxElems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallaxElems);
}
function initMaterialBoxed() {
    var materialboxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxed);
}
function reInitSelect() {
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
}
function updateCategorySelection(){
    let categorySelection = JSON.parse(selCategory.value);
    selCategory.value = categorySelection.id;
    selDescr.value = categorySelection.descr;
}
function updateAuthorSelection(){
    let authorSelection = JSON.parse(selAuthor.value);
    selAuthor.value = authorSelection.id;
    selFullname.value = authorSelection.fullName;
}
async function registerModal(){
    selId.value = null;
    selTitle.value = null;
    selIsbn.value = null;
    selAuthor.value = null;
    selFullname.value = null;
    selPublisher.value = null;
    selPublishYear.value = null;
    selCategory.value = null;
    selCopies.value = null;
    selLoanCopies.value = null;
    selDescr.value = null;
    selImageUrl.value = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s';
    const registerModal = M.Modal.getInstance(document.querySelector('#registerModal'));
    registerModal.open();
    await fetchCategories();
    await fetchAuthors();
    setTimeout(() => {
        reInitSelect();
    }, 0);
}
async function confirmRegister(){
    let pass = true;
    if (!selTitle.value){
        pass = false;
        M.toast({html: 'El titulo no puede estar vacío.', classes: 'red lighten-1'});
    }
    if (!selIsbn.value){
        pass = false;
        M.toast({html: 'El ISBN no puede estar vacío', classes: 'red lighten-1'});
    }
    if (!selAuthor.value){
        pass = false;
        M.toast({html: 'El autor no puede estar vacío', classes: 'red lighten-1'});
    }
    if (!selPublisher.value){
        pass = false;
        M.toast({html: 'El editor no puede estar vacío', classes: 'red lighten-1'});
    }
    if (!selPublishYear.value){
        pass = false;
        M.toast({html: 'El año de publicación no puede estar vacío', classes: 'red lighten-1'});
    }
    if (!selCategory.value){
        pass = false;
        M.toast({html: 'La categoría no puede estar vacía', classes: 'red lighten-1'});
    }
    if (!selCopies.value){
        pass = false;
        M.toast({html: 'El campo copias debe tener un valor', classes: 'red lighten-1'});
    }
    if (!pass)
        return;
    let data = {
        title: selTitle.value,
        isbn: selIsbn.value,
        author: selAuthor.value,
        publisher: selPublisher.value,
        publishYear: selPublishYear.value,
        category: selCategory.value,
        copies: selCopies.value,
        imageUrl: selImageUrl.value
    }
    await axios.post(`${process.env.VUE_APP_API_URL}/books/register`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        M.toast({html: `${res.data.message}`, classes: 'green lighten-1'});
        await fetchBooks();
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
async function updateModal(id, title, isbn, author, fullname, publisher, publishYear, category, copies, loanCopies, descr, imageUrl){
    selId.value = id;
    selTitle.value = title;
    selIsbn.value = isbn;
    selAuthor.value = author;
    selFullname.value = fullname;
    selPublisher.value = publisher;
    selPublishYear.value = publishYear;
    selCategory.value = category;
    selCopies.value = copies;
    selLoanCopies.value = loanCopies;
    selDescr.value = descr;
    selImageUrl.value = imageUrl;
    const updateModal = M.Modal.getInstance(document.querySelector('#updateModal'));
    updateModal.open();
    await fetchAuthors();
    await fetchCategories();
    setTimeout(() => {
        reInitSelect();
    }, 0);
}
async function confirmUpdate(){
    let data = {
        title: selTitle.value,
        isbn: selIsbn.value,
        author: selAuthor.value,
        publisher: selPublisher.value,
        publishYear: selPublishYear.value,
        category: selCategory.value,
        copies: selCopies.value,
        imageUrl: selImageUrl.value
    }
    await axios.patch(`${process.env.VUE_APP_API_URL}/books/update/${selId.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async () => {
        M.toast({html: `Libro actualizado correctamente`, classes: 'green lighten-1'});
        await fetchBooks();
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
async function deleteModal(id, title, isbn, author, fullname, publisher, publishYear, category, descr, imageUrl) {
    selId.value = id;
    selTitle.value = title;
    selIsbn.value = isbn;
    selAuthor.value = author;
    selFullname.value = fullname;
    selPublisher.value = publisher;
    selPublishYear.value = publishYear;
    selCategory.value = category;
    selDescr.value = descr;
    selImageUrl.value = imageUrl;
    const deleteModal = M.Modal.getInstance(document.querySelector('#deleteModal'));
    deleteModal.open();
}
async function confirmDelete(){
    await axios.delete(`${process.env.VUE_APP_API_URL}/books/delete/${selId.value}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async () => {
        M.toast({html: `Libro eliminado correctamente`, classes: 'red lighten-1'});
        await fetchBooks();
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
function performSearch(){
    if (searchText.value.length == 0){
        fetchBooks();
    }else{
        // Se realiza la busqueda con una petición
        axios.get(`${process.env.VUE_APP_API_URL}/books/findByTitle/${searchText.value}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            currentPage.value = 1;
            booksList.value = res.data;
        })
        .catch(error => {
            if (error.response.data)
                M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
            else
                M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
        });
    }
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
    height: 145px;
}
.parallax-container {
    height: 200px;
}
.tableContainer {
    height: 650px;
}
</style>