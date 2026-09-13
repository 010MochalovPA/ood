import { createInterface } from 'readline';
import { DocumentController } from "../document/DocumentController";
import { Document } from "../document/Document";
import { History } from "../history/History";
import { Menu } from '../menu/Menu';
import { InsertParagraphMenuCommand } from '../menu/commands/InsertParagraphMenuCommand';
import { IMenuCommand } from '../menu/commands/IMenuCommand';
import { ListMenuCommand } from '../menu/commands/ListMenuCommand';
import { SetTitleMenuCommand } from '../menu/commands/SetTitleMenuCommand';
import { DeleteItemMenuCommand } from '../menu/commands/DeleteItemMenuCommand';
import { UndoMenuCommand } from '../menu/commands/UndoMenuCommand';
import { RedoMenuCommand } from '../menu/commands/RedoMenuCommand';
import { FileStorage } from '../storage/FileStorage';
import { InsertImageMenuCommand } from '../menu/commands/InsertImageMenuCommand';
import { ResizeImageMenuCommand } from '../menu/commands/ResizeImageMenuCommand';
import { SaveMenuCommand } from '../menu/commands/SaveMenuCommand';

class Application {
    private _documentController: DocumentController;
    private _menu: Menu;
    private _storage: FileStorage = new FileStorage(process.cwd());

    private _readLine = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> '
    });

    constructor() {
        this._documentController = new DocumentController({
            document: new Document(),
            history: new History(),
            storage: this._storage,
        });

        const commands: IMenuCommand[] = [
            new InsertParagraphMenuCommand(this._documentController),
            new SetTitleMenuCommand(this._documentController),
            new ListMenuCommand(this._documentController),
            new UndoMenuCommand(this._documentController),
            new RedoMenuCommand(this._documentController),
            new DeleteItemMenuCommand(this._documentController),
            new InsertImageMenuCommand(this._documentController),
            new ResizeImageMenuCommand(this._documentController),
            new SaveMenuCommand(this._documentController),
        ];

        this._menu = new Menu(commands);
    }

    async run() {
        this._readLine.prompt();

        this._readLine
            .on('line', (line: string) => {
                try {
                    this._executeLine(line);
                } catch (error) {
                    console.error((error as Error).message);
                }
                this._readLine.prompt();
            })
            .on('close', () => {
                this._cleanup();
                process.exit(0);
            });
    }

    private _cleanup(): void {
        this._storage.clear();
    }

    private _executeLine(line: string): void {
        const parsed = this._splitInput(line);

        if (!parsed) {
            return;
        }

        this._menu.executeCommand(parsed.name, parsed.args);
    }

    private _splitInput(input: string): { name: string; args: string } | null {
        const trimmed = input.trim();

        if (!trimmed) {
            return null;
        }

        const parts = trimmed.split(/\s+/);
        const [name, ...argsArray] = parts;

        return {
            name,
            args: argsArray.join(' '),
        };
    }
}

export {
    Application,
}