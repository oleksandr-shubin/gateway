<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Create company</h2>

        <form id="company-create-form" @submit.prevent="store()" method="POST">
            <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label text-md-left">Name</label>

                <div class="col-md-4">
                    <input id="name" type="text" v-model="companyData.name"
                           class="form-control" :class="{ 'is-invalid': hasError('name') }" autofocus required>

                    <span v-if="hasError('name')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('name') }}</strong>
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="quota" class="col-sm-2 col-form-label text-md-left">Quota, B</label>

                <div class="col-md-4">
                    <input id="quota" type="text" v-model="companyData.quota"
                           class="form-control" :class="{ 'is-invalid': hasError('quota') }" required>

                    <span v-if="hasError('quota')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('quota') }}</strong>
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
    import companyApi from '../../api/company';
    import Form from '../../mixins/Form';
    import NotifiesSuccess from "../../mixins/NotifiesSuccess";

    export default {
        mixins: [Form, NotifiesSuccess],

        data() {
            return {
                companyData: {
                    name: '',
                    quota: null,
                },
            };
        },

        methods: {
            store() {
                this.resetErrors();
                companyApi
                    .store(this.companyData)
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
                this.$router.push({name: 'companies'});
            },

            reset() {
                this.companyData = {
                    name: '',
                    quota: null,
                };
            }
        },
    }
</script>
