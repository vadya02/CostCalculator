import { makeAutoObservable } from 'mobx';

class AuthStore {
//   @observable
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }
}

export default new AuthStore();