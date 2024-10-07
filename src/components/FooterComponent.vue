<template>
    <footer class="page-footer blue darken-2">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">BooksCenter Web</h5>
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text">Enlaces</h5>
                    <ul>
                        <li><a class="grey-text text-lighten-3" href="https://github.com/CanizalesJose/bookscenterweb.git">Web Github</a></li>
                        <li><a class="grey-text text-lighten-3" href="https://github.com/CanizalesJose/PrintOnDemand.git">API Github</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright light-blue darken-4">
            <div class="container center">
                Canizales López José Manuel - 20490690
            </div>
        </div>
    </footer>
</template>

<script setup>
/* eslint-disable */
/* global M */
import { onMounted } from 'vue';
onMounted(() => {
  const elems = document.querySelectorAll('.parallax');
  M.Parallax.init(elems);
});
</script>