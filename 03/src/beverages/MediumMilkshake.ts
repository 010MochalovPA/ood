import { MediumMilkshakeStrategy } from "../strategies/MilkshakeSizeStrategy";
import { Milkshake } from "./Milkshake";

class MediumMilkshake extends Milkshake {
    constructor() {
        super(new MediumMilkshakeStrategy());
    }
}

export {
    MediumMilkshake,
};