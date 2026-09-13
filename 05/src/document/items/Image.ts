import { escapeHtml } from "../../menu/utils/escapeHtml";
import { RESOURCES_DIR } from "../../storage/constants";
import { FileStorage } from "../../storage/FileStorage";
import { DocumentItemType } from "../../types";
import { BaseDocumentItem } from "./BaseDocumentItem";

class Image extends BaseDocumentItem {
    protected readonly _type: DocumentItemType = 'image';

    private _path: string;
    private _width: number;
    private _height: number;

    constructor(path: string, width: number, height: number) {
        super();
        this._path = path;
        this._width = width;
        this._height = height;
    }

    get path(): string {
        return this._path;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    resize(width: number, height: number): void {
        this._width = width;
        this._height = height;
    }

    getResourcePath(): string | null {
        return this._path;
    }

    acquireResource(storage: FileStorage): void {
        storage.acquire(this._path);
    }

    releaseResource(storage: FileStorage): void {
        storage.release(this._path);
    }

    render(): string {
        return `<img src="${RESOURCES_DIR}/${escapeHtml(this._path)}" width="${this._width}" height="${this._height}">`;
    }

    toString(): string {
        return `[Image] ${this._width}x${this._height} ${this._path}`;
    }
}

export {
    Image,
};