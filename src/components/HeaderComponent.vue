<template>
    <ul id="adminMenu" class="dropdown-content">
        <li><a href="#">Usuarios</a></li>
        <li><a href="#">Categorias</a></li>
        <li><a href="#">Autores</a></li>
        <li><a href="#">Libros</a></li>
        <li><a href="#">Prestamos</a></li>
    </ul>
    <div class="navbar-fixed">
        <nav class="custom-nav">
            <div class="nav-wrapper brown lighten-2">
                <a href="/" class="brand-logo center">
                    <img src="../assets/logo.png">
                </a>
                <a href="#!" data-target="mobile-demo" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="left hide-on-med-and-down">
                    <!-- Lista con los apartados de la página -->
                    <li class="hoverable"><a href="/">Inicio</a></li>
                    <li class="hoverable"><a href="/catalog">Catalogo</a></li>
                    <li class="hoverable"><a href="/about">Acerca de...</a></li>
                    <li v-if="usertype=='admin'" class="hoverable">
                        <a class="dropdown-trigger" data-target="adminMenu">
                            Administración<i class="material-icons right">arrow_drop_down</i>
                        </a>
                    </li>
                </ul>
                <ul class="right hide-on-med-and-down">
                    <li v-if="username" style="padding-right: 30px;">{{ username }}</li>
                    <li v-if="usertype">{{ usertype }}</li>
                    <li v-else class="hoverable"><a href="/login">Iniciar Sesión &nbsp;&nbsp;&nbsp;</a></li>
                    <li v-if="usertype && username" style="padding-right: 30px; padding-left: 30px;" class="red-text"><a href="/logout">Cerrar Sesión</a></li>
                </ul>
            </div>
        </nav>
    </div>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="/">Inicio</a></li>
        <li><a href="/catalog">Catalogo</a></li>
        <li><a href="/about">Acerca de...</a></li>
        <li v-if="username" style="padding-top: 30px;"><a>{{ username }}</a></li>
        <li v-if="usertype"><a>{{ usertype }}</a></li>
        <li v-else><a href="/login">Iniciar sesión</a></li>
        <li v-if="username && usertype" style="padding-top: 30px;"><a href="/logout">Cerrar Sesión</a></li>
    </ul>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    /* eslint-disable */
    const username = ref(null);
    const usertype = ref(null);

    onMounted(() =>{
        let storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedUsertype = localStorage.getItem('usertype');

        if (storedToken && storedUsername && storedUsertype){
            username.value = storedUsername;
            usertype.value = storedUsertype;
        }
    });

</script>

<style scoped>
    .custom-nav {
    height: 70px;
    line-height: 70px;
    }

    .custom-nav .brand-logo img {
    height: 70px;
    }

    .custom-nav .nav-wrapper {
    height: 70px;
    }
</style>