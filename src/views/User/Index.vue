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
                <tr v-if="isNotEmpty()" v-for="user in paginator.data" :key="user.id">
                    <td>{{ user.given_name }}</td>
                    <td>{{ user.family_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.company_name }}</td>
                    <td class="text-right">
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
                <empty-row v-if="isEmpty()" :colspan="5"></empty-row>
                </tbody>
            </table>
            <pagination :limit="2" :show-disabled="true" :data="paginator" @pagination-change-page="index"></pagination>
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
    import Paginable from "../../mixins/Paginable";

    export default {
        mixins: [DeletesModel, NotifiesSuccess, Paginable],

        created() {
            this.index();
        },

        methods: {
            index(page = 1) {
                userApi
                    .index(page)
                    .then(({data}) => this.paginator = data);
            },

            destroy(user) {
                userApi
                    .destroy(user)
                    .then(() => {
                        this.index(this.findPageAfterDeletion());
                        this.notifySuccess();
                    });
            },
        },
    }
</script>
