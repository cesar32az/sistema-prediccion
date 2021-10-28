export const gastos = {
  namespaced: true,
  state: {
    gastos: [],
  },

  actions: {
    getAllGastos({ commit }, gastos) {
      commit('getAll', gastos);
    },
    addGasto({ commit }, gasto) {
      commit('add', gasto);
    },
  },
  mutations: {
    add(state, gasto) {
      state.gastos.push(gasto);
    },
    getAll(state, gastos) {
      state.gastos = gastos;
    },
  },
};
