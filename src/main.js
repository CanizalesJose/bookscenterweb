import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/css/materialize.min.css';
import './assets/js/materialize.min.js';

const app = createApp(App);
app.use(router);
app.mount('#app');