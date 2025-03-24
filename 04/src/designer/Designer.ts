import { IDesigner } from "./IDesigner";
import { PictureDraft } from "../picturedraft/PictureDraft";
import { IShapeFactory } from "../shapefactory/IShapeFactory";

class Designer implements IDesigner {
    #shapeFactory: IShapeFactory;

    constructor(shapeFactory: IShapeFactory) {
        this.#shapeFactory = shapeFactory;
    }

    createDraft(stream: string): PictureDraft {
        const draft = new PictureDraft();
        stream
            .split('\n')
            .filter(description => description.trim() !== '')
            .forEach(description => {
                try {
                    draft.addShape(this.#shapeFactory.createShape(description));
                } catch (e) {
                    throw new Error(`Error creating shape from: "${description}"`);
                }
            });
        
        return draft;
    }
}

export {
    Designer,
};