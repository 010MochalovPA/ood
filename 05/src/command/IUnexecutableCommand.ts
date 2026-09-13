import { ICommand } from "./ICommand";

interface IUnexecutableCommand extends ICommand {
    unexecute(): void;
    tryMerge(command: IUnexecutableCommand): boolean;
    discard(): void;
}

export {
    IUnexecutableCommand,
}