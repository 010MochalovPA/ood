import { FileStorage } from "../../../../storage/FileStorage";

interface FakeStorage {
    acquire: jest.Mock;
    release: jest.Mock;
    copy: jest.Mock;
    copyResourcesTo: jest.Mock;
    clear: jest.Mock;
}

function createFakeStorage(): FakeStorage {
    return {
        acquire: jest.fn(),
        release: jest.fn(),
        copy: jest.fn(),
        copyResourcesTo: jest.fn(),
        clear: jest.fn(),
    };
}

function asStorage(fake: FakeStorage): FileStorage {
    return fake as unknown as FileStorage;
}

export {
    asStorage,
    createFakeStorage,
    FakeStorage,
}