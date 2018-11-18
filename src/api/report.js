import axios from 'axios'

export default {
    index(page = 1) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/companies';
        return axios.get(url, {params: {page: page}});
    },
}
