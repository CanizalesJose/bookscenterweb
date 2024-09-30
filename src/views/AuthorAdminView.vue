<template>
    <HeaderComponent></HeaderComponent>
    <div class="fixed-action-btn">
        <a @click="registerModal('', '', '')" class="btn-floating btn-large green lighten-1">
            <i class="large material-icons">add</i>
        </a>
    </div>
    <!-- Modal para confirmar creación -->
    <div id="registerModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Confirmar registro</h4>
            <div class="divider"></div>
            <label for="newId">Nuevo Id:</label>
            <input v-model="newId" id="newId" autocomplete="off">
            <label for="newFullname">Nombre completo:</label>
            <input v-model="newFullname" id="newFullname" autocomplete="off">
            <label for="newNationality">Nacionalidad</label>
            <input v-model="newNationality" id="newNationality" autocomplete="off">
            <p>¿Estás seguro de querer crear esta categoría?</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre completo</th>
                        <th>Nacionalidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ newId }}</td>
                        <td>{{ newFullname }}</td>
                        <td>{{ newNationality }}</td>
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
            <label>Nombre completo</label>
            <input v-model="newFullname" autocomplete="off">
            <label>Nacionalidad</label>
            <input v-model="newNationality" autocomplete="off">

            <p>¿Estás seguro de querer actualizar este registro?</p>
            <br>
            <p>El nuevo registro quedará de la siguiente manera:</p>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre completo</th>
                        <th>Nacionalidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ newId }}</td>
                        <td>{{ newFullname }}</td>
                        <td>{{ newNationality }}</td>
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
                        <th>Nombre completo</th>
                        <th>Nacionalidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ newId }}</td>
                        <td>{{ newFullname }}</td>
                        <td>{{ newNationality }}</td>
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
                <h3>Autores</h3>
                <br>
                <p>
                    En este apartado es posible administrar los autores registrados en sistema. Se puede dar de alta nuevos autores, modificar los ya existentes o eliminar registros.
                </p>
                <br>
                <p>
                    Es la persona natural o física que realiza la creación intelectual. Se entiende que es una persona que concibe en su mente la creación y que luego la plasma o expresa en una obra. Varias personas pueden ser autoras de una misma obra, en cuyo caso se habla de “coautoría”. Una persona jurídica no puede ser considerada autora. Ella podría ser la titular de los derechos patrimoniales (derechohabiente).
                </p>
            </div>
            <div class="divider"></div>
        </div>

        <div class="row">
            <div class="section center">
                <h3>Administrar autores</h3>
                <br><br>
                <table class="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre completo</th>
                            <th>Nacionalidad</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Generar tabla de registros -->
                        <tr v-for="author in authorsList" :key="author.id">
                            <td>{{ author.id }}</td>
                            <td>{{ author.fullName }}</td>
                            <td>{{ author.nationality }}</td>
                            <td>
                                <button @click="updateModal(author.id, author.fullName, author.nationality)" class="btn-floating waves-effect waves-light green lighten-1">
                                    <i class="material-icons prefix">edit</i>
                                </button>
                            </td>
                            <td>
                                <button @click="deleteModal(author.id, author.fullName, author.nationality)" class="btn-floating waves-effect waves-light red lighten-1">
                                    <i class="material-icons prefix">delete</i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import { ref, onMounted, inject} from 'vue';
import axios from 'axios';

onMounted( async () => {
    if (!await verifyAdmin())
        return;
    fetchAuthors();
    initModals();
});

const verifyAdmin = inject('verifyAdmin');
const newId = ref(null);
const newFullname = ref(null);
const newNationality = ref(null);
const authorsList = ref([]);

async function fetchAuthors() {
    try {
        let results = await axios(`${process.env.VUE_APP_API_URL}/authors/findAll`, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        authorsList.value = results.data;
    } catch (error) {
        M.toast({html: 'Hubo un error en la conexión', classes: 'red'});
    }
}
async function initModals() {
    const modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
}
async function registerModal(id, fullname, nationality){
    newId.value = id;
    newFullname.value = fullname;
    newNationality.value = nationality;
    const registerModal = M.Modal.getInstance(document.querySelector('#registerModal'));
    registerModal.open();
}
async function confirmRegister(){
    if (!newId.value){
        M.toast({html: 'El ID no puede estar vacío.', classes: 'red lighten-1'});
        return;
    }
    let data = {
        newFullname: newFullname.value,
        newNationality: newNationality.value
    }
    await axios.post(`${process.env.VUE_APP_API_URL}/authors/register/${newId.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then( () => {
        authorsList.value.push({
            id: newId.value,
            fullName: newFullname.value,
            nationality: newNationality.value
        });
        M.toast({html: `Autor agregado`, classes: 'green lighten-1'});
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red lighten-1'});
    });
}
async function updateModal(id, fullname, nationality) {
    newId.value = id;
    newFullname.value = fullname;
    newNationality.value = nationality;    
    const updateModal = M.Modal.getInstance(document.querySelector('#updateModal'));
    updateModal.open();
}
async function confirmUpdate() {
    let data = {
        newFullname: newFullname.value,
        newNationality: newNationality.value
    }
    await axios.patch(`${process.env.VUE_APP_API_URL}/authors/update/${newId.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then( () => {
        let index = authorsList.value.findIndex(author => author.id === newId.value);
        if (index != -1){
            authorsList.value[index].fullName = newFullname.value;
            authorsList.value[index].nationality = newNationality.value;
        }
        M.toast({html: `Autor actualizado`, classes: 'green lighten-1'});
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red lighten-1'});
    });
}
async function deleteModal(id, fullname, nationality) {
    newId.value = id;
    newFullname.value = fullname;
    newNationality.value = nationality;
    const deleteModal = M.Modal.getInstance(document.querySelector('#deleteModal'));
    deleteModal.open();
}
async function confirmDelete() {
    await axios.delete(`${process.env.VUE_APP_API_URL}/authors/delete/${newId.value}`,{
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then( () => {
        let index = authorsList.value.findIndex(author => author.id === newId.value);
        if (index != -1){
            authorsList.value.splice(index, 1);
        }
        M.toast({html: 'Autor eliminado', classes: 'red lighten-1'});
    })
    .catch(error => {
        console.log(error);
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'red lighten-1'});
    });
}
</script>

<style scoped>
.row {
    padding-top: 5vh;
}
.modalContainer{
    padding-left: 5%;
    padding-right: 5%;
}
table th, table td {
    text-align: center;
    vertical-align: middle;
    padding: 10px;
}
</style>