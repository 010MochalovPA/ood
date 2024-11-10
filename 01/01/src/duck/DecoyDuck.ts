import { Duck } from "./Duck";
import { NoDanceBehavior } from "../behavor/NoDanceBehavor";

class DecoyDuck extends Duck {
    constructor() {
        super(new NoDanceBehavior());
    }
    
    display(): void {
        console.log("Я искусственная утка!");
    }
}

export { DecoyDuck }