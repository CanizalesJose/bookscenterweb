<template>
    <HeaderComponent :key="headerKey"></HeaderComponent>
    <div>
    <!-- Botón para abrir el modal -->
        <div class="fixed-action-btn">
            <a @click="openModal" class="btn-floating btn-large red">
            <i class="large material-icons">shopping_cart_checkout</i>
            </a>
        </div>

    <!-- Modal Structure -->
        <div id="customModal" class="modal">
            <div class="modal-content">
                <h4>Confirmar pedido</h4>
                <p>Los libros prestados se deben devolver en una semana como máximo.</p>
            </div>
            <div class="modal-footer">
                <a href="#" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
            </div>
        </div>
    </div>

    <div class="valign-wrapper">
        <div class="row">
            <div class="col s12 center">
                <h3>Catalogo</h3>
            </div>
            
            <div class="row" style="padding-left: 10vw; padding-right: 10vw;">
                <!-- Aqui se genera el catalogo -->
                <BookCardComponent></BookCardComponent>
                <BookCardComponent></BookCardComponent>
                <BookCardComponent></BookCardComponent>
                <BookCardComponent></BookCardComponent>
                <BookCardComponent></BookCardComponent>
            </div>
        </div>
    </div>
    
</template>

<script setup>
/* eslint-disable */
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import BookCardComponent from '@/components/BookCardComponent.vue';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import axios from 'axios';

const headerKey = ref(0);

verifyToken(localStorage.getItem('token'), localStorage.getItem('username'), localStorage.getItem('usertype'));

onMounted( async () => {
    await nextTick();
    
    
    // Inicializar el carrito (modal)
    const modal = document.querySelector('#customModal');
    M.Modal.init(modal);
});

function openModal() {
    const modalInstance = M.Modal.getInstance(document.querySelector('#customModal'));
    modalInstance.open();
}

async function verifyToken(storedToken, storedUser, storedUsertype){
    try {
        if (storedToken && storedUser && storedUsertype){
            let result = await axios.get('http://localhost:5000/api/users/validToken', {
                headers: {
                    token: storedToken
                }
            });
            localStorage.setItem('username', result.data.username);
            localStorage.setItem('usertype', result.data.usertype);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('usertype');
            localStorage.removeItem('token');
        }
    } catch (error) {
        if (error.status == 401){
            localStorage.removeItem('username');
            localStorage.removeItem('usertype');
            localStorage.removeItem('token');
            M.toast({html: 'Sesión caducada', classes: 'green'});
            headerKey.value++;
        }
    }
    
}
</script>

<style scoped>

</style>