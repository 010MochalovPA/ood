import { IDanceBehavior } from "./IDanceBehavior";

class WaltzDanceBehavior implements IDanceBehavior {
    public dance(): void {
        console.log("Танцую вальс!");
    }
}

export { WaltzDanceBehavior }