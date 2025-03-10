import { IndoorWeatherData, OutdoorWeatherData, WeatherInfo, WeatherDataSource } from '../src/Data/WeatherData';
import { IObserver } from '../src/Observer/IObserver';
import {WindStatistic} from '../src/Statistic/WindStatistic';
import { WeatherEventType } from '../src/Observer/WeatherEventType';

describe('WeatherData', () => {
  let indoorWeatherData: IndoorWeatherData;
  let outdoorWeatherData: OutdoorWeatherData;
  let mockObserver1: jest.Mocked<IObserver<WeatherInfo, WeatherEventType>>;
  let mockObserver2: jest.Mocked<IObserver<WeatherInfo, WeatherEventType>>;
  let mockObserver3: jest.Mocked<IObserver<WeatherInfo, WeatherEventType>>;

  beforeEach(() => {
    indoorWeatherData = new IndoorWeatherData();
    outdoorWeatherData = new OutdoorWeatherData();
    mockObserver1 = {
      update: jest.fn(),
    };
    mockObserver2 = {
      update: jest.fn(),
    };
    mockObserver3 = {
      update: jest.fn(),
    };
  });

  it('should register an observer correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, WeatherEventType.HUMIDITY, 1);
    indoorWeatherData.setHumidity(60);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      humidity: 60,
      pressure: 760,
      temperature: 0,
      windDirection: 0,
      windSpeed: 0,
      source: WeatherDataSource.INDOOR,
    },
    WeatherEventType.HUMIDITY);
  });

  it('should remove an observer correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, WeatherEventType.HUMIDITY, 1);
    indoorWeatherData.removeObserver(mockObserver1, WeatherEventType.HUMIDITY);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).not.toHaveBeenCalled();
  });

  it('should handle removing a non-existent observer gracefully', () => {
    const anotherObserver = { update: jest.fn() };
    indoorWeatherData.removeObserver(anotherObserver, WeatherEventType.PRESSURE);

    indoorWeatherData.setPressure(1013);

    expect(mockObserver1.update).not.toHaveBeenCalled();
    expect(anotherObserver.update).not.toHaveBeenCalled();
  });
});

describe('WindStatistic', () => {
  let windStatistic: WindStatistic;

  beforeEach(() => {
    windStatistic = new WindStatistic("Wind Direction Statistics");
  });

  it('should calculate average direction correctly for simple case', () => {
    windStatistic.update(5, 90);
    windStatistic.update(5, 180);

    expect(windStatistic.average).toBeCloseTo(135);
  });

  it('should calculate average direction correctly for crossing 0°', () => {
    windStatistic.update(5, 350);
    windStatistic.update(5, 10);

    expect(windStatistic.average).toBeCloseTo(0);
  });

  it('should handle zero wind speed correctly', () => {
    windStatistic.update(0, 90);
    windStatistic.update(0, 180);

    expect(windStatistic.average).toBeCloseTo(0);
  });

  it('should handle negative wind direction correctly', () => {
    windStatistic.update(5, -90);
    windStatistic.update(5, -180);

    expect(windStatistic.average).toBeCloseTo(225);
  });

  it('should handle wind direction greater than 360 degrees correctly', () => {
    windStatistic.update(5, 450);
    windStatistic.update(5, 90);

    expect(windStatistic.average).toBeCloseTo(90);
  });
});