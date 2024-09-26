<template>
    <HeaderComponent></HeaderComponent>
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

            </div>
        </div>
    </div>
    
</template>

<script setup>
/* eslint-disable */
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
    // Inicializar el modal
    const modal = document.querySelector('#customModal');
    M.Modal.init(modal);
});

function openModal() {
    const modalInstance = M.Modal.getInstance(document.querySelector('#customModal'));
    modalInstance.open();
}
</script>

<style scoped>

</style>