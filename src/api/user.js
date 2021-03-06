import axios from 'axios'

export default {
    index(page = 1) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/customers';
        return axios.get(url, {params: {page: page}});
    },

    destroy(user) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + `/api/customers/${user.id}`;
        return axios.delete(url);
    },

    store(userData) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/customers';
        return axios.post(url, userData);
    },

    update(user) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + `/api/customers/${user.id}`;
        return axios.put(url, user);
    },

    show(id) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + `/api/customers/${id}`;
        return axios.get(url);
    },
}
