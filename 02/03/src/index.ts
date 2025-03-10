import { Display } from "./Display/Display";
import { StatisticDisplay } from "./Display/StatisticDisplay";
import { WeatherData } from "./WeatherData";

const weatherData = new WeatherData();

const display = new Display();
weatherData.registerObserver(display, 1);

const statisticDisplay = new StatisticDisplay();
weatherData.registerObserver(statisticDisplay, 1);

weatherData.setMeasurements(3, 0.7, 760);
weatherData.setMeasurements(4, 0.8, 761);

weatherData.removeObserver(statisticDisplay);

weatherData.setMeasurements(10, 0.8, 761);
weatherData.setMeasurements(-10, 0.8, 761);
