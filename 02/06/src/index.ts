import { Display } from "./Display/Display";
import { StatisticDisplay } from "./Display/StatisticDisplay";
import { OutdoorWeatherData, WeatherData } from "./WeatherData";

const indoorWeatherData = new WeatherData();
const outdoorWeatherData = new OutdoorWeatherData();

const display = new Display();
const statisticDisplay = new StatisticDisplay();

indoorWeatherData.registerObserver(display, 1);
indoorWeatherData.registerObserver(statisticDisplay, 1);

outdoorWeatherData.registerObserver(display, 1);
outdoorWeatherData.registerObserver(statisticDisplay, 1);

indoorWeatherData.setMeasurements(22, 0.5, 750, 4, 180);
outdoorWeatherData.setMeasurements(15, 0.8, 760, 5, 270);

indoorWeatherData.setMeasurements(23, 0.6, 751, 0, 90);
outdoorWeatherData.setMeasurements(14, 0.7, 759, 0, 180);

indoorWeatherData.removeObserver(statisticDisplay);
outdoorWeatherData.removeObserver(statisticDisplay);

indoorWeatherData.setMeasurements(21, 0.4, 749, 0, 90);
outdoorWeatherData.setMeasurements(13, 0.9, 758, 0, 90);
