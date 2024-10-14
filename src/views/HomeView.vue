<template>
    <HeaderComponent></HeaderComponent>
    <div class="section">
        <div class="container center">
            <br><br>
            <h3 class="header">Bienvenido a BookCenter</h3>
            <br>
            <div class="divider"></div>
            <br>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc diam nisl, tristique non enim ac, ultrices fringilla nibh. Vivamus sodales mi turpis, vel ultrices enim viverra id. Proin pharetra, turpis ut commodo commodo, turpis dui pretium dui, sed interdum sapien neque sed libero. Praesent aliquam risus arcu, vel rhoncus ante porta id. Sed imperdiet mi ut lacus tincidunt tristique. Morbi laoreet nibh sit amet massa elementum, imperdiet porttitor justo aliquam. Nullam vel posuere magna, vitae venenatis orci. Sed finibus, justo vel pellentesque ullamcorper, dui ante imperdiet ex, id pellentesque massa felis eu elit. Donec vel dui posuere sem scelerisque tincidunt bibendum in urna.
            </p>
            
            <div class="divider"></div>
            <h5 class="header">Top Lecturas del mes</h5>
            <div class="carousel">
                <a class="carousel-item" href="#1">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s">
                </a>

                <a class="carousel-item" href="#2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s">
                </a>

                <a class="carousel-item" href="#3">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s">
                </a>

                <a class="carousel-item" href="#4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s">
                </a>

                <a class="carousel-item" href="#5">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT58P55blSKZmf2_LdBoU7jETl6OiB2sjYy9A&s">
                </a>
            </div>

            <p>
                Donec in sem in libero viverra molestie. Quisque at massa vehicula, consectetur massa in, facilisis urna. Ut sit amet tristique dui. Aenean fringilla nibh at dui mollis, non pharetra magna convallis. Aliquam et volutpat turpis. In vehicula venenatis nisi vitae volutpat. Cras porttitor ligula vel arcu tincidunt condimentum. Curabitur lacinia viverra elit, non ornare enim pretium vel. Nullam tincidunt arcu vitae metus egestas, ut pulvinar ex feugiat. In at rhoncus odio, et tempus nibh. Aenean at fermentum felis, non cursus elit. Nulla tincidunt nec urna non tincidunt.
            </p>
        </div>
    </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted, inject } from 'vue';
/* global M */
const verifyUser = inject('verifyUser');
onMounted(async () => {
    await verifyUser();
    const carouselElems = document.querySelectorAll('.carousel');
    M.Carousel.init(carouselElems);
});
</script>