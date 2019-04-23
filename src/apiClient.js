import axios from 'axios';

export default axios.create({
  baseURL: 'https://internal-api-staging-lb.interact.io/v2',
});
