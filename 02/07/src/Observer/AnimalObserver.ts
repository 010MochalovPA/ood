import { AnimalInfo } from "../Data/AnimalData";
import { AnimalEventType } from "./AnimalEventType";
import { IObserver } from "./IObserver";

class AnimalObserver implements IObserver<AnimalInfo, AnimalEventType> {
    constructor(private _title: string) {}

    public update(data: AnimalInfo, eventType: AnimalEventType): void {
        console.log(`Наблюдатель ${this._title} cообщает: `)
        console.log(`${data.animalName}`);
        switch (eventType) {
            case AnimalEventType.FOOD: 
                console.log('Покушал');
                break;
            case AnimalEventType.SLEEP: 
                console.log('Поспал');
                break;
            case AnimalEventType.PLAY: 
                console.log('Поиграл');
                break;
            case AnimalEventType.WALK: 
                console.log('Погулял');
                break;
        }
    }
}

export {
    AnimalObserver,
}