import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://speech-app-exam-420814446b2c.herokuapp.com',
});

export default instance;