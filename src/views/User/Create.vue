<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Create user</h2>

        <form id="user-create-form" @submit.prevent="store()" method="POST">
            <div class="form-group row">
                <label for="given_name" class="col-sm-2 col-form-label text-md-left">Given name</label>

                <div class="col-md-4">
                    <input id="given_name" type="text" v-model="userData.given_name"
                           class="form-control" :class="{ 'is-invalid': hasError('given_name') }" autofocus required>

                    <span v-if="hasError('given_name')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('given_name') }}</strong>
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="family_name" class="col-sm-2 col-form-label text-md-left">Family name</label>

                <div class="col-md-4">
                    <input id="family_name" type="text" v-model="userData.family_name"
                           class="form-control" :class="{ 'is-invalid': hasError('family_name') }" required>

                    <span v-if="hasError('family_name')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('family_name') }}</strong>
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label text-md-left">Email</label>

                <div class="col-md-4">
                    <input id="email" type="email" v-model="userData.email"
                           class="form-control" :class="{ 'is-invalid': hasError('email') }" required>

                    <span v-if="hasError('email')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('email') }}</strong>
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="company_id" class="col-sm-2 col-form-label text-md-left">
                    <template v-if="companyList.length">
                        Company
                    </template>
                    <template v-else>
                        <span class="text-danger">Company list is empty. Please create company first!</span>
                    </template>
                </label>

                <div class="col-md-4">
                    <select id="company_id" v-model="userData.company_id" class="custom-select"
                            :class="{ 'is-invalid': hasError('company_id') }" required>

                        <option v-for="company in companyList" :value="company.id">{{ company.name }}</option>
                    </select>

                    <span v-if="hasError('company_id')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('company_id') }}</strong>
                    </span>
                </div>
            </div>

            <div class="btn-toolbar" role="toolbar" aria-label="toolbar">
                <button type="submit" class="btn btn-success mr-2">Save</button>
                <button @click.prevent="cancel()" type="button" class="btn btn-secondary">Cancel</button>
            </div>
        </form>
    </main>
</template>

<script>
    import userApi from '../../api/user';
    import Form from "../../mixins/Form";
    import NotifiesSuccess from "../../mixins/NotifiesSuccess";
    import HasCompanyList from "../../mixins/HasCompanyList";

    export default {

        mixins: [Form, NotifiesSuccess, HasCompanyList],

        data() {
            return {
                userData: {
                    id: '',
                    name: '',
                    quota: '',
                    company_id: null,
                },
            };
        },

        created() {
            this.indexCompanyList();
        },

        methods: {
            store() {
                this.resetErrors();
                userApi
                    .store(this.userData)
                    .then((response) => {
                        this.reset();
                        this.notifySuccess();
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    });
            },

            cancel() {
                this.reset();
                this.$router.push({name: 'users'});
            },

            reset() {
                this.userData = {
                    id: '',
                    name: '',
                    quota: '',
                    company_id: null,
                };
            }
        },
    }
</script>
