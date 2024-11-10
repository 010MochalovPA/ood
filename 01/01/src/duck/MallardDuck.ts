import { Duck } from "./Duck";
import { WaltzDanceBehavior } from "../behavor/WaltzDanceBehavior";

class MallardDuck extends Duck {
    constructor() {
        super(new WaltzDanceBehavior());
    }

    display(): void {
        console.log("Я кряква!");
    }
}

export { MallardDuck }