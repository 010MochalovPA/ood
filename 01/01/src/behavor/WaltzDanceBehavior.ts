import { IDanceBehavior } from "./IDanceBehavor";

class WaltzDanceBehavior implements IDanceBehavior {
    public dance(): void {
        console.log("Танцую вальс!");
    }
}

export { WaltzDanceBehavior }