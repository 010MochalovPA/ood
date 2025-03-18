import { IBeverageStrategy } from "./IBeverageStrategy";

class GreenTeaStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Green Tea";
    }

    getCost(): number {
        return 0;
    }
}

class BlackTeaStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Black Tea";
    }

    getCost(): number {
        return 0;
    }
}

class OolongTeaStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Oolong Tea";
    }

    getCost(): number {
        return 0;
    }
}

class HerbalTeaStrategy implements IBeverageStrategy {
    getDescription(): string {
        return "Herbal Tea";
    }

    getCost(): number {
        return 0;
    }
}

export {
    GreenTeaStrategy,
    BlackTeaStrategy,
    OolongTeaStrategy,
    HerbalTeaStrategy,
};