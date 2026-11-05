import { IMenuCommand } from "../types";

abstract class MenuCommand implements IMenuCommand {
    private _name: string;
    private _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    getName(): string {
        return this._name;
    }

    getDescription(): string {
        return this._description;
    }

    execute(args: string): void {
        this.doExecute(args);
    }

    protected abstract doExecute(args: string): void;
}

export {
    MenuCommand,
};