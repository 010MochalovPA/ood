import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

enum SyrupType {
    Chocolate = "Chocolate",
    Maple = "Maple",
}

class Syrup extends CondimentDecorator {
    constructor(beverage: IBeverage, private _syrupType: SyrupType) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return `${this._syrupType} syrup`;
    }

    protected _getCondimentCost(): number {
        return 15;
    }
}

export {
    Syrup,
    SyrupType,
};