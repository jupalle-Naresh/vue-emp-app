import { createApp } from 'vue';
import App from './App.vue';

import router from './router';



const app = createApp(App);

// aware of vue app as we are using router.
app.use(router);

app.mount('#app');
