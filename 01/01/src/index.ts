import { DecoyDuck } from "./duck/DecoyDuck";
import { MallardDuck } from "./duck/MallardDuck";
import { RedHeadDuck } from "./duck/RedHeadDuck";

const mallard = new MallardDuck();
mallard.display();
mallard.dance();

const redhead = new RedHeadDuck();
redhead.display();
redhead.dance();

const decoy = new DecoyDuck();
decoy.display();
decoy.dance();