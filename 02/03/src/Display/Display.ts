import { IObserver } from "../Observer/IObserver";
import { WeatherInfo } from "../WeatherData";

class Display implements IObserver<WeatherInfo> {
    update(data: WeatherInfo): void {
        this._displayStats(data);
    }

    private _displayStats(data: WeatherInfo): void {
        console.log(`Current Temp: ${data.temperature}`);
        console.log(`Current Humidity: ${data.humidity}`);
        console.log(`Current Pressure: ${data.pressure}`);
        console.log("----------------");
    }
}

export {
    Display,
}