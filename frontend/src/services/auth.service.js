import axios from 'axios';
import { authHeader } from './auth-header.service';
const API_URL = 'http://localhost:4000/api/auth/';

class AuthService {
  //inicio de sesion de usuario
  async login(user) {
    const response = await axios.post(API_URL + 'signin', user);
    let token = response.data.token;
    if (token) {
      localStorage.setItem('jwt', token);
    }
    return response.data;
  }
  logout() {
    localStorage.removeItem('jwt');
  }

  //registro de usuario
  async register(user) {
    try {
      const response = await axios.post(API_URL + 'signup', user);
      let token = response.data.token;
      if (token) {
        localStorage.setItem('jwt', token);
      }
      response.data.message = 'Registro exitoso';
      return response.data;
    } catch (error) {
      console.log(error);
      error.message = 'error al registrar';
      return error;
    }
  }
  async getUser() {
    let response = await axios.get(API_URL + 'profile', {
      headers: authHeader(),
    });
    let user = response.data.user;
    return user;
  }
  async updateProfile(user) {
    let responde = await axios.put(API_URL + 'profile', user, {
      headers: authHeader(),
    });
    return responde;
  }
}

export default new AuthService();
