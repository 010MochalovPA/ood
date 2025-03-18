import { GreenTeaStrategy } from "../strategies/TeaTypeStrategy";
import { Tea } from "./Tea";

class GreenTea extends Tea {
    constructor() {
        super(new GreenTeaStrategy());
    }
}

export {
    GreenTea,
};