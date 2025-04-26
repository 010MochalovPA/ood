import { DocumentItem, DocumentItemList } from "../types";
import { IDocument } from "./IDocument";
import { Paragraph } from "./items/Paragraph";

const defaultTitle = 'New title';

class Document implements IDocument {
    private _items: DocumentItemList = [];
    private _title: string;

    constructor(title: string = defaultTitle) {
        this._title = title;
    }

    insertParagraph(text: string, position?: number): void {
        const paragraph = new Paragraph(text);

        const index = position ?? this._items.length;

        if (this._validatePosition(index)){
            this._items.splice(index, 0, paragraph);
        };
    }

    insertImage(path: string, width: number, height: number, position?: number): void {

    }

    canInsert(index: number): boolean {
        return index <= this._items.length;
    }

    getItemsCount(): number {
        return this._items.length
    }

    getItems(): DocumentItemList {
        return this._items;
    }

    getItem(position: number): DocumentItem | null {
        if (this._validatePosition(position)){
            return this._items[position];
        };

        return null;
    }

    deleteItem(position?: number): void {
        if (this._items.length === 0) {
            console.log("Cannot delete item from an empty document!");
            return;
        }

        const pos = position ?? this._items.length - 1;
        if (this._validatePosition(pos)){
            this._items.splice(pos, 1);
        };
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): void {
        this._title = title;
    }

    canUndo(): boolean {
        return true;
    }

    canRedo(): boolean {
        return true;
    }

    undo(): void {

    }

    redo(): void {

    }

    save(path: string): void {

    }

    private _validatePosition(position?: number): boolean {
        if (position && (position < 0 || position >= this._items.length)) {
            console.log(`Index ${position} is out of range!`);
            return false;
        }

        return true;
    }
}

export {
    Document,
}