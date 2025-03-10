import { Observable } from "./Observer/Observable";

enum WeatherDataSource {
    INDOOR = "Indoor",
    OUTDOOR = "Outdoor",
}

interface WeatherInfo {
    temperature: number;
    humidity: number;
    pressure: number;
    source: WeatherDataSource;
}

class WeatherData extends Observable<WeatherInfo> {
    private _temperature: number = 0;
    private _humidity: number = 0;
    private _pressure: number = 760;

    constructor(private _source: WeatherDataSource) {
        super();
    }

    public getTemperature(): number {
        return this._temperature;
    }

    public getHumidity(): number {
        return this._humidity;
    }

    public getPressure(): number {
        return this._pressure;
    }

    public getSource(): WeatherDataSource {
        return this._source;
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
            source: this.getSource(),
        };
    }
}

class IndoorWeatherData extends WeatherData {
    constructor() {
        super(WeatherDataSource.INDOOR);
    }
}

class OutdoorWeatherData extends WeatherData {
    constructor() {
        super(WeatherDataSource.OUTDOOR);
    }
}

export {
    OutdoorWeatherData,
    IndoorWeatherData,
    WeatherInfo,
    WeatherDataSource,
}