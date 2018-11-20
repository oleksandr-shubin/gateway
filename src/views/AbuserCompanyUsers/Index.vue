<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Abuser customers</h2>
        <div><b>Company:</b> {{ companyName }}</div>
        <div><b>Month:</b> {{ month.name }}</div>
        <div class="mt-4">
            <table class="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Given Name</th>
                    <th>Family Name</th>
                    <th class="text-center">Used</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="users.length" v-for="user in users" :key="user.id">
                    <td>{{ user.given_name }}</td>
                    <td>{{ user.family_name }}</td>
                    <td class="text-right">{{ humaniseBytes(user.total_amount) }}</td>
                </tr>
                <empty-row v-if="!users.length" :colspan="3"></empty-row>
                </tbody>
            </table>
            <button @click.prevent="cancel()" type="button" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Back
            </button>
        </div>
    </main>
</template>

<script>
    import abuserCompanyCustomerApi from '../../api/abuserCompanyCustomer';
    import HumanReadableBytes from '../../mixins/HumanReadableBytes';
    import Months from '../../data/Months';

    export default {
        mixins: [HumanReadableBytes],

        data() {
            return {
                users: [],
                companyName: {},
                month: {},
            };
        },

        created() {
            this.index();
        },

        methods: {
            index() {
                abuserCompanyCustomerApi
                    .index(this.$route.params.id, this.$route.params.month)
                    .then(({data}) => {
                        this.users = data.data;
                        this.companyName = data.company;
                        this.month = Months.find(month => month.value === parseInt(data.month));
                    });
            },

            cancel() {
                this.$router.go(-1);
            },
        },
    }
</script>
