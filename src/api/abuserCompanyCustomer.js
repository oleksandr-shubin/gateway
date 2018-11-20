import axios from 'axios'

export default {
    index(companyId, month) {
        let url = process.env.VUE_APP_CORE_ENDPOINT + `/api/abusers/companies/${companyId}/customers`;
        return axios.get(url, {params: {month: month}});
    },
}
