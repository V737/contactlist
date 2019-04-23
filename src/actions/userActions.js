import ApiClient from '../apiClient';

const login = (username, password) => ApiClient.post('/login',{username, password}).then(({data}) => data)

export default {
  login
};