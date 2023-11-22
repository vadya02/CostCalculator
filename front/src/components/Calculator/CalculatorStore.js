import { action } from "mobx";

class CalculatorStore {
    constructor () {
        this.Marka = '';
        this.Model = '';
        this.Region = '';
        this.Modification = '';
        this.Probeg = '';
        this.Cost_Of_Fuel = '';
        this.Expenditure_Of_Fuel = '';
        this.Summa = '';
    }
    updateMarka = action((value) => {
        this.Marka = value
    });
    updateSumma = action((value) => {
        this.Summa = value
    })
    updateModel = action((value) => {
        this.Model = value
    });
    updateRegion = action((value) => {
        this.Region = value
    });
    updateModification = action((value) => {
        this.Modification = value
    });
    updateProbeg = action((value) => {
        this.Probeg = value
    });
    updateCostOfFuel = action((value) => {
        this.Cost_Of_Fuel = value
    });

    updateExpenditureOfFuel = action((value) => {
        this.Expenditure_Of_Fuel = value
    });

}

export default new CalculatorStore()