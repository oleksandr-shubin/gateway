import axios from 'axios'

export default {
    index(month) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/report';
        return axios.get(url, {params: {month: month}});
    },
}
