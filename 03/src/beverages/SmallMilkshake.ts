import { SmallMilkshakeStrategy } from "../strategies/MilkshakeSizeStrategy";
import { Milkshake } from "./Milkshake";

class SmallMilkshake extends Milkshake {
    constructor() {
        super(new SmallMilkshakeStrategy());
    }
}

export {
    SmallMilkshake,
};