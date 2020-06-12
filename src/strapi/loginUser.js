import Axios from 'axios';
import url from './URL';
import setupUser from './setupUser';

async function loginUser({ email, password }) {
  const response = await Axios.post(`${url}/auth/local`, {
    identifier: email,
    password,
  }).catch((error) => console.log(error));
  if (response) {
    setupUser(response);
  }
  return response;
}

export default loginUser;
