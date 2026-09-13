type InsertParagraphArgs = {
    text: string;
    position: number;
}

type DeleteItemArgs = {
    position: number;
}

type SetTitleArgs = {
    title: string;
}
type ReplaceTextArgs = {
    position: number,
    text: string,
};

type InsertImageArgs = {
    position: number,
    width: number,
    height: number,
    path: string,
};

type ResizeImageArgs = {
    position: number,
    width: number,
    height: number,
};

export {
    InsertParagraphArgs,
    DeleteItemArgs,
    SetTitleArgs,
    ReplaceTextArgs,
    InsertImageArgs,
    ResizeImageArgs,
}