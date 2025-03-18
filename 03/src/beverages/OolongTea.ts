import { OolongTeaStrategy } from "../strategies/TeaTypeStrategy";
import { Tea } from "./Tea";

class OolongTea extends Tea {
    constructor() {
        super(new OolongTeaStrategy());
    }
}

export {
    OolongTea ,
};