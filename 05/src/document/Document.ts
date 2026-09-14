import { DocumentItem, DocumentItemList } from "../types";
import { IDocument } from "./IDocument";
import { Paragraph } from "./items/Paragraph";
import { Image } from "./items/Image";

class Document implements IDocument {
    private _items: DocumentItemList = [];
    private _title: string;

    constructor(title: string = 'New title') {
        this._title = title;
    }

    insertParagraph(paragraph: Paragraph, position: number): void {
        this.insertItem(position, paragraph);
    }

    insertImage(image: Image, position: number): void {
        this.insertItem(position, image);
    }

    getItemsCount(): number {
        return this._items.length
    }

    getItems(): DocumentItemList {
        return [...this._items];
    }

    getItem(index: number): DocumentItem {
        this._validateIndex(index);
        return this._items[index];
    }

    deleteItem(position: number): void {
        this._validateIndex(position);

        this._items.splice(position, 1);
    }

    insertItem(position: number, item: DocumentItem): void {
        this._validatePosition(position)

        this._items.splice(position, 0, item);
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): void {
        this._title = title;
    }

    private _validatePosition(position: number): void {
        if (position < 0 || position > this._items.length) {
            throw new Error(`Position ${position} is out of range. Must be between 0 and ${this._items.length}`);
        }
    }

    private _validateIndex(index: number): void {
        if (index < 0 || index >= this._items.length) {
            throw new Error(`Index ${index} is out of range. Must be between 0 and ${this._items.length - 1}`);
        }
    }
}

export {
    Document,
}