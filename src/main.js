import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importer routeren


const app = createApp(App);

app.use(router); // Tilføj routeren til appen
app.mount('#app');

