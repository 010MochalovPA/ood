import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

enum LiqueurType {
    Nut = "Nut",
    Chocolate = "Chocolate",
}

class Liqueur extends CondimentDecorator {
    constructor(beverage: IBeverage, private _type: LiqueurType) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return `${this._type} Liqueur`;
    }

    protected _getCondimentCost(): number {
        return 50;
    }
}

export {
    LiqueurType,
    Liqueur,
}