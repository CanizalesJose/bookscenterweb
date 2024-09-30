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
            

            <p>¿Estás seguro de querer crear este nuevo usuario?</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <!-- Headers del libro -->
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Autor</th>
                        <th>Publicante</th>
                        <th>Año de publicación</th>
                        <th>Categoría</th>
                        <th>Portada</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Datos del libro creado -->
                         <td>{{ selId }}</td>
                         <td>{{ selTitle }}</td>
                         <td>{{ selIsbn }}</td>
                         <td>{{ selFullname }}({{ selAuthor }})</td>
                         <td>{{ selPublisher }}</td>
                         <td>{{ selPublishYear }}</td>
                         <td>{{ selDescr }}({{ selCategory }})</td>
                         <td>
                            <img v-bind:src="selImageUrl" alt="Portada">
                         </td>
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
            <label>Nuevo numero de contacto</label>
            <input v-model="selContactNumber" autocomplete="off">
            

            <p>¿Estás seguro de querer actualizar este registro?</p>
            <br>
            <p>El nuevo registro quedará de la siguiente manera:</p>
            <table class="responsive-table">
                <thead>
                    <tr>
                        <!-- Datos de libro -->
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Nuevos datos -->
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Datos del registro eliminado-->
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
</template>

<script setup>
/* eslint-disable */
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
import { onMounted, inject, ref } from 'vue';

const verifyAdmin = inject('verifyAdmin');

const selId = ref(null);
const selTitle = ref(null);
const selIsbn = ref(null);
const selFullname = ref(null);
const selAuthor = ref(null);
const selPublisher = ref(null);
const selPublishYear = ref(null);
const selCategory = ref(null);
const selDescr = ref(null);
const selImageUrl = ref(null);

const booksList = ref([]);

onMounted(async () => {
    if (!await verifyAdmin())
        return;
});

async function fetchBooks(){
    
}

</script>