import { makeAutoObservable } from 'mobx';

class AuthStore {
//   @observable
  isAuthenticated = false;
  // Probeg = 0;
  // Rashod = 0;
  // Cost_of_fuel = 0;
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