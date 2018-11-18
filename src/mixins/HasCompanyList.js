import companyListApi from "../api/companyList";

export default {
    data() {
        return {
            companyList: [],
        };
    },

    methods: {
        indexCompanyList() {
            companyListApi
                .index()
                .then(({data}) => this.companyList = data.data);
        },
    },
}
