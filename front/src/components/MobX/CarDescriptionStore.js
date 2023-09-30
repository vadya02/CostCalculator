import { observable, action } from 'mobx';
class CarDescriptioinStore {
// class CarDescriptioinStore {
//   @observable carDescription = '';
//   @observable variable2 = 'Initial Value 2';
//   // Добавьте сколько угодно других переменных

//   @action updateCarDescription = (newValue) => {
//     this.carDescription = newValue;
//   }

//   @action updateVariable2 = (newValue) => {
//     this.variable2 = newValue;
//   }
//   // Добавьте сколько угодно других методов для обновления переменных
// }

// const carDescriptioinStore = new CarDescriptioinStore();

// export default new carDescriptioinStore;
constructor() {
  this.CarDescription = 'Initial Value';
  this.SalonImage = 'Initial Value';
  this.Marka = 'марка';
  this.Model = 'модель';
}

CarDescription = 'Initial Value';
SalonImage = 'Initial Value';

updateCarDescription = action((newValue) => {
  this.CarDescription = newValue;
});
updateSalonImage = action((newValue) => {
  this.SalonImage = newValue;
});
updateMarka = action((newValue) => {
  this.Marka = newValue;
});
updateModel = action((newValue) => {
  this.Model = newValue;
});
}

const myStore = new CarDescriptioinStore();

export default new CarDescriptioinStore();




