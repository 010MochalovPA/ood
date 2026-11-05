interface IMenuCommand {
    getName(): string;
    getDescription(): string;
    execute(args: string): void;
}

export {
    IMenuCommand,
};