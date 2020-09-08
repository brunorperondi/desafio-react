import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Axios = axios.create({
    baseUrl: 'http://localhost:5000',
});

export default Axios;