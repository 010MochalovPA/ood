import { App } from "./app/App";

window.onload = () => {
    const input = document.getElementById('input') as HTMLInputElement;

    const application = new App(input);

    application.init();
}
