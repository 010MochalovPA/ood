import { Duck } from "./Duck";
import { MinuetDanceBehavior } from "../behavor/MinuetDanceBehavior";

class RedHeadDuck extends Duck {
    constructor() {
        super(new MinuetDanceBehavior());
    }

    display(): void {
        console.log("Я красноголовая утка!");
    }
}

export { RedHeadDuck }