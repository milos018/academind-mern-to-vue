import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isLoggedIn: false,
      userId: null
    };
  },
  mutations: {
    login(state, userId) {
      state.isLoggedIn = true;
      state.userId = userId;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
    }
  },
  actions: {
    login({ commit }, userId) {
      commit("login", userId);
    },
    logout({ commit }) {
      commit("logout");
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    userId(state) {
      return state.userId;
    }
  }
});
