import { AnimalEventType } from "../Observer/AnimalEventType";
import { Observable } from "../Observer/Observable";

interface AnimalInfo {
    animalName: string;
}

class AnimalData extends Observable<AnimalInfo, AnimalEventType> {
    private animalName: string;

    constructor(animalName: string) {
        super();
        this.animalName = animalName;
    }

    public triggerEvent(eventType: AnimalEventType) {
        this.notifyObservers(eventType);
    }

    protected _getChangedData(): AnimalInfo {
        return {
            animalName: this.animalName,
        };
    }
}

export {
    AnimalData,
    AnimalInfo,
}