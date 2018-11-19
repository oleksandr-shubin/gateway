<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Abusers</h2>

        <form @submit.prevent="index" method="POST">
            <div class="form-group row">
                <label for="month" class="col-sm-2 col-form-label text-md-left">Month</label>

                <div class="col-md-4">
                    <select id="month" v-model="month" class="custom-select"
                            :class="{ 'is-invalid': hasError('month') }" required>

                        <option v-for="month in months" :value="month.value" :key="month.value">{{ month.name }}</option>
                    </select>

                    <span v-if="hasError('month')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('month') }}</strong>
                    </span>
                </div>
            </div>

            <div class="btn-toolbar" role="toolbar" aria-label="toolbar">
                <button type="submit" class="btn btn-success mr-2">Show report</button>
            </div>
        </form>

        <div class="mt-4">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quota</th>
                    <th>Used</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="companies.length" v-for="company in companies" :key="company.id">
                    <td>{{ company.name }}</td>
                    <td>{{ company.quota }}</td>
                    <td>{{ company.total_amount }}</td>
                </tr>
                <empty-row v-if="!companies.length" :colspan="3"></empty-row>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
    import months from '../../enums/Months';
    import Form from '../../mixins/Form';
    import reportApi from '../../api/report';

    export default {
        mixins: [Form],

        data() {
            return {
                months: {},
                month: null,
                companies: [],
            };
        },

        created() {
            this.months = months;
        },

        methods: {
            index() {
                this.clearCompanies();

                reportApi
                    .index(this.month)
                    .then(({data}) => this.companies = data)
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    });
            },

            clearCompanies() {
                this.companies = [];
            }
        },
    }
</script>
