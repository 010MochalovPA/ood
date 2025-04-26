import { createInterface } from 'readline';
import { InsertParagraphApplicationCommand } from "./commands/InsertParagraphApplicationCommand";
import { DocumentController } from "../document/DocumentController";
import { Document } from "../document/Document";
import { History } from "../history/History";
import { MenuItem } from "../types";
import { ICommand } from "../command/ICommand";
import { CommandDescriptions, CommandKey } from '../command-descriptions';
import { InsertImageApplicationCommand } from './commands/InsertImageApplicationCommand';
import { HelpApplicationCommand } from './commands/HelpApplicationCommand';
import { Menu } from '../menu/Menu';
import { ListApplicationCommand } from './commands/ListApplicationCommand';
import { SetTitleApplicationCommand } from './commands/SetTitleApplicationCommand';
import { UndoApplicationCommand } from './commands/UndoApplicationCommand';
import { RedoApplicationCommand } from './commands/RedoApplicationCommand';

class Application {
    private _documentController: DocumentController;
    private _menu: Menu;

    private _readLine = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    constructor() {
        this._documentController = new DocumentController({
            document: new Document(),
            history: new History(),
        });

        this._menu = new Menu(this._createMenuItems());
    }

    async run() {
        this._readLine.prompt();

        this._readLine
            .on('line', (command) => {
                this._executeCommand(command);
                this._readLine.prompt();
            })
            .on('close', () => {
                process.exit(0);
            });
    }

    private _executeCommand(command: string): void {
        const input = command.trim();

        const [commandName, ...argsArray] = input.split(' ');
        const args = argsArray.join(' ');

        this._menu.executeCommand(commandName, args);
    }

    private _createMenuItems(): Map<string, MenuItem> {
        return new Map([
            [
                CommandKey.InsertParagraph, {
                    description: CommandDescriptions[CommandKey.InsertParagraph],
                    createCommand: (args: string): ICommand => {
                        return new InsertParagraphApplicationCommand(this._documentController, args);
                    }
                },
            ],
            [
                CommandKey.InsertImage,
                {
                    description: CommandDescriptions[CommandKey.InsertImage],
                    createCommand: (args: string): ICommand => {
                        return new InsertImageApplicationCommand(this._documentController, args);
                    }
                },
            ],
            [
                CommandKey.Help,
                {
                    description: CommandDescriptions[CommandKey.Help],
                    createCommand: (args: string): ICommand => {
                        return new HelpApplicationCommand(this._menu.getCommands());
                    }
                },
            ],
            [
                CommandKey.SetTitle,
                {
                    description: CommandDescriptions[CommandKey.SetTitle],
                    createCommand: (args: string): ICommand => {
                        return new SetTitleApplicationCommand(this._documentController, args);
                    }
                },
            ],
            [
                CommandKey.List,
                {
                    description: CommandDescriptions[CommandKey.List],
                    createCommand: (args: string): ICommand => {
                        return new ListApplicationCommand(this._documentController);
                    }
                },
            ],
            [
                CommandKey.Undo,
                {
                    description: CommandDescriptions[CommandKey.Undo],
                    createCommand: (args: string): ICommand => {
                        return new UndoApplicationCommand(this._documentController);
                    }
                },
            ],
            [
                CommandKey.Redo,
                {
                    description: CommandDescriptions[CommandKey.Redo],
                    createCommand: (args: string): ICommand => {
                        return new RedoApplicationCommand(this._documentController);
                    }
                },
            ]
        ])
    }
}

export {
    Application,
}