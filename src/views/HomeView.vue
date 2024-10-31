<template>
    <HeaderComponent></HeaderComponent>
    <div class="section">
        <div class="container center">
            <br><br>
            <h3 class="header">Bienvenido a BooksCenter</h3>
            <br>
            <div class="divider"></div>
            <br>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc diam nisl, tristique non enim ac, ultrices fringilla nibh. Vivamus sodales mi turpis, vel ultrices enim viverra id. Proin pharetra, turpis ut commodo commodo, turpis dui pretium dui, sed interdum sapien neque sed libero. Praesent aliquam risus arcu, vel rhoncus ante porta id. Sed imperdiet mi ut lacus tincidunt tristique. Morbi laoreet nibh sit amet massa elementum, imperdiet porttitor justo aliquam. Nullam vel posuere magna, vitae venenatis orci. Sed finibus, justo vel pellentesque ullamcorper, dui ante imperdiet ex, id pellentesque massa felis eu elit. Donec vel dui posuere sem scelerisque tincidunt bibendum in urna.
            </p>
            
            <div class="divider"></div>
            <div v-if="topLoans.length == 5">
                <h5 class="header">Top 5 Lecturas</h5>
                <div class="carousel">
                    <a class="carousel-item" href="/catalog" v-for="book in topLoans" :key="book.bookId">
                        <img :src="book.cover" @load="initMaterialize()">
                    </a>
                </div>
            </div>

            <p>
                Donec in sem in libero viverra molestie. Quisque at massa vehicula, consectetur massa in, facilisis urna. Ut sit amet tristique dui. Aenean fringilla nibh at dui mollis, non pharetra magna convallis. Aliquam et volutpat turpis. In vehicula venenatis nisi vitae volutpat. Cras porttitor ligula vel arcu tincidunt condimentum. Curabitur lacinia viverra elit, non ornare enim pretium vel. Nullam tincidunt arcu vitae metus egestas, ut pulvinar ex feugiat. In at rhoncus odio, et tempus nibh. Aenean at fermentum felis, non cursus elit. Nulla tincidunt nec urna non tincidunt.
            </p>
        </div>
    </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
import { onMounted, inject, ref, onBeforeMount } from 'vue';
/* global M */
const verifyUser = inject('verifyUser');
const topLoans = ref([]);
onBeforeMount(async () => {
    await fetchTopLoans();
});
onMounted(async () => {
    await verifyUser();
    await initMaterialize();
});
function initMaterialize() {
    const carouselElems = document.querySelectorAll('.carousel');
    M.Carousel.init(carouselElems);
}
function fetchTopLoans(){
    axios.get(`${process.env.VUE_APP_API_URL}/catalog/fetchTopLoans`)
    .then(res => {
        topLoans.value = res.data;
    })
    .catch(error => {
        if (error.response)
            M.toast({html: `${error.response.data.message}`, classes: 'yellow darken-4'});
    });
}
</script>