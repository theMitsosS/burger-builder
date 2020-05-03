import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-5b29f.firebaseio.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':
			'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  },
});

export default instance;
