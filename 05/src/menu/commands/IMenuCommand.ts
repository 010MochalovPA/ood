import {ICommand} from "../../command/ICommand";

interface IMenuCommand extends ICommand<string> {
    getName(): string;
    getDescription(): string;
    getUsage(): string;
}

export {
    IMenuCommand,
}