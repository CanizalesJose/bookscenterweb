<template>
    <HeaderComponent></HeaderComponent>
    <div class="fixed-action-btn">
        <a @click="registerModal('', '')" class="btn-floating btn-large green lighten-1">
            <i class="large material-icons">add</i>
        </a>
    </div>
    <div class="container">
        <div class="row">
            <div class="divider"></div>
            <div class="section center">
                <h3>Categorías</h3>
                <br>
                <p>
                    En este apartado es posible administrar los registros de categorías.
                    <br><br>
                    Los géneros literarios son los grupos o categorías en que podemos clasificar las obras literarias, según su contenido y estructura. Para el autor, el género literario sirve de modelo de estructura, ya que le permite establecer un esquema previo a la elaboración de su obra.
                </p>
            </div>
            <div class="divider"></div>
        </div>

        <div class="row">
            <div class="container">
                <div class="section center">
                    <h3>Gestión de Categorías</h3>
                </div>
                <!-- Construir tabla con datos de categorias -->
                <table class="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripción</th>
                            <th>Actualizar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Generar registros de tabla dinámicamente -->
                        <tr v-for="category in categories" :key="category.id">
                            <td>{{ category.id }}</td>
                            <td>{{ category.descr }}</td>
                            <td>
                                <button @click="updateModal(category.id, category.descr)" class="btn-floating waves-effect waves-light green lighten-1">
                                    <i class="material-icons prefix">edit</i>
                                </button>
                            </td>
                            <td>
                                <button @click="deleteModal(category.id, category.descr)" class="btn-floating waves-effect waves-light red lighten-1">
                                    <i class="material-icons prefix">delete</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal para confirmar actualización -->
    <div id="updateModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Confirmar actualización</h4>
            <div class="divider"></div>
            <label for="newDescr1">Nueva descripción:</label>
            <input v-model="selectedDscr" id="newDescr1" autocomplete="off">
            <p>¿Estás seguro de querer actualizar con estos datos?</p>
            <p>El nuevo registro quedará de la siguiente manera:</p>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descripción o nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ selectedId }}</td>
                        <td>{{ selectedDscr }}</td>
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
            <p>¿Estás seguro de querer eliminar esta categoría?</p>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ selectedId }}</td>
                        <td>{{ selectedDscr }}</td>
                    </tr>
                </tbody>
            </table>
            <p>
                Esta acción no puede deshacerse.
            </p>
        </div>
        <div class="modal-footer">
            <div class="divider"></div>
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
            <a href="#!" @click="confirmDelete" class="modal-close waves-effect waves-red btn-flat">Eliminar</a>
        </div>
    </div>
    <!-- Modal para confirmar creación -->
    <div id="registerModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Confirmar registro</h4>
            <div class="divider"></div>
            <label for="newId">Nuevo Id:</label>
            <input v-model="newId" id="newId" autocomplete="off">
            <label for="newDescr2">Nueva descripción o nombre:</label>
            <input v-model="newDescr" id="newDescr2" autocomplete="off">
            <p>¿Estás seguro de querer crear esta categoría?</p>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descripción o nombre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ newId }}</td>
                        <td>{{ newDescr }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <div class="divider"></div>
            <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancelar</a>
            <a href="#!" @click="confirmRegister" class="modal-close waves-effect waves-green btn-flat">Registrar</a>
        </div>
    </div>
</template>

<script setup>
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import {ref, onMounted, inject} from 'vue';
import axios from 'axios';

const verifyAdmin = inject('verifyAdmin');
const categories = ref([]);
const selectedId = ref(null);
const selectedDscr = ref(null);
const newId = ref(null);
const newDescr = ref(null);

onMounted(async () => {
    if (!await verifyAdmin()){
        return;
    }
    fetchCategories();
    initModals();
});

async function initModals() {
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
}
async function updateModal(id, descr) {
    selectedId.value = id;
    selectedDscr.value = descr;
    const updateModal = M.Modal.getInstance(document.querySelector('#updateModal'));
    updateModal.open();
}
async function deleteModal(id, descr) {
    selectedId.value = id;
    selectedDscr.value = descr;
    const deleteModal = M.Modal.getInstance(document.querySelector('#deleteModal'));
    deleteModal.open();
}
async function registerModal(id, descr){
    newId.value = id;
    newDescr.value = descr;
    const registerModal = M.Modal.getInstance(document.querySelector('#registerModal'));
    registerModal.open();
}
async function fetchCategories(){
    try {
        let results = await axios('http://localhost:5000/api/categories/findAll', {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        categories.value = results.data;
    } catch (error) {
        M.toast({html: `Error en la solicitud: ${error.response.status}`, classes: 'red'});
    }
}

async function confirmUpdate() {
    let data = {
        descr: selectedDscr.value
    }
    await axios.patch(`http://localhost:5000/api/categories/update/${selectedId.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(() => {
        let index = categories.value.findIndex(category => category.id === selectedId.value);
        if (index != 1){
            categories.value[index].descr = selectedDscr.value;
        }
        M.toast({html: `Categoría actualizada`, classes: 'green lighten-1'});
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
async function confirmDelete(){
    await axios.delete(`http://localhost:5000/api/categories/delete/${selectedId.value}`,{
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(() => {
        let index = categories.value.findIndex(category => category.id === selectedId.value);
        if (index != -1){
            categories.value.splice(index, 1);
            M.toast({html: `Categoría eliminada`, classes: 'red lighten-1'});
        }
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
async function confirmRegister(){
    if (!newId.value){
        M.toast({html: `El ID no puede estar vacío`, classes: 'red lighten-1'});
        return;
    }
    const data = {
        descr: newDescr.value
    }
    await axios.post(`http://localhost:5000/api/categories/register/${newId.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then( () => {
        categories.value.push({
            id: newId.value,
            descr: newDescr.value
        });
        M.toast({html: `Categoría creada`, classes: 'green lighten-1'});
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
table th, table td {
    text-align: center;
    vertical-align: middle;
    padding: 10px;
}
.modalContainer{
    padding-left: 5%;
    padding-right: 5%;
}
</style>