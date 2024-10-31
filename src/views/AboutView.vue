<template>
    <HeaderComponent></HeaderComponent>
    <div class="container halign-wrapper">
        <h3 class="center">Acerca de...</h3>
        <div class="divider"></div>
        <div class="row">
            <div class="col s12">
                <p>
                    Aenean eros massa, feugiat quis tempor vitae, mattis eget magna. Duis pretium aliquet ultricies. Aenean et metus dapibus, iaculis est vel, venenatis diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac nisi pulvinar, consectetur magna a, suscipit lectus. Nunc ac lectus quis dolor iaculis posuere eget nec velit. Maecenas tristique tellus eget augue gravida, a hendrerit nisl porttitor. Nulla et est velit. Nullam vel velit dolor. Donec commodo aliquet tincidunt.
                </p>
            </div>
        </div>
        <div class="divider" ></div>
        <div class="row">
            <div class="col s5">
                <p>
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed id ullamcorper velit. Aliquam erat volutpat. Curabitur interdum mauris non arcu pharetra congue. Proin euismod sodales urna, sit amet pretium metus blandit eu
                </p>
            </div>
            <div class="col s7 offset">
                <ul class="collection with-header">
                    <li class="collection-header"><h6>Aliquam bibendum porttitor arcu ut viverra</h6></li>
                    <li class="collection-item">Nullam augue elit, pellentesque ut gravida ac, venenatis quis orci.</li>
                    <li class="collection-item">Nullam augue elit, pellentesque ut gravida ac, venenatis quis orci.</li>
                    <li class="collection-item">Nullam augue elit, pellentesque ut gravida ac, venenatis quis orci.</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col s4 center">
                <img src="../assets/img/itmLogo.png">
            </div>
            <div class="col s4 offset-s4 center">
                <img src="../assets/img/tecnmLogo.png">
            </div>
        </div>
    </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<style scoped>
img {
    height: 150px;
}
</style>