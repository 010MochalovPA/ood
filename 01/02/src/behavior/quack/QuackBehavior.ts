import { IQuackBehavior } from "./IQuackBehavior";

class QuackBehavior implements IQuackBehavior {
    public quack(): void {
        console.log('Кря Кря!');
    }
}

export { QuackBehavior };
