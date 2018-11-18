import axios from 'axios'

export default {
    index() {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/company-list';
        return axios.get(url);
    },
}
