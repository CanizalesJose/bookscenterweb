<template>
    <HeaderComponent></HeaderComponent>
    <!-- Modal Structure -->
    <div id="addModal" class="modal">
        <div class="modal-content">
            <h4>¿Agregar al catálogo?</h4>
            <p>Al agregar un libro al catálogo los clientes podrán verlo en la tienda y pedirlo prestado. Siempre puedes volver no visible un elemento del catálogo.</p>
            <div class="center" style="width: 60%; margin-inline: auto;">
                <div class="input-field">
                    <textarea class="materialize-textarea" v-model="selBook.summary"/>
                    <label>Sinopsis</label>
                </div>
                <div class="input-field">
                    <select>
                        <option value="1">Público</option>
                        <option value="0">Oculto</option>
                    </select>
                    <label>Visibilidad inicial</label>
                </div>
            </div>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img @load="initMaterialBoxed()" :src="selBook.cover" class="listCover materialboxed"></td>
                        <td>{{ selBook.title }}</td>
                        <td>{{ selBook.author }}</td>
                        <td>{{ selBook.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">Cerrar</a>
            <a @click="confirmAddToCatalog" class="modal-close waves-effect vaves-green btn-flat">Agregar</a>
        </div>
    </div>
    <!-- Edit Modal -->
    <div id="editModal" class="modal">
        <div class="modal-content">
            <h4>Modificar la Sinopsis</h4>
            <p>
                La sinopsis es un resumen general de la obra en cuestión. Por lo general este dato se encuentra en la contraportada de cada libro, sin embargo se puede agregar uno personalizado.
                <br>
                Se debe tener en cuenta que este resumen no debe contener información vital sobre la trama del libro, para evitar descontentos con el cliente.
            </p>
            <div style="margin-inline: auto; width: 60%;" class="input-field center">
                <label>Sinopsis</label>
                <br>
                <textarea ref="textAreaRef" class="materialize-textarea" v-model="selBook.summary"/>
            </div>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img @load="initMaterialBoxed()" :src="selBook.cover" class="listCover materialboxed"></td>
                        <td>{{ selBook.title }}</td>
                        <td>{{ selBook.author }}</td>
                        <td>{{ selBook.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">Cerrar</a>
            <a @click="confirmEdit" class="modal-close waves-effect waves-green btn-flat">Confirmar</a>
        </div>
    </div>
    <!-- Delete Modal -->
    <div id="deleteModal" class="modal">
        <div class="modal-content">
            <h4>¿Eliminar del catálogo?</h4>
            <p>Eliminando un libro del catálogo asegura que bajo ningún concepto pueda aparecer en el catálogo. Eliminando la posibilidad de que un administrador pueda exponerlo al público y evitar que lo pidan prestado.</p>
            <p>Si el objetivo es solo quitarlo temporalmente del catalogo, es recomendable usar la función de ocultado.</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img @load="initMaterialBoxed()" :src="selBook.cover" class="listCover materialboxed"></td>
                        <td>{{ selBook.title }}</td>
                        <td>{{ selBook.author }}</td>
                        <td>{{ selBook.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">Cerrar</a>
            <a @click="confirmDelete()" class="modal-close waves-effect waves-green btn-flat">Confirmar</a>
        </div>
    </div>
    <!-- Visibility Modal -->
    <div id="changeVisibilityModal" class="modal">
        <div class="modal-content">
            <h4>¿Cambiar visibilidad?</h4>
            <p v-if="!selVisible">
                Estas publicando un libro en el catálogo, si confirmas, se mostrará a todos los usuarios dentro de la página catálogo y podrán solicitar prestamos sobre el libro.
            </p>
            <p v-if="selVisible">
                Estas ocultando un libro del catálogo. Si confirmas, se eliminará de la página de catálogo y los usuarios ya no podrán solicitar prestamos.
            </p>
            <br>
            <div class="container">
                <b>Sinopsis:</b>
                <br>
                {{ selBook.summary }}
            </div>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img @load="initMaterialBoxed()" :src="selBook.cover" class="listCover materialboxed"></td>
                        <td>{{ selBook.title }}</td>
                        <td>{{ selBook.author }}</td>
                        <td>{{ selBook.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a class="modal-close waves-effect waves-red btn-flat">
                Cancelar
            </a>
            <a @click="confirmChangeVisibility()" class="modal-close waves-effect waves-green btn-flat">
                Confirmar
            </a>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col s12 center">
                <h3>Administración de Catálogo</h3>
            </div>
        </div>
        <div class="divider"></div>
    </div>
    <div class="parallax-container">
        <div class="parallax">
            <img src="../assets/img/generalBackground07.jpg">
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col s12 m12">
                <div class="section center">
                    <h3>Libros en Catálogo</h3>
                </div>
            </div>
            <div class="col s12 m12">
                <div class="section center">
                    <div class="tableContainerInCatalog">
                        <div class="input-field">
                            <i class="material-icons prefix">search</i>
                            <input class="tooltipped" data-position="left" data-tooltip="Presiona Enter para buscar" type="text" id="search" v-model="searchTextInCatalog" @keyup.enter="performSearchInCatalog()">
                            <label for="search">Buscar</label>
                        </div>
                        <table class="highlight responsive-table">
                            <thead>
                                <tr>
                                    <th>Portada</th>
                                    <th>Titulo</th>
                                    <th>Autor</th>
                                    <th>Categoria</th>
                                    <th>Existencias</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="book in booksInCatalogPagination" :key="book.bookId">
                                    <td><img @load="initMaterialBoxed()" :src="book.imageUrl" class="listCover materialboxed"></td>
                                    <td>{{ book.title }}</td>
                                    <td>{{ book.fullName }}</td>
                                    <td>{{ book.descr }}</td>
                                    <td>
                                        <p><b>Registrado:</b> {{ book.copies }}</p>
                                        <p><b>Prestados:</b> {{ book.loanCopies }}</p>
                                        <p><b>Restantes</b> {{ book.copies-book.loanCopies }}</p>
                                    </td>
                                    <td v-if="!book.isVisible">
                                        <p><b>Mostrar:</b></p>
                                        <button @click="changeVisibilityModal(book.catalogId, book.bookId, book.isVisible, book.title, book.fullName, book.descr, book.imageUrl, book.summary)" class="btn-floating waves-effect-light black center">
                                            <i class="material-icons">visibility</i>
                                        </button>
                                    </td>
                                    <td v-if="book.isVisible">
                                        <p><b>Ocultar:</b></p>
                                        <button @click="changeVisibilityModal(book.catalogId, book.bookId, book.isVisible, book.title, book.fullName, book.descr, book.imageUrl, book.summary)" class="btn-floating waves-effect-light black center">
                                            <i class="material-icons">visibility_off</i>
                                        </button>
                                    </td>
                                    <td>
                                        <p><b>Modificar:</b></p>
                                        <button @click="editModal(book.catalogId, book.bookId, book.title, book.imageUrl, book.summary)" class="btn-floating waves-effect-light black center">
                                            <i class="material-icons">edit</i>
                                        </button>
                                        <p><b>Eliminar:</b></p>
                                        <button @click="deleteModal(book.catalogId, book.bookId, book.title, book.fullName, book.descr, book.imageUrl)" class="btn-floating waves-effect-light black center">
                                            <i class="material-icons">delete</i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ul class="pagination">
                        <li class="waves-effect" :class="{ 'disabled': currentPageCatalog === 1 }">
                            <a href="#" @click.prevent="changePageCatalog(currentPageCatalog - 1)">«</a>
                        </li>
                        <li v-for="page in pageCountCatalog" :key="page" class="waves-effect" :class="{ 'active': page === currentPageCatalog }">
                            <a href="#" @click.prevent="changePageCatalog(page)">{{ page }}</a>
                        </li>
                        <li class="waves-effect" :class="{ 'disabled': currentPageCatalog === pageCountCatalog }">
                            <a href="#" @click.prevent="changePageCatalog(currentPageCatalog + 1)">»</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="divider"></div>
    </div>

    <div class="parallax-container">
        <div class="parallax">
            <img src="../assets/img/generalBackground08.jpg">
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col s12 m12">
                <div class="section center">
                    <h3>Libros fuera de catálogo</h3>
                </div>
            </div>
            <div class="col s12 m12">
                <div class="section center">
                    <div class="tableContainerOffCatalog">
                        <div class="input-field">
                            <i class="material-icons prefix">search</i>
                            <input class="tooltipped" data-position="left" data-tooltip="Presiona Enter para buscar" type="text" id="search2" v-model="searchTextOffCatalog" @keyup.enter="performSearchOffCatalog()">
                            <label for="search2">Buscar</label>
                        </div>
                        <table class="highlight responsive-table">
                            <thead>
                                <tr>
                                    <th>Portada</th>
                                    <th>Titulo</th>
                                    <th>Autor</th>
                                    <th>Categoria</th>
                                    <th>Existencias</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="book in booksNotInCatalogListPagination" :key="book.bookId">
                                    <td><img @load="initMaterialBoxed()" :src="book.imageUrl" class="listCover materialboxed"></td>
                                    <td>{{ book.title }}</td>
                                    <td>{{ book.fullName }}</td>
                                    <td>{{ book.descr }}</td>
                                    <td>
                                        <p><b>Registrado:</b> {{ book.copies }}</p>
                                        <p><b>Prestados:</b> {{ book.loanCopies }}</p>
                                        <p><b>Restantes</b> {{ book.copies-book.loanCopies }}</p>
                                    </td>
                                    <td>
                                        <p>Agregar al catálogo:</p>
                                        <button @click="addToCatalogModal(book.bookId, book.imageUrl , book.title, book.fullName, book.descr)" class="btn-floating waves-effect-light green center">
                                            <i class="material-icons">add</i>
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
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
/* global M */
import { onMounted, inject, ref, computed} from 'vue';
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';

const verifyWorker = inject('verifyWorker');
const booksNotInCatalogList = ref([]);
const booksInCatalog = ref([]);
const selCatalogId = ref(null);
const selBookId = ref(null);
const selVisible = ref(null);
const selBook = ref({title:null, author:null, category:null, cover:null, summary:null});
const textAreaRef = ref(null);
const searchTextInCatalog = ref('');
const searchTextOffCatalog = ref('');

// Paginación para libros en catalogo
const currentPageCatalog = ref(1);
const rowsPerPageCatalog = 3;
const booksInCatalogPagination = computed(() => {
    const start = (currentPageCatalog.value - 1) * rowsPerPageCatalog;
    return booksInCatalog.value.slice(start, start + rowsPerPageCatalog);
});
const pageCountCatalog = computed(() => {
    return Math.ceil(booksInCatalog.value.length / rowsPerPageCatalog);
});
function changePageCatalog(page){
    if (page < 1 || page > pageCountCatalog.value)
        return;
    currentPageCatalog.value = page;
}

// Paginación para libros fuera de catalogo
const currentPage = ref(1);
const rowsPerPage = 3;
const booksNotInCatalogListPagination = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage;
    return booksNotInCatalogList.value.slice(start, start + rowsPerPage);
});
const pageCount = computed(() => {
    return Math.ceil(booksNotInCatalogList.value.length / rowsPerPage);
});
function changePage(page){
    if (page < 1 || page > pageCount.value)
        return;
    currentPage.value = page;
}

onMounted(async () => {
    if (!await verifyWorker())
        return;
    initMaterialize();
    fetchNotInCatalog();
    fetchCatalog();
});
function initMaterialize(){
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
    const parallaxElems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallaxElems);
}
function initMaterialBoxed() {
    var materialboxed = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxed);
}
async function fetchNotInCatalog(){
    await axios.get(`${process.env.VUE_APP_API_URL}/catalog/fetchNotInCatalog`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        booksNotInCatalogList.value = res.data;
    })
    .catch( error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
        }
    });
}
async function fetchCatalog(){
    await axios.get(`${process.env.VUE_APP_API_URL}/catalog/fetchCatalog`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async res => {
        booksInCatalog.value = res.data;
    })
    .catch(error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
        }
    });
}
function performSearchInCatalog(){
    if (searchTextInCatalog.value.length == 0){
        fetchCatalog();
    } else {
        axios.get(`${process.env.VUE_APP_API_URL}/catalog/fetchByTitleInCatalog/${searchTextInCatalog.value}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            currentPageCatalog.value = 1;
            booksInCatalog.value = res.data;
        })
        .catch(error => {
            if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
        }
        });
    }
}
function performSearchOffCatalog(){
    if (searchTextOffCatalog.value.length == 0){
        fetchNotInCatalog();
    } else {
        axios.get(`${process.env.VUE_APP_API_URL}/catalog/fetchByTitleOffCatalog/${searchTextOffCatalog.value}`, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(res => {
            currentPage.value = 1;
            booksNotInCatalogList.value = res.data;
        })
        .catch(error => {
            if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
        }
        });
    }
}
function changeVisibilityModal(catalogId, bookId, visible, title, fullName, descr, imageUrl, summary){
    selCatalogId.value = catalogId;
    selBookId.value = bookId;
    selVisible.value = visible;
    selBook.value.title = title;
    selBook.value.author = fullName;
    selBook.value.category = descr;
    selBook.value.cover = imageUrl;
    selBook.value.summary = summary;
    let modalInstance = M.Modal.getInstance(document.querySelector('#changeVisibilityModal'));
    modalInstance.open();
}
async function confirmChangeVisibility(){
    if (selVisible.value){
        // Si el registro es visible, entonces lo hace no visible
        await axios.patch(`${process.env.VUE_APP_API_URL}/catalog/makeNotVisible/${selCatalogId.value}/${selBookId.value}`, null, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(() => {
            M.toast({html: 'Libro ocultado del catálogo', classes: 'green darken-1'});
        })
        .catch(error => {
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
        });
    }else {
        // si el registro no es visible, entonces lo hace visible
        await axios.patch(`${process.env.VUE_APP_API_URL}/catalog/makeVisible/${selCatalogId.value}/${selBookId.value}`, null,{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then(() => {
            M.toast({html: 'Libro publicado en catálogo!', classes: 'green darken-1'});
        })
        .catch(error => {
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
        });
    }
    fetchCatalog();
}
function editModal(catalogId ,bookId, title, imageUrl, summary){
    selCatalogId.value = catalogId;
    selBookId.value = bookId;
    selBook.value.title = title;
    selBook.value.cover = imageUrl;
    textAreaRef.value.value = summary;
    selBook.value.summary = summary;
    let modalInstance = M.Modal.getInstance(document.querySelector('#editModal'));
    modalInstance.open();
    M.textareaAutoResize(textAreaRef.value);
}
function confirmEdit(){
    // Confirmar el cambio de sinopsis
    const data = {summary: selBook.value.summary};
    axios.patch(`${process.env.VUE_APP_API_URL}/catalog/editSummary/${selCatalogId.value}/${selBookId.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(() => {
        M.toast({html: `Sinopsis actualizada!`, classes: 'green lighten-1'});
        fetchCatalog();
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
    });
    
}
function deleteModal(catalogId, bookId, title, fullName, descr, imageUrl){
    selCatalogId.value = catalogId;
    selBookId.value = bookId;
    selBook.value.title = title;
    selBook.value.author = fullName;
    selBook.value.category = descr;
    selBook.value.cover = imageUrl;
    let modalInstance = M.Modal.getInstance(document.querySelector('#deleteModal'));
    modalInstance.open();
}
async function confirmDelete(){
    await axios.delete(`${process.env.VUE_APP_API_URL}/catalog/remove/${selCatalogId.value}/${selBookId.value}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        M.toast({html: `${res.data.message}`, classes: 'red darken-1'});
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
    });
    fetchCatalog();
    fetchNotInCatalog();
}

async function addToCatalogModal(bookId, cover, title, author, category){
    selBookId.value = bookId;
    selBook.value.cover = cover;
    selBook.value.title = title;
    selBook.value.author = author;
    selBook.value.category = category;
    selBook.value.summary = null;
    selVisible.value = 1;
    let modalInstance = M.Modal.getInstance(document.querySelector('#addModal'));
    modalInstance.open();
}
async function confirmAddToCatalog(){
    let data = {summary: selBook.value.summary, isVisible: selVisible.value};
    axios.post(`${process.env.VUE_APP_API_URL}/catalog/add/${selBookId.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(() => {
        M.toast({html: 'Libro publicado en catálogo!', classes: 'green lighten-1'});
        fetchCatalog();
        fetchNotInCatalog();
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red lighten-1'});
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
    height: 145px;
}
.parallax-container {
    height: 200px;
}
.tableContainerInCatalog {
    height: 750px;
}
.tableContainerOffCatalog {
    height: 650px;
}
</style>