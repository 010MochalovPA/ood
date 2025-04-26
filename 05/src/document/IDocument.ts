import { DocumentItem, DocumentItemList } from "../types"

interface IDocument {
    insertParagraph(text: string, position?: number): void;
    insertImage(path: string, width: number, height: number, position?: number): void;

    getItemsCount(): number;
    getItems(): DocumentItemList;
    getItem(index: number): DocumentItem;

    deleteItem(index: number): void;
    getTitle(): string;
    setTitle(title: string): void;
    
    canUndo(): boolean;
    canRedo(): boolean;

    undo(): void;
    redo(): void;

    canInsert(index: number): boolean;

    save(path: string): void;
}

export {
    IDocument,
};