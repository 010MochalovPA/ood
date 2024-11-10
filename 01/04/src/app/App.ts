import { ShapesController } from "../controllers/ShapesController";
import { Picture } from "../models/Picture";
import { HTMLCanvas } from "../views/HTMLCanvas";

enum Event {
    CHANGE = 'change',
}

class App {
    private _picture = new Picture();
    private _canvas = new HTMLCanvas();
    private _controller = new ShapesController(this._picture, this._canvas);

    constructor(private _input: HTMLInputElement) {}

    public init() {
        this._input.addEventListener(Event.CHANGE, () => {
            const command = this._input.value.trim()

            if (command) {
                try {
                    this._controller.handleCommand(command);
                    this._input.value = '';
                }
                catch (e) {
                    console.error(e)
                }
            }
        })
    }
}

export { App }