import { IDanceBehavior } from "../behavor/IDanceBehavor";

abstract class Duck {
    protected _danceBehavior: IDanceBehavior;

    constructor(danceBehavior: IDanceBehavior) {
        this._danceBehavior = danceBehavior;
    }

    abstract display(): void;

    get danceBehavior(): IDanceBehavior {
        return this._danceBehavior;
    }

    set danceBehavior(danceBehavior: IDanceBehavior) {
        this._danceBehavior = danceBehavior;
    }

    dance(): void {
        this._danceBehavior.dance();
    }
}

export { Duck }