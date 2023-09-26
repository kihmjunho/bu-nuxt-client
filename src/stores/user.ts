import { defineStore } from 'pinia';

interface State {
  userId: string;
  username: string;
}
const state = () => ({
  userId: '',
  username: '',
});

const getters = {
  isLogin(state: State) {
    return state.userId !== '';
  },
  isOwner(state: State) {
    return state.username === 'kimjunho';
  },
};

const actions = {
  setUser(this: State, data: any) {
    this.userId = data.userId;
    // this.username = data.loginUser.username;

    useCookie('buToken').value = data.accessToken;
    useCookie('buUserId').value = data.userId;
    // useCookie('buUsername').value = data.loginUser.username;
  },
  getCookies(this: State) {
    this.userId = useCookie('buUserId').value || '';
    // this.username = useCookie('buUsername').value || '';
  },
  logoutUser(this: State) {
    this.userId = '';
    this.username = '';

    useCookie('buToken').value = null;
    useCookie('buUserId').value = null;
  },
};

export const useUserStore = defineStore('userStore', {
  state,
  getters,
  actions,
});
