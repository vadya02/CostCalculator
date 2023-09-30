import React from "react";
import { observable, action } from "mobx";

class CalculatorStore {
    constructor () {
        this.Marka = 'Марка',
        this.Model = 'Модель',
        this.Region = 'Регион',
        this.Modification = 'Модификация',
        this.Probeg = 0,
        this.Cost_Of_Fuel = 0,
        this.Expenditure_Of_Fuel = 0
    }
    updateMarka = action((value) => {
        this.Marka = value
    });
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