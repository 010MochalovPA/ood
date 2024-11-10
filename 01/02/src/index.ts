import { DecoyDuck } from "./duck/DecoyDuck";
import { MallardDuck } from "./duck/MallardDuck";
import { RedHeadDuck } from "./duck/RedHeadDuck";

const mallard = new MallardDuck();
mallard.display();
mallard.performDance();
mallard.performFly();
mallard.performFly();
mallard.performFly();

const redhead = new RedHeadDuck();
redhead.display();
redhead.performDance();

const decoy = new DecoyDuck();
decoy.display();
decoy.performDance();
decoy.performFly();
decoy.performFly();
decoy.performFly();