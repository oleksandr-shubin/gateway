import Vue from 'vue';
import App from './App.vue';
import router from './router';
import EmptyRow from './components/EmptyRow';
import VueSweetAlert2 from 'vue-sweetalert2';

Vue.config.productionTip = false;

Vue.component('empty-row', EmptyRow);

Vue.use(VueSweetAlert2);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
