<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Companies</h2>
        <div class="">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="companies.length" v-for="company in companies">
                    <td>{{ company.name }}</td>
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
                <empty-row v-if="!companies.length" :colspan="3"></empty-row>
                </tbody>
            </table>
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

    export default {
        mixins: [DeletesModel, NotifiesSuccess],

        data() {
            return {
                companies: [],
            };
        },

        created() {
            this.index();
        },

        methods: {
            index() {
                companyApi
                    .index()
                    .then(({data}) => this.companies = data.data);
            },

            destroy(company) {
                companyApi
                    .destroy(company)
                    .then(() => {
                        this.index();
                        this.notifySuccess();
                    });
            },
        },
    }
</script>
