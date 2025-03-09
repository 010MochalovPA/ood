import { IObserver } from "../Observer/IObserver";
import { Statistic } from "../Statistic/Statistic";
import { WeatherInfo } from "../WeatherData";

class StatisticDisplay implements IObserver<WeatherInfo> {
    private _temperatureStats: Statistic = new Statistic("Temperature Statistics");
    private _humidityStats: Statistic = new Statistic("Humidity Statistics");
    private _pressureStats: Statistic = new Statistic("Pressure Statistics");

    public update(data: WeatherInfo): void {
        this._updateStats(data);
        this._displayStats();        
    }

    private _updateStats(data: WeatherInfo): void {
        this._temperatureStats.update(data.temperature);
        this._humidityStats.update(data.humidity);
        this._pressureStats.update(data.pressure);
    }

    private _displayStats(): void {
        this._temperatureStats.display();
        this._humidityStats.display();
        this._pressureStats.display();
    }
}

export {
    StatisticDisplay,
}