<template>
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
                    <li class="hoverable"><a href="#">Catalogo</a></li>
                    <li class="hoverable"><a href="#">Acerca de...</a></li>
                </ul>
                <ul class="right hide-on-med-and-down">
                    <li class="hoverable"><a href="/login">Iniciar Sesión</a></li>
                </ul>
            </div>
        </nav>
    </div>

    <ul class="sidenav" id="mobile-demo">
        <li><a href="/">Inicio</a></li>
        <li><a href="#">Catalogo</a></li>
        <li><a href="#">Acerca de...</a></li>
        <li><a href="/login">Iniciar sesión</a></li>
    </ul>
</template>

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