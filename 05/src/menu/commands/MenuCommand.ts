import { IMenuCommand } from "./IMenuCommand";

abstract class MenuCommand implements IMenuCommand {
    constructor(
        protected readonly _name: string,
        protected readonly _description: string,
        protected readonly _usage: string
    ) {}

    execute(args?: string): void {
        this.doExecute(args);
    }

    getName(): string {
        return this._name;
    }

    getDescription(): string {
        return this._description;
    }

    getUsage(): string {
        return this._usage;
    }

    abstract doExecute(args?: string): void;
}

export {
    MenuCommand
}