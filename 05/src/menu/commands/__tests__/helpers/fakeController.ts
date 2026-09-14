import { DocumentController } from '../../../../document/DocumentController';

interface FakeController {
    insertParagraph: jest.Mock;
    insertImage: jest.Mock;
    setTitle: jest.Mock;
    deleteItem: jest.Mock;
    resizeImage: jest.Mock;
    replaceText: jest.Mock;
    getTitle: jest.Mock;
    getItems: jest.Mock;
    getItemsCount: jest.Mock;
    undo: jest.Mock;
    redo: jest.Mock;
    save: jest.Mock;
}

function createFakeController(itemsCount: number = 0): FakeController {
    return {
        insertParagraph: jest.fn(),
        insertImage: jest.fn(),
        setTitle: jest.fn(),
        deleteItem: jest.fn(),
        resizeImage: jest.fn(),
        replaceText: jest.fn(),
        getTitle: jest.fn().mockReturnValue('Test title'),
        getItems: jest.fn().mockReturnValue([]),
        getItemsCount: jest.fn().mockReturnValue(itemsCount),
        undo: jest.fn(),
        redo: jest.fn(),
        save: jest.fn(),
    };
}

function asController(fake: FakeController): DocumentController {
    return fake as unknown as DocumentController;
}

export {
    asController,
    createFakeController,
    FakeController,
}