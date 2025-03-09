import { WeatherEventType } from "../Observer/WeatherEventType";
import { IObserver } from "../Observer/IObserver";
import { WeatherInfo } from "../Data/WeatherData";

class SimpleDisplay implements IObserver<WeatherInfo, WeatherEventType> {
    public update(data: WeatherInfo, eventType: WeatherEventType): void {
        switch(eventType) {
            case WeatherEventType.TEMPERATURE:
            case WeatherEventType.PRESSURE:
                console.log(`Temperature: ${data.temperature}`);
                console.log(`Pressure: ${data.pressure}`);
                console.log("----------------");
        }
    }
}

export {
    SimpleDisplay,
}