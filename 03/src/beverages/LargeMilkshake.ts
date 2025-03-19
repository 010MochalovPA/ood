import { LargeMilkshakeStrategy } from "../strategies/MilkshakeSizeStrategy";
import { Milkshake } from "./Milkshake";

class LargeMilkshake extends Milkshake {
    constructor() {
        super(new LargeMilkshakeStrategy());
    }
}

export {
    LargeMilkshake,
};