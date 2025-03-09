import { IObserver } from "../Observer/IObserver";
import { Statistic } from "../Statistic/Statistic";
import { WeatherInfo } from "../WeatherData";

class StatisticDisplay implements IObserver<WeatherInfo> {
    private _temperatureStats: Statistic = new Statistic();
    private _humidityStats: Statistic = new Statistic();
    private _pressureStats: Statistic = new Statistic();

    public update(data: WeatherInfo): void {
        this._temperatureStats.update(data.temperature);
        this._humidityStats.update(data.humidity);
        this._pressureStats.update(data.pressure);

        this._printStatistics("Temperature Statistics:", this._temperatureStats);
        this._printStatistics("Humidity Statistics:", this._humidityStats);
        this._printStatistics("Pressure Statistics:", this._pressureStats);
    }

    private _printStatistics(title: string, stat: Statistic): void {
        console.log(`${title}`);
        console.log(`Max: ${stat.max}`);
        console.log(`Min: ${stat.min}`);
        console.log(`Average: ${stat.average}`);
        console.log("----------------");
    }
}

export {
    StatisticDisplay,
}