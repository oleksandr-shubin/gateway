import Vue from 'vue';
import Router from 'vue-router';
import Users from './views/User/Index.vue';
import UsersCreate from './views/User/Create.vue';
import UsersEdit from './views/User/Edit.vue';
import Companies from './views/Company/Index.vue';
import CompaniesCreate from './views/Company/Create.vue';
import CompaniesEdit from './views/Company/Edit.vue';

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
            path: '/users/create',
            name: 'users-create',
            component: UsersCreate,
        },

        {
            path: '/users/edit/:id',
            name: 'users-edit',
            component: UsersEdit,
        },

        {
            path: '/companies',
            name: 'companies',
            component: Companies,
        },

        {
            path: '/companies/create',
            name: 'companies-create',
            component: CompaniesCreate,
        },

        {
            path: '/companies/edit/:id',
            name: 'companies-edit',
            component: CompaniesEdit,
        },
    ]
})
