<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h2>Transfers</h2>
        <button @click.prevent="generate" class="btn btn-success" :disabled="loading">
            <template v-if="loading">
                <i v-if="loading" class="fas fa-sync fa-spin"></i>
                Generating data
            </template>
            <template v-else>
                Generate data
            </template>
        </button>
    </main>
</template>

<script>
    import transferDataApi from '../../api/transferData';

    export default {
        data() {
            return {
                loading: false,
            };
        },

        methods: {
            generate() {
                this.loading = true;

                transferDataApi
                    .update()
                    .then(() => this.loading = false);
            },
        },
    }
</script>
