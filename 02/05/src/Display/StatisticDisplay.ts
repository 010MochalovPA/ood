import { IObserver } from "../Observer/IObserver";
import { Statistic } from "../Statistic/Statistic";
import { WindStatistic } from "../Statistic/WindStatistic";
import { WeatherInfo } from "../WeatherData";

type WeatherStatistics = {
    temperature: Statistic;
    humidity: Statistic;
    pressure: Statistic;
    windSpeed: Statistic;
    windDirection: WindStatistic;
}

class StatisticDisplay implements IObserver<WeatherInfo> {
    private _stats: Map<string, WeatherStatistics> = new Map();

    public update(data: WeatherInfo): void {
        this._updateStats(data);
        this._displayStats(data);
    }

    private _updateStats(data: WeatherInfo): void {
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
        
        stats.temperature.update(data.temperature);
        stats.humidity.update(data.humidity);
        stats.pressure.update(data.pressure);
        stats.windSpeed.update(data.windSpeed);
        stats.windDirection.update(data.windSpeed, data.windDirection);
    }

    private _displayStats(data: WeatherInfo): void {
        const stats = this._stats.get(data.source)!;
        
        if (stats) {
            console.log(`${data.source}`);

            stats.temperature.display();
            stats.humidity.display();
            stats.pressure.display();
            stats.windSpeed.display();
            stats.windDirection.display();
        }
    }
}

export {
    StatisticDisplay,
}