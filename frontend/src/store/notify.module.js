export const notify = {
  namespaced: true,
  state: { snackbar: { message: null, color: null, snack: false } },

  actions: {
    errorNotify({ commit }, message) {
      commit('error', message);
    },
    successNotify({ commit }, message) {
      commit('success', message);
    },
  },
  mutations: {
    error(state, message) {
      state.snackbar.message = message;
      state.snackbar.color = 'error';
      state.snackbar.snack = true;
    },
    success(state, message) {
      state.snackbar.message = message;
      state.snackbar.color = 'success';
      state.snackbar.snack = true;
    },
  },
};
