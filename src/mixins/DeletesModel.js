export default {
    methods: {
        confirmDelete(callback) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(res => {
                if (res.hasOwnProperty('value') && res.value === true) {
                    callback();
                }
            })
        },
    },
}
