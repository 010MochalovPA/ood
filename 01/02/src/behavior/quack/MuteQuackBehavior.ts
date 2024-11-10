import { IQuackBehavior } from "./IQuackBehavior";

class MuteQuackBehavior implements IQuackBehavior {
    public quack(): void {
        // Молчание
    }
}

export { MuteQuackBehavior };
