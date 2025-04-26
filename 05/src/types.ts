import { Paragraph } from "./document/items/Paragraph";
import { Image } from "./document/items/Image";
import { ICommand } from "./command/ICommand";

enum DocumentItemType {
    IMAGE = 1,
    PARAGRAPH = 2,
}

type DocumentItem = Paragraph | Image;

type DocumentItemList = DocumentItem[];

type MenuItem = {
    description: string,
    createCommand: (args: string) => ICommand,
}

export {
    MenuItem,
    DocumentItemType,
    DocumentItem,
    DocumentItemList,
}