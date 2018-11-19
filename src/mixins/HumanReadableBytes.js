import {KB_SIZE} from "../data/common";

export default {
    methods: {
        humaniseBytes(bytes) {
            if (bytes === 0) {
                return `${bytes} B`
            } else {
                let i =  Math.floor(Math.log(bytes) / Math.log(KB_SIZE));
                let value = (bytes / Math.pow(KB_SIZE, i)).toFixed(1) * 1;
                return value + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
            }
        }
    }
}
