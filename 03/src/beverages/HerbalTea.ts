import { HerbalTeaStrategy } from "../strategies/TeaTypeStrategy";
import { Tea } from "./Tea";

class HerbalTea extends Tea {
    constructor() {
        super(new HerbalTeaStrategy());
    }
}

export {
    HerbalTea,
};