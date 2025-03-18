import { Beverage } from "../Beverage";
import { IBeverageStrategy } from "../strategies/IBeverageStrategy";
import { BlackTeaStrategy } from "../strategies/TeaTypeStrategy";

class Tea extends Beverage {
    constructor(private _teaTypeStrategy: IBeverageStrategy = new BlackTeaStrategy()) {
        super(`Tea (${_teaTypeStrategy.getDescription()})`);
    }

    public getCost(): number {
        return 30;
    }
}

export {
    Tea,
};