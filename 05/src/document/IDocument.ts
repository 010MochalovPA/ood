import { DocumentItem, DocumentItemList } from "../types"
import { Paragraph } from "./items/Paragraph";
import { Image } from "./items/Image";

interface IDocument {
    insertParagraph(paragraph: Paragraph, position: number): void;
    insertImage(image: Image, position: number): void
    getItemsCount(): number;
    getItems(): DocumentItemList;
    getItem(position: number): DocumentItem;
    deleteItem(position: number): void;
    insertItem(position: number, item: DocumentItem): void;
    getTitle(): string;
    setTitle(title: string): void;
}

export {
    IDocument,
};