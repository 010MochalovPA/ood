import { ICommand } from "./ICommand";

interface IUnexecutableCommand extends ICommand {
    unexecute(): void;
    compoundWith(command: ICommand): boolean
}

export {
    IUnexecutableCommand,
}