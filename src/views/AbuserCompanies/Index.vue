<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Abuser Companies</h2>

        <form id="index-abuser-companies-form" @submit.prevent="index" method="POST">
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
                    <th class="text-center">Quota</th>
                    <th class="text-center">Used</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="companies.length" v-for="company in companies" :key="company.id">
                    <td>{{ company.name }}</td>
                    <td class="text-right">{{ humaniseBytes(company.quota) }}</td>
                    <td class="text-right">
                        <router-link :to="{name: 'abuser-company-users', params: { id: company.id, month: currentMonth }}">
                            {{ humaniseBytes(company.total_amount) }}
                        </router-link>
                    </td>
                </tr>
                <empty-row v-if="!companies.length" :colspan="3"></empty-row>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
    import months from '../../data/Months';
    import Form from '../../mixins/Form';
    import abuserCompanyApi from '../../api/abuserCompany';
    import HumanReadableBytes from "../../mixins/HumanReadableBytes";

    export default {
        mixins: [Form, HumanReadableBytes],

        data() {
            return {
                months: {},
                month: null,
                currentMonth: null,
                companies: [],
            };
        },

        created() {
            this.months = months;
        },

        methods: {
            index() {
                this.clearCompanies();

                abuserCompanyApi
                    .index(this.month)
                    .then(({data}) => {
                        this.currentMonth = this.month;
                        this.companies = data;
                    })
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
