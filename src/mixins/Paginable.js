export default {
    data() {
        return {
            paginator: {},
        };
    },

    methods: {
        isEmpty() {
            return !this.isNotEmpty();
        },

        isNotEmpty() {
            return this.paginator.hasOwnProperty('data') && this.paginator.data.length;
        },

        findPageAfterDeletion() {
            if (this.paginator.data.length === 1 && this.paginator.meta.current_page > 1) {
                return this.paginator.meta.current_page - 1;
            } else {
                return this.paginator.meta.current_page;
            }
        },
    },
}
