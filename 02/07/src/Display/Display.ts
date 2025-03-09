import { WeatherEventType } from "../Observer/WeatherEventType";
import { IObserver } from "../Observer/IObserver";
import { WeatherInfo } from "../Data/WeatherData";

class Display implements IObserver<WeatherInfo, WeatherEventType> {
    update(data: WeatherInfo, eventType: WeatherEventType): void {
        switch (eventType) {
            case WeatherEventType.TEMPERATURE:
                console.log(`Current Temp: ${data.temperature}`);
                break;
            case WeatherEventType.HUMIDITY:
                console.log(`Current Humidity: ${data.humidity}`);
                break;
            case WeatherEventType.PRESSURE:
                console.log(`Current Pressure: ${data.pressure}`);
                break;
        }
    }
}

export {
    Display,
}