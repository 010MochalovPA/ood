import { IBeverage } from "./IBeverage";

abstract class Beverage implements IBeverage {
    constructor(private _description: string) {}

    public getDescription(): string {
        return this._description;
    }

    public abstract getCost(): number;
}

export {
    Beverage,
};