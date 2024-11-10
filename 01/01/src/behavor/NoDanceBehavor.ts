import { IDanceBehavior } from "./IDanceBehavor";

class NoDanceBehavior implements IDanceBehavior {
    public dance(): void {
        console.log("Не умею танцевать!");
    }
}

export { NoDanceBehavior }