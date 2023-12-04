import { defineStore } from 'pinia';

interface State {
  userId: string;
  nickname: string;
  role: string;
}
const state = () => ({
  userId: '',
  nickname: '',
  role: '',
});

const getters = {
  isLogin(state: State) {
    return state.userId !== '';
  },
  isOwner(state: State) {
    return state.role === 'OWNER';
  },
};

const actions = {
  setUser(this: State, data: any) {
    this.userId = data.userId;
    this.nickname = data.nickname;
    this.role = data.role;

    useCookie('buUserId').value = data.userId;
    useCookie('buNickname').value = data.nickname;
    useCookie('buRole').value = data.role;
  },
  getCookies(this: State) {
    this.userId = useCookie('buUserId').value || '';
    this.nickname = useCookie('buNickname').value || '';
    this.role = useCookie('buRole').value || '';
  },
  logoutUser(this: State) {
    this.userId = '';
    this.nickname = '';
    this.role = '';

    useCookie('buToken').value = null;
    useCookie('buUserId').value = null;
    useCookie('buNickname').value = null;
    useCookie('buRole').value = null;
  },
};

export const useUserStore = defineStore('userStore', {
  state,
  getters,
  actions,
});
