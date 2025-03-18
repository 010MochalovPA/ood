import { IBeverage } from "./IBeverage";

abstract class CondimentDecorator implements IBeverage {
    constructor(protected _beverage: IBeverage) {}

    public getDescription(): string {
        return `${this._beverage.getDescription()}, ${this._getCondimentDescription()}`;
    }

    public getCost(): number {
        return this._beverage.getCost() + this._getCondimentCost();
    }

    protected abstract _getCondimentDescription(): string;
    protected abstract _getCondimentCost(): number;
}

export {
    CondimentDecorator,
};