import { IDanceBehavior } from "../behavior/dance/IDanceBehavior";
import { IFlyBehavior } from "../behavior/fly/IFlyBehavior";
import { IQuackBehavior } from "../behavior/quack/IQuackBehavior";

type DuckPropsType = {
    danceBehavior: IDanceBehavior,
    quackBehavior: IQuackBehavior,
    flyBehavior: IFlyBehavior,
}

abstract class Duck {
    protected _danceBehavior: IDanceBehavior;
    protected _quackBehavior: IQuackBehavior;
    protected _flyBehavior: IFlyBehavior;

    constructor({ danceBehavior, quackBehavior, flyBehavior }: DuckPropsType) {
        this._danceBehavior = danceBehavior;
        this._quackBehavior = quackBehavior;
        this._flyBehavior = flyBehavior;
    }

    abstract display(): void;

    public performDance(): void {
        this._danceBehavior();
    }

    public performQuack(): void {
        this._quackBehavior();
    }

    public performFly(): void {
        this._flyBehavior.fly();
        this._handlePostFlyAction();
    }

    get danceBehavior(): IDanceBehavior {
        return this._danceBehavior;
    }

    set danceBehavior(danceBehavior: IDanceBehavior) {
        this._danceBehavior = danceBehavior;
    }

    get flyBehavior(): IFlyBehavior {
        return this._flyBehavior;
    }

    set flyBehavior(flyBehavior: IFlyBehavior) {
        this._flyBehavior = flyBehavior;
    }

    get quackBehavior(): IQuackBehavior {
        return this._quackBehavior;
    }

    set quackBehavior(quackBehavior: IQuackBehavior) {
        this._quackBehavior = quackBehavior;
    }

    private _handlePostFlyAction(): void {
        if (this._flyBehavior.flightCount > 0 && this._flyBehavior.flightCount % 2 === 0) {
            this._quackBehavior();
        }
    }
}

export { Duck };