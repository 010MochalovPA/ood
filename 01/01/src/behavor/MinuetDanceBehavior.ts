import { IDanceBehavior } from "./IDanceBehavor";

class MinuetDanceBehavior implements IDanceBehavior {    
    public dance(): void {
        console.log("Танцую менуэт!");
    }
}

export { MinuetDanceBehavior }