<template>
    <HeaderComponent></HeaderComponent>
    <!-- Crear un contenedor alineado al centro -->
    <div class="valign-wrapper loginContainer">
        <div class="container center-align black z-depth-4">

            <!-- Generar un renglon centrado -->
            <div class="row center">
                <!-- Espacio en blanco de dos columnas para margen -->
                <div class="col s2"></div>


                <!-- Formulario en el centro -->
                <div class="col s8">
                    <form action="javascript:void(0);">
                        <!-- Margen superior del formulario -->
                        <div class="row"><br></div>
                        
                        <div class="row">
                            <h4 class="white-text">Iniciar sesión</h4>
                            <br>
                            <div class="input-field col s12 white-text">
                                <i class="material-icons prefix">account_circle</i>
                                <input class="white-text" v-model="username" id="username" name="username" type="text" data-length="30" required autocomplete="off">
                                <label for="username">Username</label>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="input-field col s12 white-text">
                                <i class="material-icons prefix">lock</i>
                                <input class="white-text" v-model="password" id="password" name="password" type="password" data-length="16" required autocomplete="off">
                                <label for="password">Password</label>
                            </div>
                        </div>
    
                        <div class="row">
                            <div class="input-field col s12">
                                <button class="btn waves-effect waves-light white black-text" @click="valInput">
                                    Iniciar Sesión
                                    <i class="material-icons right black-text">send</i>
                                </button>
                            </div>
                        </div>
    
                        <!-- Margen inferior del formulario -->
                        <div class="row"><br></div>
                    </form>
                    <button @click="clearNewUser()" class="white-text btn-flat modal-trigger" data-target="registerModal"><u>Registrarse</u></button>
                    <div id="registerModal" class="modal">
                        <div class="modal-content">
                            <h4>Registrar usuario</h4>
                            <div class="container">
                                <div class="row left-align">
                                    <div class="input-field col s6">
                                        <i class="material-icons prefix">account_circle</i>
                                        <input id="newUsername" type="text" v-model="newUser.username">
                                        <label for="newUsername">Username</label>
                                        <span class="helper-text red-text">{{ helperTexts.username }}</span>
                                    </div>
                                    <div class="input-field col s6">
                                        <i class="material-icons prefix">lock</i>
                                        <input id="newPassword" type="password" v-model="newUser.password">
                                        <label for="newPassword">Password</label>
                                        <span class="helper-text red-text">{{ helperTexts.password }}</span>
                                    </div>
                                </div>
                                
                                <div class="row left-align">
                                    <div class="input-field col s6">
                                        <i class="material-icons prefix">email</i>
                                        <input id="newEmail" type="text" v-model="newUser.email">
                                        <label for="newEmail">Correo Electronico</label>
                                        <span class="helper-text red-text">{{ helperTexts.email }}</span>
                                    </div>
                                    <div class="input-field col s6">
                                        <i class="material-icons prefix">phone</i>
                                        <input id="newNumber" type="text" v-model="newUser.contactNumber">
                                        <label for="newNumber">Número de contacto:</label>
                                        <span class="helper-text red-text">{{ helperTexts.contactNumber }}</span>
                                    </div>
                                </div>

                                <div class="row">
                                    <p>Al crear un usuario tienes acceso al catálogo de libros ofrecidos por <b>BooksCenter</b>. Puedes pedir prestado cualquier libro sin límites, siempre y cuando sea entregado en un plazo de máximo de una semana.</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a @click="clearNewUser()" class="modal-close waves-effect btn-flat">Cancelar</a>
                            <a @click="checkNewUser()" class="waves-effect btn-flat">Confirmar</a>
                        </div>
                    </div>
                </div>

                <div class="col s2"></div>

            </div>
        </div>
    </div>
</template>

<script setup>
    /* global M */
    import HeaderComponent from '@/components/HeaderComponent.vue';
import axios from 'axios';
    import { ref, onBeforeMount, onMounted } from 'vue'
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const newUser = ref({username: 's', password: '', email: '', contactNumber: ''});
    const validRegex = {
        username: /^[a-zA-Z0-9]{1,30}$/,
        password: /^.{1,100}$/,
        email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
        number: /^[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}$/
    };
    const helperTexts = ref({username: null, password: null, email: null, contactNumber: null});
    const username = ref('');
    const password = ref('');
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
    onMounted(() => {
        initModal();
    });
    function initModal(){
        var modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
    }
    async function valInput() {
        if (username.value.length != 0 && password.value.length != 0){
            try {
                let result = await axios.post(`${process.env.VUE_APP_API_URL}/users/login/${username.value}`, {
                    password: password.value
                });
                // En caso de éxito, en result tenemos el token, el usuario y el usertype
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('username', result.data.username);
                localStorage.setItem('usertype', result.data.usertype);
                M.toast({html: 'Sesión Iniciada', classes: 'green'});
                router.push('/');
            } catch (error) {
                if (error.code == 'ERR_NETWORK'){
                    M.toast({html: `${error.message}: No se puede conectar a la API`, classes: 'red'});
                }
                if (error.response){
                    M.toast({html: error.response.data.message, classes: 'red'});
                    username.value = '';
                    password.value ='';
                }
            }
        }
    }
    function clearNewUser(){
        newUser.value.username = '';
        newUser.value.password = '';
        newUser.value.email = '';
        newUser.value.contactNumber = '';
    }
    function checkNewUser(){
        helperTexts.value.username = null;
        helperTexts.value.password = null;
        helperTexts.value.contactNumber = null;
        helperTexts.value.email = null;
        let valid = true;

        if (!validRegex.username.test(newUser.value.username)){
            helperTexts.value.username = 'Debe tener entre 1 y 30 caracteres.';
            valid = false;
        }
        if (!validRegex.password.test(newUser.value.password)){
            helperTexts.value.password = 'Debe tener entre 1 y 100 caracteres.';
            valid = false;
        }
        if (!validRegex.email.test(newUser.value.email)){
            helperTexts.value.email = 'Debe seguir el formato estándar de correos: example@domain.123';
            valid = false;
        }
        if (!validRegex.number.test(newUser.value.contactNumber)){
            helperTexts.value.contactNumber = 'Debe seguir uno de los formatos estándar: 123-123-1234 & 1234567890'
            valid = false;
        }
        if (valid){
            let data = {password: newUser.value.password, contactNumber: newUser.value.contactNumber, email: newUser.value.email};
            axios.post(`${process.env.VUE_APP_API_URL}/users/registerClient/${newUser.value.username}`, data)
            .then(() => {
                M.toast({html: 'Usuario registrado! Favor de iniciar sesión', classes: 'green'});
                let modal = M.Modal.getInstance(document.querySelector('#registerModal'));
                modal.close();
            })
            .catch(error => {
                if (error.code == 'ERR_NETWORK'){
                    M.toast({html: `${error.message}: No se puede conectar a la API`, classes: 'red'});
                }
                if (error.response){
                    M.toast({html: error.response.data.message, classes: 'red'});
                }
            });
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
        margin-top: 2vh;
        margin-bottom: 1vh;
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