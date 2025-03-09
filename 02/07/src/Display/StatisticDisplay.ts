import { WeatherEventType } from "../Observer/WeatherEventType";
import { IObserver } from "../Observer/IObserver";
import { Statistic } from "../Statistic/Statistic";
import { WindStatistic } from "../Statistic/WindStatistic";
import { WeatherDataSource, WeatherInfo } from "../Data/WeatherData";

type WeatherStatistics = {
    temperature: Statistic;
    humidity: Statistic;
    pressure: Statistic;
    windSpeed: Statistic;
    windDirection: WindStatistic;
}

class StatisticDisplay implements IObserver<WeatherInfo, WeatherEventType> {
    private _stats: Map<string, WeatherStatistics> = new Map();

    public update(data: WeatherInfo, eventType: WeatherEventType): void {
        this._updateStats(data, eventType);
        this._displayStats(data, eventType);
    }

    private _updateStats(data: WeatherInfo, eventType: WeatherEventType): void {
        if (!this._stats.has(data.source)) {
            this._stats.set(data.source, {
                temperature: new Statistic("Temperature Statistics"),
                humidity: new Statistic("Humidity Statistics"),
                pressure: new Statistic("Pressure Statistics"),
                windSpeed: new Statistic("Wind Speed Statistics"),
                windDirection: new WindStatistic("Wind Direction Statistics"),
            });
        }

        const stats = this._stats.get(data.source)!;
        
        switch (true) {
            case eventType === WeatherEventType.TEMPERATURE:
                stats.temperature.update(data.temperature);
                break;
            case eventType === WeatherEventType.HUMIDITY:
                stats.humidity.update(data.humidity);
                break;
            case eventType === WeatherEventType.PRESSURE:
                stats.pressure.update(data.pressure);
                break;
            case eventType === WeatherEventType.WIND_SPEED && data.source === WeatherDataSource.OUTDOOR:
                stats.windSpeed.update(data.windSpeed);
                break;
            case eventType === WeatherEventType.WIND_DIRECTION && data.source === WeatherDataSource.OUTDOOR:
                stats.windDirection.update(data.windSpeed, data.windDirection);
        }
    }

    private _displayStats(data: WeatherInfo, eventType: WeatherEventType): void {
        const stats = this._stats.get(data.source)!;
        
        if (stats) {
            console.log(`${data.source}`);

            switch (true) {
                case eventType === WeatherEventType.TEMPERATURE:
                    stats.temperature.display();
                    break;
                case eventType === WeatherEventType.HUMIDITY:
                    stats.humidity.display();
                    break;
                case eventType === WeatherEventType.PRESSURE:
                    stats.pressure.display();
                    break;
                case eventType === WeatherEventType.WIND_SPEED && data.source === WeatherDataSource.OUTDOOR:
                    stats.windSpeed.display();
                    break;
                case eventType === WeatherEventType.WIND_DIRECTION && data.source === WeatherDataSource.OUTDOOR:
                    stats.windDirection.display();
            }
        }
    }
}

export {
    StatisticDisplay,
}