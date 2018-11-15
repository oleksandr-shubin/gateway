export default {
    data() {
        return {
            errors: {},
        }
    },

    methods: {
        hasError(key) {
            if (this.errors === null) {
                return false
            }

            if (this.errors[key]) {
                return true
            }
        },

        firstError(key) {
            if (this.errors === null) {
                return null
            }

            if (this.errors[key]) {
                return this.errors[key][0]
            }
        },

        resetErrors() {
            this.errors = null;
        },
    },
}
