<template>
    <HeaderComponent></HeaderComponent>

    <div class="fixed-action-btn">
        <a @click="registerModal(null, null, null, null, null)" class="btn-floating btn-large green lighten-1">
            <i class="large material-icons">add</i>
        </a>
    </div>
    <!-- Modal para confirmar creación -->
    <div id="registerModal" class="modal modalContainer">
        <div class="modal-content">
            <h4>Confirmar registro</h4>
            <div class="divider"></div>
            <!-- Nuevos datos -->
            <label for="newUsername">Nombre de usuario:</label>
            <input v-model="selUsername" id="newUsername" autocomplete="off">
            <label for="newPassword">Contraseña:</label>
            <input type="password" v-model="selPassword" id="newPassword" autocomplete="off">
            <select v-model="selUsertype">
                <option value="" disabled selected>Seleccionar tipo de usuario:</option>
                <option value="admin">Administrador</option>
                <option value="client">Cliente</option>
            </select>
            <br>
            <label>Número de contacto:</label>
            <input v-model="selContactNumber" autocomplete="off">
            <label>Email</label>
            <input v-model="selEmail" autocomplete="off">
            

            <p>¿Estás seguro de querer crear este nuevo usuario?</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <!-- Headers del usuario -->
                         <th>Nombre</th>
                         <th>Contraseña</th>
                         <th>Tipo</th>
                         <th>Contacto</th>
                         <th>Correo electronico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Datos del usuario a crear -->
                        <td>{{ selUsername }}</td>
                        <td><input  class="center" disabled type="password" :value="selPassword"></td>
                        <td>{{ selUsertype }}</td>
                        <td>{{ selContactNumber }}</td>
                        <td>{{ selEmail }}</td>
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
            <!-- Nuevos datos -->
            <label>Nuevo numero de contacto</label>
            <input v-model="selContactNumber" autocomplete="off">
            <label>Nuevo correo electronico</label>
            <input v-model="selEmail" autocomplete="off">
            <label>Nueva contraseña</label>
            <input class="tooltipped" type="password" data-position="left" data-tooltip="Dejar vacío para no cambiar" v-model="selPassword" autocomplete="off">
            <label>Nuevo tipo de usuario:</label>
            <select v-model="selUsertype">
                <option value="admin">Administrador</option>
                <option value="client">Cliente</option>
            </select>
            

            <p>¿Estás seguro de querer actualizar este registro?</p>
            <br>
            <p>El nuevo registro quedará de la siguiente manera:</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Nueva contraseña (dejar vacía para no cambiar)</th>
                        <th>Nuevo tipo de usuario</th>
                        <th>Nuevo número de contacto</th>
                        <th>Nuevo email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Nuevos datos -->
                         <td>{{ selUsername }}</td>
                         <td><input class="center" disabled type="password" :value="selPassword"></td>
                         <td>{{ selUsertype }}</td>
                         <td>{{ selContactNumber }}</td>
                         <td>{{ selEmail }}</td>
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
            <p>¿Estás seguro de querer eliminar este usuario?</p>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Tipo de usuario</th>
                        <th>Numero de contacto</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ selUsername }}</td>
                        <td>{{ selUsertype }}</td>
                        <td>{{ selContactNumber }}</td>
                        <td>{{ selEmail }}</td>
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
                <h3>Usuarios</h3>
                <br>
                <p>En este apartado es posible administrar libremente a todos los usuarios registrados, así como promoverlos a administradores, en caso de ser necesario</p>
                <p>Si alguien ha perdido su contraseña este es el lugar donde se puede cambiar.</p>
            </div>
            <div class="divider"></div>
        </div>
    </div>

    <div class="parallax-container">
        <div class="parallax">
            <img src="https://images.freeimages.com/images/large-previews/5c9/old-libary-1231166.jpg?fmt=webp&h=350">
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="section center">
                <h3>Gestión de usuarios</h3>
            </div>

            <table class="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Nombre de usuario</th>
                        <th>Tipo de usuario</th>
                        <th>Numero Telefonico</th>
                        <th>Correo Electronico</th>
                        <th>Entregas atrasadas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in usersList" :key="user.username">
                        <td>{{ user.username }}</td>
                        <td>{{ user.usertype }}</td>
                        <td>{{ user.contactNumber }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <div v-if="user.penalized">Si</div>
                            <div v-else>No</div>
                        </td>
                        <td>
                            <button @click="updateModal(user.username, null, user.usertype, user.contactNumber, user.email)" class="btn-floating waves-effect waves-light green lighten-1">
                                <i class="material-icons prefix">edit</i>
                            </button>
                        </td>
                        <td>
                            <button @click="deleteModal(user.username, user.usertype, user.contactNumber, user.email)" class="btn-floating waves-effect waves-light red lighten-1">
                                <i class="material-icons prefix">delete</i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
/* global M */
/* eslint-disable */
import HeaderComponent from '@/components/HeaderComponent.vue';
import {ref, onMounted, inject} from 'vue';
import axios from 'axios';

const verifyAdmin = inject('verifyAdmin');
const usersList = ref([]);
const selUsername = ref(null);
const selPassword = ref(null);
const selUsertype = ref(null);
const selContactNumber = ref(null);
const selEmail = ref(null);
const checkEmail = /^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
const checkNumber = /^[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}$/


onMounted(async () => {
    if (!await verifyAdmin())
        return;
    fetchUsers();
    initMaterialize();
});

async function fetchUsers(){
    await axios.get(`${process.env.VUE_APP_API_URL}/users/findAll`, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(res => {
        usersList.value = res.data;
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.message}`, classes: 'yellow darken-4'});
    });
}

async function initMaterialize() {
    let modalElems = document.querySelectorAll('.modal');
    M.Modal.init(modalElems);
    let selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
    let toolTipsElems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(toolTipsElems);
    const parallaxElems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallaxElems);
}
function reInitSelect() {
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);
}
function checkData(){
    let pass = true;
    if (!selUsername.value){
        M.toast({html: 'El nombre de usuario no puede estar vacío.', classes: 'red lighten-1'});
        pass = false;
    }
    if (selUsername.value && selUsername.value.length > 30){
        M.toast({html: 'El nombre de usuario no puede ser mayor a 30 caracteres.', classes: 'red lighten-1'});
        pass = false;
    }
    if (selPassword.value && selPassword.value.length > 100){
        M.toast({html: 'La contraseña no puede ser mayor a 100 caracteres.', classes: 'red lighten-1'});
        pass = false;
    }
    if (!selUsertype.value){
        M.toast({html: 'Se debe seleccionar un tipo de usuario', classes: 'red lighten-1'});
        pass = false;
    }
    if (!selContactNumber.value){
        M.toast({html: 'El número de contacto no puede estar vacío', classes: 'red lighten-1'});
        pass = false;
    }
    if (selContactNumber.value && !checkNumber.test(selContactNumber.value)){
        M.toast({html: 'El número debe seguir el formato 1234567890 o 123-123-1234.', classes: 'red lighten-1'});
        pass = false;
    }
    if (!selEmail.value){
        M.toast({html: 'El email no puede estar vacío', classes: 'red lighten-1'});
        pass = false;
    }
    if (selEmail.value && selEmail.value.length > 100){
        M.toast({html: 'El email debe tener menos de 100 caracteres', classes: 'red lighten-1'});
        pass = false;
    }
    if (selEmail.value && !checkEmail.test(selEmail.value)){
        M.toast({html: `Email debe tener el formato: example@email.xyz`, classes: `red lighten-1`});
        pass = false;
    }
    return pass;
}
async function updateModal(username, password, usertype, contactNumber, email) {
    selUsername.value = username;
    selPassword.value = password;
    selUsertype.value = usertype;
    selContactNumber.value = contactNumber;
    selEmail.value = email;
    const updateModal = M.Modal.getInstance(document.querySelector('#updateModal'));
    updateModal.open();
    setTimeout(() => {
        reInitSelect();
    }, 0);
}
async function confirmUpdate(){
    if (!checkData())
        return;
    let data = {
        password: selPassword.value,
        usertype: selUsertype.value,
        contactNumber: selContactNumber.value,
        email: selEmail.value
    }
    await axios.patch(`${process.env.VUE_APP_API_URL}/users/update/${selUsername.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(async () => {
        await fetchUsers()
        M.toast({html: `Usuario actualizado`, classes: 'green lighten-1'});
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
async function deleteModal(username, usertype, contactNumber, email) {
    selUsername.value = username;
    selUsertype.value = usertype;
    selContactNumber.value = contactNumber;
    selEmail.value = email;
    const deleteModal = M.Modal.getInstance(document.querySelector('#deleteModal'));
    deleteModal.open();
}
async function confirmDelete(){
    await axios.delete(`${process.env.VUE_APP_API_URL}/users/delete/${selUsername.value}`,{
        headers: {
            token: localStorage.getItem('token')
        }
    }
    )
    .then(() => {
        let index = usersList.value.findIndex(user => user.username === selUsername.value);
        if (index != -1){
            usersList.value.splice(index, 1);
            M.toast({html: `Usuario eliminado`, classes: 'red darken-4'});
        }
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
async function registerModal(username, password, usertype, contactNumber, email){
    selUsername.value = username;
    selPassword.value = password;
    selUsertype.value = usertype;
    selContactNumber.value = contactNumber;
    selEmail.value = email;
    const registerModal = M.Modal.getInstance(document.querySelector('#registerModal'));
    registerModal.open();
    setTimeout(() => {
        reInitSelect();
    }, 0);
}
async function confirmRegister(){
    let pass = true;
    pass = checkData();
    if (!selPassword.value){
        M.toast({html: 'La contraseña no puede estar vacía.', classes: 'red lighten-1'});
        pass = false
    }
    if (!pass)
        return;
    let data = {
        password: selPassword.value,
        usertype: selUsertype.value,
        contactNumber: selContactNumber.value,
        email: selEmail.value
    };
    await axios.post(`${process.env.VUE_APP_API_URL}/users/register/${selUsername.value}`, data, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then( () => {
        usersList.value.push({
            username: selUsername.value,
            usertype: selUsertype.value,
            contactNumber: selContactNumber.value,
            email: selEmail.value
        });
        M.toast({html: 'Usuario registrado correctamente', classes: 'green lighten-1'});
    })
    .catch(error => {
        M.toast({html: `Error en la solicitud: ${error.response.data.message}`, classes: 'yellow darken-4'});
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
.parallax-container {
width: 100%;
}
.parallax {
    width: 100%;
    height: auto;
}
</style>