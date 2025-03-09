import { Display } from "./Display/Display";
import { StatisticDisplay } from "./Display/StatisticDisplay";
import { WeatherEventType } from "./Observer/WeatherEventType";
import { OutdoorWeatherData, WeatherData } from "./Data/WeatherData";
import { AnimalData } from "./Data/AnimalData";
import { AnimalObserver } from "./Observer/AnimalObserver";
import { AnimalEventType } from "./Observer/AnimalEventType";

const indoorWeatherData = new WeatherData();
const outdoorWeatherData = new OutdoorWeatherData();

const display = new Display();
const statisticDisplay = new StatisticDisplay();

indoorWeatherData.registerObserver(display, WeatherEventType.PRESSURE, 1);
indoorWeatherData.registerObserver(statisticDisplay, WeatherEventType.PRESSURE, 1);

outdoorWeatherData.registerObserver(display, WeatherEventType.TEMPERATURE, 1);
outdoorWeatherData.registerObserver(statisticDisplay, WeatherEventType.TEMPERATURE, 1);

indoorWeatherData.setMeasurements(22, 0.5, 750, 4, 180);
outdoorWeatherData.setMeasurements(15, 0.8, 760, 5, 270);

indoorWeatherData.setMeasurements(23, 0.6, 751, 0, 90);
outdoorWeatherData.setMeasurements(14, 0.7, 759, 0, 180);

indoorWeatherData.removeObserver(statisticDisplay, WeatherEventType.PRESSURE);
outdoorWeatherData.removeObserver(statisticDisplay, WeatherEventType.TEMPERATURE);

indoorWeatherData.setMeasurements(21, 0.4, 749, 0, 90);
outdoorWeatherData.setMeasurements(13, 0.9, 758, 0, 90);


const animalObservable = new AnimalData("Кот");

const observer1 = new AnimalObserver("1");
const observer2 = new AnimalObserver("2");

animalObservable.registerObserver(observer1, AnimalEventType.FOOD, 2);
animalObservable.registerObserver(observer1, AnimalEventType.PLAY, 1);
animalObservable.registerObserver(observer2, AnimalEventType.PLAY, 2);

animalObservable.triggerEvent(AnimalEventType.FOOD);
animalObservable.triggerEvent(AnimalEventType.PLAY);

animalObservable.removeObserver(observer1, AnimalEventType.FOOD);

animalObservable.triggerEvent(AnimalEventType.FOOD);