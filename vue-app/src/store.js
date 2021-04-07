import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isLoggedIn: false,
      userId: null,
      token: null
    };
  },
  mutations: {
    login(state, userData) {
      state.isLoggedIn = true;
      state.userId = userData.userId;
      state.token = userData.token;

      let tokenExpiration;
      if (userData.tokenExpiration) {
        tokenExpiration = userData.tokenExpiration;
      } else {
        tokenExpiration = new Date(new Date().getTime() + 1000 * 60 * 60);
      }

      state.tokenExpiration = tokenExpiration;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userData.userId,
          token: userData.token,
          tokenExpiration: tokenExpiration
        })
      );

      const timeToAutoLogout =
        new Date(state.tokenExpiration).getTime() - new Date().getTime();
      setTimeout(() => {
        this.dispatch("logout");
      }, timeToAutoLogout);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userData");
    }
  },
  actions: {
    login({ commit }, userData) {
      commit("login", userData);
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
    },
    token(state) {
      return state.token;
    }
  }
});
