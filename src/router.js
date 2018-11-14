import Vue from 'vue';
import Router from 'vue-router';
import Users from './views/User/Index.vue';
import Companies from './views/Company/Index.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/users',
            name: 'users',
            component: Users,
        },

        {
            path: '/companies',
            name: 'about',
            component: Companies,
        },
    ]
})
