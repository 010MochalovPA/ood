import { FlyBehavior } from "./FlyBehavior";

class FlyNoWayBehavior extends FlyBehavior {
    public fly(): void {
        console.log(`Не умею летать!`);
    }
}

export { FlyNoWayBehavior };
