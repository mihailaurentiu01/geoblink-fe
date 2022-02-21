import Api from "../../services/Api";

export default {
  namespaced: true,
  state: {
    states: []
  },
  getters: {
    getStatesModel(state) {
      const states = [];

      for (const prop in state.states) {
        states.push({ value: prop, text: state.states[prop] });
      }

      return states;
    }
  },
  actions: {
    async getStates({ commit }) {
      try {
        const res = await Api.getUSStates();

        if (res.status === 200) {
          commit("setStates", res.data);

          return Promise.resolve(res);
        }
      } catch (error) {
        throw error;
      }
    },
    setStates({ commit }, value) {
      commit("setStates", value);
    }
  },
  mutations: {
    setStates(state, value) {
      state.states = value;
    }
  }
};
