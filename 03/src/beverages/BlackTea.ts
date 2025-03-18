import { BlackTeaStrategy } from "../strategies/TeaTypeStrategy";
import { Tea } from "./Tea";

class BlackTea extends Tea {
    constructor() {
        super(new BlackTeaStrategy());
    }
}

export {
    BlackTea,
};