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

    public getTemperature(): number {
        return this._temperature;
    }

    public getHumidity(): number {
        return this._humidity;
    }

    public getPressure(): number {
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
            temperature: this.getTemperature(),
            humidity: this.getHumidity(),
            pressure: this.getPressure(),
        };
    }
}

export {
    WeatherData,
    WeatherInfo,
}