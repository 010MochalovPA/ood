import { IDanceBehavior } from "./IDanceBehavior";

class NoDanceBehavior implements IDanceBehavior {
    dance(): void {
        console.log("Не умею танцевать!");
    }
}

export { NoDanceBehavior };