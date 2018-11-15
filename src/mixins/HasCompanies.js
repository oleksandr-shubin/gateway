import companyApi from "../api/company";

export default {
    data() {
        return {
            companies: [],
        };
    },

    methods: {
        indexCompanies() {
            companyApi
                .index()
                .then(({data}) => this.companies = data.data);
        },
    },
}
