import axios from 'axios'

export default {
    index(month) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/abusers/companies';
        return axios.get(url, {params: {month: month}});
    },
}
