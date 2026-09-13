import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { RESOURCES_DIR, WORKING_RESOURCES_DIR } from "./constants";

class FileStorage {
    private _documentDir: string;
    private _workingDir: string;
    private _refCounts = new Map<string, number>();

    constructor(documentDir: string) {
        this._documentDir = documentDir;
        this._workingDir = path.join(documentDir, WORKING_RESOURCES_DIR);

        fs.mkdirSync(this._workingDir, { recursive: true });
    }

    copy(sourcePath: string): string {
        const absoluteSource = path.isAbsolute(sourcePath)
            ? sourcePath
            : path.resolve(this._documentDir, sourcePath);

        if (!fs.existsSync(absoluteSource)) {
            throw new Error(`Image not found: ${sourcePath}`);
        }

        const hash = this._contentHash(absoluteSource);
        const extension = path.extname(absoluteSource);
        const fileName = `${hash}${extension}`;
        const destination = path.join(this._workingDir, fileName);

        if (!fs.existsSync(destination)) {
            fs.copyFileSync(absoluteSource, destination);
        }

        return fileName;
    }

    acquire(fileName: string): void {
        const count = this._refCounts.get(fileName) ?? 0;
        this._refCounts.set(fileName, count + 1);
    }

    release(fileName: string): void {
        const count = this._refCounts.get(fileName) ?? 0;

        if (count <= 1) {
            this._refCounts.delete(fileName);

            const absolute = path.join(this._workingDir, fileName);
            if (fs.existsSync(absolute)) {
                fs.unlinkSync(absolute);
            }
            return;
        }

        this._refCounts.set(fileName, count - 1);
    }

    copyResourcesTo(htmlPath: string, fileNames: string[]): void {
        const targetDir = path.dirname(path.resolve(htmlPath));
        const targetResources = path.join(targetDir, RESOURCES_DIR);

        fs.mkdirSync(targetResources, { recursive: true });

        for (const fileName of new Set(fileNames)) {
            const source = path.join(this._workingDir, fileName);
            const target = path.join(targetResources, fileName);

            if (fs.existsSync(source)) {
                fs.copyFileSync(source, target);
            }
        }
    }

    clear(): void {
        if (fs.existsSync(this._workingDir)) {
            fs.rmSync(this._workingDir, { recursive: true, force: true });
        }
    }

    private _contentHash(sourcePath: string): string {
        const content = fs.readFileSync(sourcePath);
        return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16);
    }
}

export {
    FileStorage,
};