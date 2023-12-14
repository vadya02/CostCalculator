import { action } from 'mobx';
class CarDescriptioinStore {
constructor() {
  this.CarDescription = 'Initial Value';
  this.SalonImage = 'Initial Value';
  this.Marka = 'марка';
  this.Model = 'модель';
  this.Nalog = '';
  this.Toplivo = '';
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

updateNalog = action((newValue) => {
  this.Nalog = newValue;
});

updateToplivo = action((newValue) => {
  this.Toplivo = newValue;
});

}


export default new CarDescriptioinStore();




