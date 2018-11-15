<template>
    <tr>
        <td v-bind:colspan="colspan">No data available</td>
    </tr>
</template>

<script>
    export default {
        props: {
            colspan: Number,
        },
    }
</script>

<style scoped>

</style>
