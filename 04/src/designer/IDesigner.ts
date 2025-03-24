import { PictureDraft } from "../picturedraft/PictureDraft";

interface IDesigner {
    createDraft(strm: string): PictureDraft;
}

export {
    IDesigner,
};