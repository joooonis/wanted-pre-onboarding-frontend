import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.pre-onboarding-selection-task.shop',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthorHeader = (token: string) => {
  if (token)
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const unsetAuthorHeader = () => {
  delete instance.defaults.headers.common['Authorization'];
};

const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token) : null;
};

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) setAuthorHeader(token as string);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { setAuthorHeader, unsetAuthorHeader };

export default instance;
