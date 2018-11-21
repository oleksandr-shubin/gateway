<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Edit user</h2>

        <form id="user-edit-form" @submit.prevent="update()" method="POST">
            <div class="form-group row">
                <label for="given_name" class="col-sm-2 col-form-label text-md-left">Given name</label>

                <div class="col-md-4">
                    <input id="given_name" type="text" v-model="user.given_name"
                           class="form-control" :class="{ 'is-invalid': hasError('given_name') }" autofocus required>

                    <span v-if="hasError('given_name')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('given_name') }}</strong>
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="family_name" class="col-sm-2 col-form-label text-md-left">Family name</label>

                <div class="col-md-4">
                    <input id="family_name" type="text" v-model="user.family_name"
                           class="form-control" :class="{ 'is-invalid': hasError('family_name') }" required>

                    <span v-if="hasError('family_name')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('family_name') }}</strong>
                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label text-md-left">Email</label>

                <div class="col-md-4">
                    <input id="email" type="email" v-model="user.email"
                           class="form-control" :class="{ 'is-invalid': hasError('email') }" required>

                    <span v-if="hasError('email')" class="invalid-feedback" role="alert">
                        <strong>{{ firstError('email') }}</strong>
                    </span>
                </div>
            </div>

            <div class="btn-toolbar" role="toolbar" aria-label="toolbar">
                <button type="submit" class="btn btn-success mr-2">Update</button>
                <button @click.prevent="cancel()" type="button" class="btn btn-secondary">Cancel</button>
            </div>
        </form>
    </main>
</template>

<script>
    import Form from "../../mixins/Form";
    import NotifiesSuccess from "../../mixins/NotifiesSuccess";
    import userApi from "../../api/user";

    export default {
        mixins: [Form, NotifiesSuccess],

        data() {
            return {
                user: {
                    id: null,
                    name: '',
                    quota: '',
                },
            };
        },

        created() {
            this.show(this.$route.params.id);
        },

        methods: {
            update() {
                this.resetErrors();
                userApi
                    .update(this.user)
                    .then((response) => {
                        this.notifySuccess();
                    })
                    .catch((error) => {
                        this.errors = error.response.data.errors;
                    });
            },

            show() {
                userApi
                    .show(this.$route.params.id)
                    .then((response) => {
                        this.user = response.data.data;
                    });
            },

            cancel() {
                this.$router.push({name: 'users'});
            },
        },
    }
</script>
