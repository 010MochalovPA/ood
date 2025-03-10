import { Observable } from "./Observer/Observable";

interface WeatherInfo {
    temperature: number;
    humidity: number;
    pressure: number;
}

class WeatherData extends Observable<WeatherInfo> {
    private _temperature: number = 0;
    private _humidity: number = 0;
    private _pressure: number = 760;

    get temperature(): number {
        return this._temperature;
    }

    get humidity(): number {
        return this._humidity;
    }

    get pressure(): number {
        return this._pressure;
    }

    public setMeasurements(temp: number, humidity: number, pressure: number): void {
        this._temperature = temp;
        this._humidity = humidity;
        this._pressure = pressure;
        this._measurementsChanged();
    }

    private _measurementsChanged(): void {
        this.notifyObservers();
    }

    protected _getChangedData(): WeatherInfo {
        return {
            temperature: this.temperature,
            humidity: this.humidity,
            pressure: this.pressure,
        };
    }
}

export {
    WeatherData,
    WeatherInfo,
}