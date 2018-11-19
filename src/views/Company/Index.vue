<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Companies</h2>
        <div class="">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quota</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="isNotEmpty()" v-for="company in paginator.data" :key="company.id">
                    <td>{{ company.name }}</td>
                    <td>{{ company.quota }}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-cog"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <router-link :to="{name: 'companies-edit', params: { id: company.id }}" class="dropdown-item">
                                    <i class="far fa-edit"> Edit</i>
                                </router-link>
                                <a @click.prevent="confirmDelete(() => destroy(company))" href="#" class="dropdown-item text-danger">
                                    <i class="far fa-trash-alt"> Delete</i>
                                </a>
                            </div>
                        </div>
                    </td>
                </tr>
                <empty-row v-if="isEmpty()" :colspan="3"></empty-row>
                </tbody>
            </table>
            <pagination :limit="2" :show-disabled="true" :data="paginator" @pagination-change-page="index"></pagination>
        </div>
        <router-link :to="{name: 'companies-create'}" tag="button" class="btn btn-success">
            Add
        </router-link>
    </main>
</template>

<script>
    import companyApi from '../../api/company';
    import DeletesModel from '../../mixins/DeletesModel';
    import NotifiesSuccess from "../../mixins/NotifiesSuccess";
    import Paginable from "../../mixins/Paginable";

    export default {
        mixins: [DeletesModel, NotifiesSuccess, Paginable],

        created() {
            this.index();
        },

        methods: {
            index(page = 1) {
                companyApi
                    .index(page)
                    .then(({data}) => this.paginator = data);
            },

            destroy(company) {
                companyApi
                    .destroy(company)
                    .then(() => {
                        this.index(this.findPageAfterDeletion());
                        this.notifySuccess();
                    });
            },
        },
    }
</script>
