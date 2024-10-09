<template>
    <HeaderComponent></HeaderComponent>
    <!-- Titulo -->
    <div class="container">
        <div class="row">
            <div class="divider"></div>
            <div class="section center">
                <h3>Prestamos</h3>
                <br>
                <p>
                    Desde este apartado es posible ver y administrar los distintos libros que se encuentran prestados. En primer lugar aparecerán aquellos que se encuentren todavía sin retornar, y despues se encuentra un registro que muestra un registro de aquellos que ya han sido entregados.
                </p>
            </div>
            <div class="divider"></div>
        </div>
    </div>
    <!-- Imagen -->
    <div class="parallax-container">
        <div class="parallax">
            <img src="https://img.freepik.com/free-photo/view-books-arrangement_23-2148882757.jpg?t=st=1728429445~exp=1728433045~hmac=cddf2eecac61ffc3ea9fa3c0644344e882f067eb039206d845254e9beb4517f2&w=826">
        </div>
    </div>
    <!-- Pendientes -->
    <div class="container">
        <div class="row">
            <div class="section center">
                <h3>Prestamos pendientes</h3>
            </div>
            <!-- Tablas de prestamos pendientes separados por id de prestamo -->
        </div>
    </div>
    <!-- Imagen -->
    <div class="parallax-container">
        <div class="parallax">
            <img src="https://img.freepik.com/free-photo/textbooks-lying-near-bookcase_23-2147845949.jpg?t=st=1728430549~exp=1728434149~hmac=b97c53a32592849739fb9252e946e071096f10c2d000cd254c00bc6f690572c4&w=740">
        </div>
    </div>
    <!-- Registro -->
    <div class="container">
        <div class="row">
            <div class="section center">
                <h3>Historial de prestamos</h3>
            </div>
            <!-- Tabla de historial -->
        </div>
    </div>
</template>

<script setup>
/* global M */
import HeaderComponent from '@/components/HeaderComponent.vue';
import { inject, onMounted } from 'vue';

const verifyAdmin = inject('verifyAdmin');

onMounted(async () => {
    if (!await verifyAdmin())
        return;
    await initMaterialize();
});

async function initMaterialize() {
    const parallaxElems = document.querySelectorAll('.parallax');
    M.Parallax.init(parallaxElems);
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
    height: 300px;
}
.parallax {
    width: 100%;
    height: auto;
}
</style>