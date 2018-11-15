<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Users</h2>
        <div class="">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Given name</th>
                    <th>Family name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="users.length" v-for="user in users">
                    <td>{{ user.given_name }}</td>
                    <td>{{ user.family_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.company_name }}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-cog"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <router-link :to="{name: 'users-edit', params: { id: user.id }}" class="dropdown-item">
                                    <i class="far fa-edit"> Edit</i>
                                </router-link>
                                <a @click.prevent="confirmDelete(() => destroy(user))" href="#" class="dropdown-item text-danger">
                                    <i class="far fa-trash-alt"> Delete</i>
                                </a>
                            </div>
                        </div>
                    </td>
                </tr>
                <empty-row v-if="!users.length" :colspan="5"></empty-row>
                </tbody>
            </table>
        </div>
        <router-link :to="{name: 'users-create'}" tag="button" class="btn btn-success">
            Add
        </router-link>
    </main>
</template>

<script>
    import userApi from '../../api/user';
    import DeletesModel from "../../mixins/DeletesModel";
    import NotifiesSuccess from "../../mixins/NotifiesSuccess";

    export default {

        mixins: [DeletesModel, NotifiesSuccess],

        data() {
            return {
                users: [],
            };
        },

        created() {
            this.index();
        },

        methods: {
            index() {
                userApi
                    .index()
                    .then(({data}) => this.users = data.data);
            },

            destroy(user) {
                userApi
                    .destroy(user)
                    .then(() => {
                        this.index();
                        this.notifySuccess();
                    });
            },
        },
    }
</script>
