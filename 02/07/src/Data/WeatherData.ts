import { WeatherEventType } from "../Observer/WeatherEventType";
import { Observable } from "../Observer/Observable";

enum WeatherDataSource {
    INDOOR = "Indoor",
    OUTDOOR = "Outdoor",
}

interface WeatherInfo {
    temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    source: WeatherDataSource;
}

class WeatherData extends Observable<WeatherInfo, WeatherEventType> {
    private _temperature: number = 0;
    private _humidity: number = 0;
    private _pressure: number = 760;
    private _windSpeed: number = 0;
    private _windDirection: number = 0;

    constructor(private _source: WeatherDataSource = WeatherDataSource.INDOOR) {
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

    public getWindSpeed(): number {
        return this._windSpeed;
    }

    public getWindDirection(): number {
        return this._windDirection;
    }

    public getSource(): WeatherDataSource {
        return this._source;
    }

    public setMeasurements(temp: number, humidity: number, pressure: number, windSpeed: number, windDirection: number): void {
        this.setTemperature(temp);
        this.setHumidity(humidity);
        this.setPressure(pressure);
        this.setWindSpeed(windSpeed);
        this.setWindDirection(windDirection);
    }

    public setTemperature(temp: number) {
        this._temperature = temp;
        this.notifyObservers(WeatherEventType.TEMPERATURE);
    }

    public setHumidity(humidity: number) {
        this._humidity = humidity;
        this.notifyObservers(WeatherEventType.HUMIDITY);
    }

    public setPressure(pressure: number) {
        this._pressure = pressure;
        this.notifyObservers(WeatherEventType.PRESSURE);
    }

    public setWindSpeed(windSpeed: number) {
        this._windSpeed = windSpeed;
        this.notifyObservers(WeatherEventType.WIND_SPEED);
    }

    public setWindDirection(windDirection: number) {
        this._windDirection = windDirection;
        this.notifyObservers(WeatherEventType.WIND_DIRECTION);
    }

    protected _getChangedData(): WeatherInfo {
        return {
            temperature: this.getTemperature(),
            humidity: this.getHumidity(),
            pressure: this.getPressure(),
            windSpeed: this.getWindSpeed(),
            windDirection: this.getWindDirection(),
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
    WeatherData,
}