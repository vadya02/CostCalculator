import { makeAutoObservable, action } from "mobx"


class CostOfCarStore {
    constructor () {
        this.marka = '';
        this.model = '';
        this.modification = '';
        this.probeg = '';
        this.year = ''
        this.main_image = ''
        makeAutoObservable(this)
    }
    updateMarka = action((value) => {
        this.marka = value
    });

    updateModel = action((value) => {
        this.model = value
    });

    updateMainImage = action((value) => {
        this.main_image = value
    });

    updateModification = action((value) => {
        this.modification = value
    });
    updateProbeg = action((value) => {
        this.probeg = value
    });
    updateYear = action((value) => {
        this.year = value
    });

}

export default new CostOfCarStore()
