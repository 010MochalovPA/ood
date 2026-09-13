import { Paragraph } from "./document/items/Paragraph";
import { Image } from "./document/items/Image";

type DocumentItemType = 'image' | 'paragraph'

type DocumentItem = Paragraph | Image;

type DocumentItemList = DocumentItem[];

export {
    DocumentItemType,
    DocumentItem,
    DocumentItemList,
}