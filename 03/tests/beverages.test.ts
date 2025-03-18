import { Coffee } from "../src/beverages/Coffee";
import { Latte } from "../src/beverages/Latte";
import { Cappuccino } from "../src/beverages/Cappuccino";
import { Tea } from "../src/beverages/Tea";
import { Milkshake } from "../src/beverages/Milkshake";
import { Cinnamon } from "../src/condiments/Cinnamon";
import { Lemon } from "../src/condiments/Lemon";
import { IceCubes, IceCubeType } from "../src/condiments/IceCubes";
import { Syrup, SyrupType } from "../src/condiments/Syrup";
import { ChocolateCrumbs } from "../src/condiments/ChocolateCrumbs";
import { Cream } from "../src/condiments/Cream";
import { Chocolate } from "../src/condiments/Chocolate";
import { Liqueur, LiqueurType } from "../src/condiments/Liqueur";
import { CoconutFlakes } from "../src/condiments/CoconutFlakes";
import { DoubleLatte } from "../src/beverages/DoubleLatte";
import { DoubleCappuccino } from "../src/beverages/DoubleCappuccino";
import { BlackTea } from "../src/beverages/BlackTea";
import { GreenTea } from "../src/beverages/GreenTea";
import { OolongTea } from "../src/beverages/OolongTea";
import { HerbalTea } from "../src/beverages/HerbalTea";
import { SmallMilkshake } from "../src/beverages/SmallMilkshake";
import { MediumMilkshake } from "../src/beverages/MediumMilkshake";
import { LargeMilkshake } from "../src/beverages/LargeMilkshake";

describe("Beverages", () => {
    test("Coffee", () => {
        const coffee = new Coffee();
        expect(coffee.getDescription()).toBe("Coffee");
        expect(coffee.getCost()).toBe(60);
    });

    test("Latte", () => {
        const latte = new Latte();
        expect(latte.getDescription()).toBe("Latte (Standard)");
        expect(latte.getCost()).toBe(90);
    });

    test("Double Latte", () => {
        const doubleLatte = new DoubleLatte();
        expect(doubleLatte.getDescription()).toBe("Latte (Double)");
        expect(doubleLatte.getCost()).toBe(130);
    });

    test("Cappuccino", () => {
        const cappuccino = new Cappuccino();
        expect(cappuccino.getDescription()).toBe("Cappuccino (Standard)");
        expect(cappuccino.getCost()).toBe(80);
    });

    test("Double Cappuccino", () => {
        const doubleCappuccino = new DoubleCappuccino();
        expect(doubleCappuccino.getDescription()).toBe("Cappuccino (Double)");
        expect(doubleCappuccino.getCost()).toBe(120);
    });

    test("Tea", () => {
        const tea = new Tea();
        expect(tea.getDescription()).toBe("Tea (Black Tea)");
        expect(tea.getCost()).toBe(30);
    });

    test("Black Tea", () => {
        const blackTea = new BlackTea();
        expect(blackTea.getDescription()).toBe("Tea (Black Tea)");
        expect(blackTea.getCost()).toBe(30);
    });

    test("Green Tea", () => {
        const greenTea = new GreenTea();
        expect(greenTea.getDescription()).toBe("Tea (Green Tea)");
        expect(greenTea.getCost()).toBe(30);
    });

    test("Oolong Tea", () => {
        const oolongTea = new OolongTea();
        expect(oolongTea.getDescription()).toBe("Tea (Oolong Tea)");
        expect(oolongTea.getCost()).toBe(30);
    });

    test("Herbal Tea", () => {
        const herbalTea = new HerbalTea();
        expect(herbalTea.getDescription()).toBe("Tea (Herbal Tea)");
        expect(herbalTea.getCost()).toBe(30);
    });

    test("Milkshake", () => {
        const milkshake = new Milkshake();
        expect(milkshake.getDescription()).toBe("Milkshake (Small)");
        expect(milkshake.getCost()).toBe(50);
    });

    test("Small Milkshake", () => {
        const smallMilkshake = new SmallMilkshake();
        expect(smallMilkshake.getDescription()).toBe("Milkshake (Small)");
        expect(smallMilkshake.getCost()).toBe(50);
    });

    test("Medium Milkshake", () => {
        const mediumMilkshake = new MediumMilkshake();
        expect(mediumMilkshake.getDescription()).toBe("Milkshake (Medium)");
        expect(mediumMilkshake.getCost()).toBe(60);
    });

    test("Large Milkshake", () => {
        const largeMilkshake = new LargeMilkshake();
        expect(largeMilkshake.getDescription()).toBe("Milkshake (Large)");
        expect(largeMilkshake.getCost()).toBe(80);
    });
});

describe("Condiments", () => {
    test("Cinnamon", () => {
        const coffee = new Coffee();
        const coffeeWithCinnamon = new Cinnamon(coffee);
        expect(coffeeWithCinnamon.getDescription()).toBe("Coffee, Cinnamon");
        expect(coffeeWithCinnamon.getCost()).toBe(80);
    });

    test("Lemon", () => {
        const tea = new Tea();
        const teaWithLemon = new Lemon(tea, 2);
        expect(teaWithLemon.getDescription()).toBe("Tea (Black Tea), Lemon x 2");
        expect(teaWithLemon.getCost()).toBe(50);
    });

    test("Ice Cubes (Dry)", () => {
        const coffee = new Coffee();
        const coffeeWithIce = new IceCubes(coffee, 3, IceCubeType.Dry);
        expect(coffeeWithIce.getDescription()).toBe("Coffee, Dry ice cubes x 3");
        expect(coffeeWithIce.getCost()).toBe(90);
    });

    test("Ice Cubes (Water)", () => {
        const coffee = new Coffee();
        const coffeeWithIce = new IceCubes(coffee, 2, IceCubeType.Water);
        expect(coffeeWithIce.getDescription()).toBe("Coffee, Water ice cubes x 2");
        expect(coffeeWithIce.getCost()).toBe(70);
    });

    test("Syrup (Chocolate)", () => {
        const latte = new Latte();
        const latteWithSyrup = new Syrup(latte, SyrupType.Chocolate);
        expect(latteWithSyrup.getDescription()).toBe("Latte (Standard), Chocolate syrup");
        expect(latteWithSyrup.getCost()).toBe(105);
    });

    test("Syrup (Maple)", () => {
        const latte = new Latte();
        const latteWithSyrup = new Syrup(latte, SyrupType.Maple);
        expect(latteWithSyrup.getDescription()).toBe("Latte (Standard), Maple syrup");
        expect(latteWithSyrup.getCost()).toBe(105);
    });

    test("Chocolate Crumbs", () => {
        const milkshake = new Milkshake();
        const milkshakeWithCrumbs = new ChocolateCrumbs(milkshake, 10);
        expect(milkshakeWithCrumbs.getDescription()).toBe("Milkshake (Small), Chocolate crumbs 10g");
        expect(milkshakeWithCrumbs.getCost()).toBe(70);
    });

    test("Coconut Flakes", () => {
        const milkshake = new Milkshake();
        const milkshakeWithFlakes = new CoconutFlakes(milkshake, 5);
        expect(milkshakeWithFlakes.getDescription()).toBe("Milkshake (Small), Coconut flakes 5g");
        expect(milkshakeWithFlakes.getCost()).toBe(55);
    });

    test("Multiple Condiments", () => {
        const coffee = new Coffee();
        const coffeeWithCinnamon = new Cinnamon(coffee);
        const coffeeWithCinnamonAndLemon = new Lemon(coffeeWithCinnamon, 2);
        const coffeeWithCinnamonLemonAndChocolate = new ChocolateCrumbs(coffeeWithCinnamonAndLemon, 10);

        expect(coffeeWithCinnamonLemonAndChocolate.getDescription()).toBe(
            "Coffee, Cinnamon, Lemon x 2, Chocolate crumbs 10g"
        );
        expect(coffeeWithCinnamonLemonAndChocolate.getCost()).toBe(120);
    });
});

describe("New Condiments", () => {
    test("Cream", () => {
        const coffee = new Coffee();
        const coffeeWithCream = new Cream(coffee);

        expect(coffeeWithCream.getDescription()).toBe("Coffee, Cream");
        expect(coffeeWithCream.getCost()).toBe(85);
    });

    test("Chocolate (3 slices)", () => {
        const coffee = new Coffee();
        const coffeeWithChocolate = new Chocolate(coffee, 3);

        expect(coffeeWithChocolate.getDescription()).toBe("Coffee, Chocolate x 3");
        expect(coffeeWithChocolate.getCost()).toBe(90);
    });

    test("Chocolate (invalid slices)", () => {
        const coffee = new Coffee();

        expect(() => new Chocolate(coffee, 0)).toThrow("The number of chocolate slices must be between 1 and 5.");
        expect(() => new Chocolate(coffee, 6)).toThrow("The number of chocolate slices must be between 1 and 5.");
    });

    test("Liqueur (Nut)", () => {
        const coffee = new Coffee();
        const coffeeWithLiqueur = new Liqueur(coffee, LiqueurType.Nut);

        expect(coffeeWithLiqueur.getDescription()).toBe("Coffee, Nut Liqueur");
        expect(coffeeWithLiqueur.getCost()).toBe(110);
    });

    test("Liqueur (Chocolate)", () => {
        const coffee = new Coffee();
        const coffeeWithLiqueur = new Liqueur(coffee, LiqueurType.Chocolate);

        expect(coffeeWithLiqueur.getDescription()).toBe("Coffee, Chocolate Liqueur");
        expect(coffeeWithLiqueur.getCost()).toBe(110);
    });

    test("Multiple Condiments with New Additions", () => {
        const coffee = new Coffee();
        const coffeeWithCream = new Cream(coffee);
        const coffeeWithCreamAndChocolate = new Chocolate(coffeeWithCream, 2);
        const coffeeWithCreamChocolateAndLiqueur = new Liqueur(coffeeWithCreamAndChocolate, LiqueurType.Nut);

        expect(coffeeWithCreamChocolateAndLiqueur.getDescription()).toBe(
            "Coffee, Cream, Chocolate x 2, Nut Liqueur"
        );
        expect(coffeeWithCreamChocolateAndLiqueur.getCost()).toBe(155);
    });
});
