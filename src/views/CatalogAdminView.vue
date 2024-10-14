<template>
    <HeaderComponent></HeaderComponent>
    <!-- Modal Structure -->
    <div id="customModal" class="modal">
        <div class="modal-content">
            <h4>¿Agregar al catálogo?</h4>
            <p>Al agregar un libro al catálogo los clientes podrán verlo en la tienda y pedirlo prestado. Siempre puedes volver no visible un elemento del catálogo.</p>
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
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
                        <td><img :src="selBook.cover" class="listCover"></td>
                        <td>{{ selBook.title }}</td>
                        <td>{{ selBook.author }}</td>
                        <td>{{ selBook.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-close waves-effect waves-red btn-flat">Cerrar</a>
            <a @click="confirmDelete()" href="#" class="modal-close waves-effect waves-green btn-flat">Confirmar</a>
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
                        <td><img :src="selBook.cover" class="listCover"></td>
                        <td>{{ selBook.title }}</td>
                        <td>{{ selBook.author }}</td>
                        <td>{{ selBook.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <a href="#" class="modal-close waves-effect waves-red btn-flat">
                Cancelar
            </a>
            <a @click="confirmChangeVisibility()" href="#" class="modal-close waves-effect waves-green btn-flat">
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
        <div class="row">
            <div class="col s12 m12">
                <div class="section center">
                    <h3>Libros en Catálogo</h3>
                </div>
            </div>
            <div class="col s12 m12">
                <div class="section center">
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
                            <tr v-for="book in booksInCatalog" :key="book.bookId">
                                <td><img :src="book.imageUrl" class="listCover"></td>
                                <td>{{ book.title }}</td>
                                <td>{{ book.fullName }}</td>
                                <td>{{ book.descr }}</td>
                                <td>
                                    <p><b>Registrado:</b> {{ book.copies }}</p>
                                    <p><b>Prestados:</b> {{ book.loanCopies }}</p>
                                    <p><b>Restantes</b> {{ book.copies-book.loanCopies }}</p>
                                </td>
                                <td v-if="!book.isVisible">
                                    <p><b>Volver visible:</b></p>
                                    <button @click="changeVisibilityModal(book.catalogId, book.bookId, book.isVisible, book.title, book.fullName, book.descr, book.imageUrl)" class="btn-floating waves-effect-light black center">
                                        <i class="material-icons">visibility</i>
                                    </button>
                                </td>
                                <td v-if="book.isVisible">
                                    <p><b>Ocultar:</b></p>
                                    <button @click="changeVisibilityModal(book.catalogId, book.bookId, book.isVisible, book.title, book.fullName, book.descr, book.imageUrl)" class="btn-floating waves-effect-light black center">
                                        <i class="material-icons">visibility_off</i>
                                    </button>
                                </td>
                                <td>
                                    <p><b>Eliminar:</b></p>
                                    <button @click="deleteModal(book.catalogId, book.bookId, book.title, book.fullName, book.descr, book.imageUrl)" class="btn-floating waves-effect-light red center">
                                        <i class="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="divider"></div>
        <div class="row">
            <div class="col s12 m12">
                <div class="section center">
                    <h3>Libros fuera de catálogo</h3>
                </div>
            </div>
            <div class="col s12 m12">
                <div class="section center">
                    <table class="highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Portada</th>
                                <th>Titulo</th>
                                <th>Autor</th>
                                <th>Categoria</th>
                                <th>Existencias</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in booksNotInCatalogList" :key="book.bookId">
                                <td><img :src="book.imageUrl" class="listCover"></td>
                                <td>{{ book.title }}</td>
                                <td>{{ book.fullName }}</td>
                                <td>{{ book.descr }}</td>
                                <td>
                                    <p><b>Registrado:</b> {{ book.copies }}</p>
                                    <p><b>Prestados:</b> {{ book.loanCopies }}</p>
                                    <p><b>Restantes</b> {{ book.copies-book.loanCopies }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
const booksNotInCatalogList = ref([]);
const booksInCatalog = ref([]);
const selCatalogId = ref(null);
const selBookId = ref(null);
const selVisible = ref(null);
const selBook = ref({title:null, author:null, category:null, cover:null});

onMounted(async () => {
    await verifyUser();
    await initMaterialize();
    fetchNotInCatalog();
    fetchCatalog();
});
function initMaterialize(){
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
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
    .catch(() => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
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
        // Guardar consulta
        booksInCatalog.value = res.data;
    })
    .catch(error => {
        if (error.response.data){
            M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red'});
        } else{
            M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'red'});
        }
    });
}
function openModal() {
    let modalInstance = M.Modal.getInstance(document.querySelector('#customModal'));
    modalInstance.open();
}
function changeVisibilityModal(catalogId, bookId, visible, title, fullName, descr, imageUrl){
    selCatalogId.value = catalogId;
    selBookId.value = bookId;
    selVisible.value = visible;
    selBook.value.title = title;
    selBook.value.author = fullName;
    selBook.value.category = descr;
    selBook.value.cover = imageUrl;
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
            M.toast({html: `Error en la consulta: ${error.message}`});
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
            M.toast({html: `Error en la consulta: ${error.message}`});
        });
    }
    fetchCatalog();
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
        M.toast({html: `Error en la consulta: ${error.message}`});
    });
    fetchCatalog();
    fetchNotInCatalog();
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