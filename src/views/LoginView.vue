<template>
<div>
    <HeaderComponent></HeaderComponent>
    <!-- Crear un contenedor alineado al centro -->
    <div class="valign-wrapper loginContainer">
        <div class="container center-align brown z-depth-4">

            <!-- Generar un renglon centrado -->
            <div class="row center">
                <!-- Espacio en blanco de dos columnas para margen -->
                <div class="col s2"></div>


                <!-- Formulario en el centro -->
                <form class="col s8" action="javascript:void(0);">
                    <!-- Margen superior del formulario -->
                    <div class="row"><br></div>
                    
                    <div class="row">
                        <h4 class="white-text">Iniciar sesión</h4>
                        <br>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">account_circle</i>
                            <input v-model="username" id="username" name="username" type="text" class="validate" data-length="30" required>
                            <label for="username">Username</label>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock</i>
                            <input v-model="password" placeholder="Password" id="password" name="password" type="password" class="validate" data-length="16" required>
                            <label for="password">Password</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <button class="btn waves-effect waves-light" @click="valInput">
                                Iniciar Sesión
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                    </div>

                    <!-- Margen inferior del formulario -->
                    <div class="row"><br></div>
                </form>


                <div class="col s2"></div>

            </div>
        </div>
    </div>
</div>
</template>

<script setup>
    /* global M */
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import axios from 'axios';
    import { ref, onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router';
    const router = useRouter();

    onBeforeMount (() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedUsertype = localStorage.getItem('usertype');
        if (storedToken || storedUsername || storedUsertype){
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('usertype');
            M.toast({html: 'Sesión cerrada', classes: 'red'});
        }
    });
    const username = ref('');
    const password = ref('');
    async function valInput() {
        if (username.value.length != 0 && password.value.length != 0){
            try {
                let result = await axios.post('http://localhost:5000/api/users/login', {
                    username: username.value,
                    password: password.value
                });
                // En caso de éxito, en result tenemos el token, el usuario y el usertype
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('username', result.data.username);
                localStorage.setItem('usertype', result.data.usertype);
                router.push('/');
            } catch (error) {
                if (error.response){
                    M.toast({html: error.response.data.message, classes: 'red'});
                    username.value = '';
                    password.value ='';
                }
            }
        }
    }

</script>

<style scoped>
    .loginContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 70px);
        width: 100%;
        padding: 0;
    }
    .loginContainer .container {
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border-radius: 10px;
    }

    .input-field .helper-text {
        display: block !important;
    }

</style>