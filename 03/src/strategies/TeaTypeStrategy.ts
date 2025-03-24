import { BeverageStrategy } from "./BeverageStrategy";

class GreenTeaStrategy extends BeverageStrategy {
    constructor() {
        super(0);
    }

    getDescription(): string {
        return "Green Tea";
    }
}

class BlackTeaStrategy extends BeverageStrategy {
    constructor() {
        super(0);
    }

    getDescription(): string {
        return "Black Tea";
    }
}

class OolongTeaStrategy extends BeverageStrategy {
    constructor() {
        super(0);
    }

    getDescription(): string {
        return "Oolong Tea";
    }
}

class HerbalTeaStrategy extends BeverageStrategy {
    constructor() {
        super(0);
    }

    getDescription(): string {
        return "Herbal Tea";
    }
}

export {
    GreenTeaStrategy,
    BlackTeaStrategy,
    OolongTeaStrategy,
    HerbalTeaStrategy,
};