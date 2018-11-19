import Vue from 'vue';
import App from './App.vue';
import router from './router';
import EmptyRow from './components/EmptyRow';
import VueSweetAlert2 from 'vue-sweetalert2';

//styles
import './assets/scss/app.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.component('empty-row', EmptyRow);
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.use(VueSweetAlert2);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
