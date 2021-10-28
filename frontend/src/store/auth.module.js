import AuthService from '../services/auth.service';

const token = localStorage.getItem('jwt');
const initialState = token
  ? { status: { loggedIn: true }, token, user: { name: null} }
  : { status: { loggedIn: false }, token: null, user: { name: null } };

export const auth = {
  namespaced: true,
  state: initialState,

  actions: {
    setProfile({ commit }, user) {
      commit('profileSuccess', user);
    },
    login({ commit }) {
      commit('loginSuccess');
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        },
      );
    },
    updateProfile({ commit }, user) {
      return AuthService.updateProfile(user).then(
        response => {
          commit('updateSuccess', user);
          return Promise.resolve(response.data);
        },
        error => {
          console.log(error);
        },
      );
    },
  },
  mutations: {
    profileSuccess(state, user) {
      state.user = user;
    },
    loginSuccess(state) {
      state.status.loggedIn = true;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    updateSuccess(state, user) {
      console.log('perfil actualizado');
      state.user = user;
    },
  },
};
