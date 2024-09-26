<template>
<div>
    <HeaderComponent></HeaderComponent>
    <!-- Crear un contenedor alineado al centro -->
    <div class="valign-wrapper loginContainer">
        <div class="container center-align brown">

            <!-- Generar un renglon centrado -->
            <div class="row center">
                <!-- Espacio en blanco de dos columnas para margen -->
                <div class="col s2"></div>


                <!-- Formulario en el centro -->
                <form class="col s8" action="javascript:void(0);">
                    <!-- Margen superior del formulario -->
                    <div class="row"><br></div>
                    
                    <div class="row">
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
    /* eslint-disable */
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { ref } from 'vue'
    const router = useRouter();

    const username = ref('');
    const password = ref('');
    async function valInput() {
        if (username.value.length != 0 && password.value.length != 0){
            try {
                router.push('/');
                // let result = await axios.post('http://localhost:5000/api/users/login', {
                //     username: username.value,
                //     password: password.value
                // });
                // console.log(result);
            } catch (error) {
                if (error.response){
                    console.log(error.response.data.message);
                    username.value = '';
                    password.value ='';
                }
            }
        }
    }

</script>

<style scoped>
    .loginContainer {
        padding-top: 5%;
        padding-bottom: 5%;
        padding-left: 10%;
        padding-right: 10%;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .loginContainer .container {
        width: 50%;
        height: 70%;
    }

    .input-field .helper-text {
        display: block !important;
    }

</style>