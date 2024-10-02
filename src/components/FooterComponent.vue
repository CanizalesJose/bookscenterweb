<template>
    <div class="parallax-container">
        <div class="parallax">
            <img :src="imageSrc" alt="Footer Parallax Image">
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
/* global M */
import { onMounted } from 'vue';
onMounted(() => {
  const elems = document.querySelectorAll('.parallax');
  M.Parallax.init(elems);
});
const props = defineProps({
imageSrc: {
    type: String,
    required: true
}
});
</script>
  
<style scoped>
.parallax-container {
    height: 70px;
}

.parallax img {
    width: 100%;
    height: auto;
}
</style>
