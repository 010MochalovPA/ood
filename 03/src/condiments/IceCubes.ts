import { CondimentDecorator } from "../CondimentDecorator";
import { IBeverage } from "../IBeverage";

enum IceCubeType {
    Dry = "Dry",
    Water = "Water",
}

class IceCubes extends CondimentDecorator {
    constructor(
        beverage: IBeverage,
        private _quantity: number,
        private _type: IceCubeType = IceCubeType.Water
    ) {
        super(beverage);
    }

    protected _getCondimentDescription(): string {
        return `${this._type} ice cubes x ${this._quantity}`;
    }

    protected _getCondimentCost(): number {
        return (this._type === IceCubeType.Dry ? 10 : 5) * this._quantity;
    }
}

export {
    IceCubes,
    IceCubeType,
};