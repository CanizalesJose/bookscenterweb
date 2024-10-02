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

            <p>¿Estás seguro de querer crear este libro?</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <!-- Headers del libro -->
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Autor</th>
                        <th>Editora</th>
                        <th>Año de publicación</th>
                        <th>Categoría</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Datos del libro creado -->
                        <td>
                           <img class="listCover" v-bind:src="selImageUrl" alt="Portada">
                        </td>
                         <td>{{ selTitle }}</td>
                         <td>{{ selIsbn }}</td>
                         <td>{{ selFullname }}<br>({{ selAuthor }})</td>
                         <td>{{ selPublisher }}</td>
                         <td>{{ selPublishYear }}</td>
                         <td>{{ selDescr }}<br>({{ selCategory }})</td>
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
            

            <p>¿Estás seguro de querer actualizar este registro?</p>
            <br>
            <p>El nuevo registro quedará de la siguiente manera:</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <!-- Datos de libro -->
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Autor</th>
                        <th>Editora</th>
                        <th>Año</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Nuevos datos -->
                        <td><img v-bind:src="selImageUrl" class="listCover"></td>
                        <td>{{ selTitle }}</td>
                        <td>{{ selIsbn }}</td>
                        <td>{{ selFullname }} <br> ({{ selAuthor }})</td>
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
                        <td><img :src="selImageUrl" class="listCover"></td>
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
            <img src="https://images.freeimages.com/images/large-previews/0f8/books-and-window-1219757.jpg">
        </div>
    </div>
    <div class="container">
        <div class="row">

            <div class="section center">
                <h3>Gestión de Libros</h3>
            </div>
            <!-- Construir tabla con datos de libros -->
            
            <table class="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Autor</th>
                        <th>Editora</th>
                        <th>Año</th>
                        <th>Categoría</th>
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Generar registros de tabla dinámicamente -->
                    <tr v-for="book in booksList" :key="book.id">
                        <td><img class="listCover" v-bind:src="book.imageUrl" v-bind:alt="book.title"></td>
                        <td>{{ book.id}}</td>
                        <td>{{ book.title }}</td>
                        <td>{{ book.isbn }}</td>
                        <td>{{ book.fullname }}</td>
                        <td>{{ book.publisher }}</td>
                        <td>{{ book.publishYear }}</td>
                        <td>{{ book.descr }}</td>
                        <td>
                            <button @click="updateModal(book.id, book.title, book.isbn, book.author, book.fullname, book.publisher, book.publishYear, book.category, book.descr, book.imageUrl)" class="btn-floating waves-effect waves-light green lighten-1 hoverable">
                                <i class="material-icons prefix">edit</i>
                            </button>
                        </td>
                        <td>
                            <button @click="deleteModal(book.id, book.title, book.isbn, book.author, book.fullname, book.publisher, book.publishYear, book.category, book.descr, book.imageUrl)" class="btn-floating waves-effect waves-light red lighten-1 hoverable">
                                <i class="material-icons prefix">delete</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <FooterComponent imageSrc="https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></FooterComponent>
</template>

<script setup>
/* eslint-disable */
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import axios from 'axios';
import { onMounted, inject, ref } from 'vue';

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
const selImageUrl = ref(null);

const booksList = ref([]);
const categoriesList = ref([]);
const authorsList = ref([]);

onMounted(async () => {
    if (!await verifyAdmin())
        return;
    await initMaterialize();
    await fetchBooks();
});

async function fetchBooks(){
    await axios.get(`${process.env.VUE_APP_API_URL}/books/find/All`,{
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
    if (!pass)
        return;
    let data = {
        title: selTitle.value,
        isbn: selIsbn.value,
        author: selAuthor.value,
        publisher: selPublisher.value,
        publishYear: selPublishYear.value,
        category: selCategory.value,
        imageUrl: selImageUrl.value
    }
    await axios.post(`${process.env.VUE_APP_API_URL}/books/register`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        M.toast({html: `${res.data.message}`, classes: 'green lighten-1'});
        booksList.value.push({
            id: res.data.book.id,
            title: selTitle.value,
            isbn: selIsbn.value,
            fullname: selFullname.value,
            publisher: selPublisher.value,
            publishYear: selPublishYear.value,
            descr: selDescr.value,
            imageUrl: res.data.book.imageUrl
        });
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
async function updateModal(id, title, isbn, author, fullname, publisher, publishYear, category, descr, imageUrl){
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
    width: 100%;
}
.parallax {
    width: 100%;
    height: auto;
}
</style>