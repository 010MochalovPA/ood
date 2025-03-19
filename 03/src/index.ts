import { Coffee } from "./beverages/Coffee";
import { Cinnamon } from "./condiments/Cinnamon";
import { Lemon } from "./condiments/Lemon";
import { IceCubes, IceCubeType } from "./condiments/IceCubes";
import { ChocolateCrumbs } from "./condiments/ChocolateCrumbs";
import { DoubleLatte } from "./beverages/DoubleLatte";
import { HerbalTea } from "./beverages/HerbalTea";

const coffee = new Coffee();
const tea = new HerbalTea();
const latte = new DoubleLatte();

const coffeeWithCinnamon = new Cinnamon(coffee);
const coffeeWithCinnamonAndLemon = new Lemon(coffeeWithCinnamon, 2);

const teaWithLemon = new Lemon(tea, 1);
const teaWithLemonAndIce = new IceCubes(teaWithLemon, 2, IceCubeType.Water);

const latteWithChokolateCrumbs = new ChocolateCrumbs(latte, 15);

console.log("Coffee:");
console.log(`${coffee.getDescription()} - ${coffee.getCost()} руб.`);
console.log(`${coffeeWithCinnamon.getDescription()} - ${coffeeWithCinnamon.getCost()} руб.`);
console.log(`${coffeeWithCinnamonAndLemon.getDescription()} - ${coffeeWithCinnamonAndLemon.getCost()} руб.`);

console.log("Tea:");
console.log(`${tea.getDescription()} - ${tea.getCost()} руб.`);
console.log(`${teaWithLemon.getDescription()} - ${teaWithLemon.getCost()} руб.`);
console.log(`${teaWithLemonAndIce.getDescription()} - ${teaWithLemonAndIce.getCost()} руб.`);

console.log("Latte:");
console.log(`${latte.getDescription()} - ${latte.getCost()} руб.`);
console.log(`${latteWithChokolateCrumbs.getDescription()} - ${latteWithChokolateCrumbs.getCost()} руб.`);