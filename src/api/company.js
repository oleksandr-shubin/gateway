import axios from 'axios'

export default {
    index(page = 1) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/companies';
        return axios.get(url, {params: {page: page}});
    },

    destroy(company) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + `/api/companies/${company.id}`;
        return axios.delete(url);
    },

    store(companyData) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/companies';
        return axios.post(url, companyData);
    },

    update(company) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + `/api/companies/${company.id}`;
        return axios.put(url, company);
    },

    show(id) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + `/api/companies/${id}`;
        return axios.get(url);
    },
}
