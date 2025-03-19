import { Beverage } from "../Beverage";

class Coffee extends Beverage {
    constructor(description: string = "Coffee") {
        super(description);
    }

    public getCost(): number {
        return 60;
    }
}

export {
    Coffee,
};