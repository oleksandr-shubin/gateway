import axios from 'axios'

export default {
    update() {
        let url = process.env.VUE_APP_CORE_ENDPOINT + '/api/transfer-data';
        return axios.put(url);
    },
}
