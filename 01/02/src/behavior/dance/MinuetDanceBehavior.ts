import { IDanceBehavior } from "./IDanceBehavior";

class MinuetDanceBehavior implements IDanceBehavior {    
    dance(): void {
        console.log("Танцую менуэт!");
    }
}

export { MinuetDanceBehavior }