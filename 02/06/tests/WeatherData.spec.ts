import { IndoorWeatherData, OutdoorWeatherData, WeatherInfo, WeatherDataSource } from '../src/WeatherData';
import { IObserver } from '../src/Observer/IObserver';
import {WindStatistic} from '../src/Statistic/WindStatistic';

describe('WeatherData', () => {
  let indoorWeatherData: IndoorWeatherData;
  let outdoorWeatherData: OutdoorWeatherData;
  let mockObserver1: jest.Mocked<IObserver<WeatherInfo>>;
  let mockObserver2: jest.Mocked<IObserver<WeatherInfo>>;
  let mockObserver3: jest.Mocked<IObserver<WeatherInfo>>;

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
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should remove an observer correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.removeObserver(mockObserver1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).not.toHaveBeenCalled();
  });

  it('should handle removing a non-existent observer gracefully', () => {
    const anotherObserver = { update: jest.fn() };
    indoorWeatherData.removeObserver(anotherObserver);

    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).not.toHaveBeenCalled();
    expect(anotherObserver.update).not.toHaveBeenCalled();
  });

  it('should notify multiple observers correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver2, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should not notify removed observers while notifying others', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver2, 1);
    indoorWeatherData.removeObserver(mockObserver1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).not.toHaveBeenCalled();
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should provide the latest data to observers', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });

    indoorWeatherData.setMeasurements(30, 70, 1015, 6, 180);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 30,
      humidity: 70,
      pressure: 1015,
      windSpeed: 6,
      windDirection: 180,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should not modify data after notifying observers', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    const initialData = {
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    };
    expect(mockObserver1.update).toHaveBeenCalledWith(initialData);

    indoorWeatherData.setMeasurements(30, 70, 1015, 6, 180);

    expect(initialData).toEqual({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle zero values correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.setMeasurements(0, 0, 0, 0, 0);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 0,
      humidity: 0,
      pressure: 0,
      windSpeed: 0,
      windDirection: 0,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle negative values correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.setMeasurements(-10, -20, -30, -5, -90);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: -10,
      humidity: -20,
      pressure: -30,
      windSpeed: -5,
      windDirection: -90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle large values correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.setMeasurements(1000, 2000, 3000, 100, 450);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 1000,
      humidity: 2000,
      pressure: 3000,
      windSpeed: 100,
      windDirection: 450,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should not register the same observer twice', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver1, 1);

    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).toHaveBeenCalledTimes(1);
  });

  it("should safely handle self-removing observers during notification", () => {
    class SelfRemovingObserver implements IObserver<WeatherInfo> {
      public update = jest.fn((data: WeatherInfo) => {
        indoorWeatherData.removeObserver(this);
      });
    }

    const selfRemovingObserver1 = new SelfRemovingObserver();
    const selfRemovingObserver2 = new SelfRemovingObserver();

    indoorWeatherData.registerObserver(selfRemovingObserver1, 1);
    indoorWeatherData.registerObserver(selfRemovingObserver2, 1);

    indoorWeatherData.setMeasurements(25, 65, 760, 5, 90);

    expect(selfRemovingObserver1.update).toHaveBeenCalledTimes(1);
    expect(selfRemovingObserver2.update).toHaveBeenCalledTimes(1);

    indoorWeatherData.setMeasurements(30, 70, 765, 6, 180);
    
    expect(selfRemovingObserver1.update).toHaveBeenCalledTimes(1);
    expect(selfRemovingObserver2.update).toHaveBeenCalledTimes(1);
  });

  it('should notify observers in descending order of priority', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver2, 2);
    indoorWeatherData.registerObserver(mockObserver3, 3);
  
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);
  
    const callOrder = [
      mockObserver3.update.mock.invocationCallOrder[0],
      mockObserver2.update.mock.invocationCallOrder[0],
      mockObserver1.update.mock.invocationCallOrder[0],
    ];
  
    expect(callOrder[0]).toBeLessThan(callOrder[1]);
    expect(callOrder[1]).toBeLessThan(callOrder[2]);
  });

  it('should allow re-registering an observer with a different priority', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver1, 2);

    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).toHaveBeenCalledTimes(1);
  });

  it('should handle observers with the same priority correctly', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver2, 1);

    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle removing an observer with a specific priority', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver2, 2);

    indoorWeatherData.removeObserver(mockObserver1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).not.toHaveBeenCalled();
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle registering the same observer multiple times safely', () => {
    indoorWeatherData.registerObserver(mockObserver1, 1);
    indoorWeatherData.registerObserver(mockObserver1, 1);

    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);

    expect(mockObserver1.update).toHaveBeenCalledTimes(1);
  });

  it('should handle removing a non-existent observer safely', () => {
    const nonExistentObserver = { update: jest.fn() };

    expect(() => indoorWeatherData.removeObserver(nonExistentObserver)).not.toThrow();
  });
});

describe('Weather Station Duo', () => {
  let indoorWeatherData: IndoorWeatherData;
  let outdoorWeatherData: OutdoorWeatherData;
  let mockObserver: jest.Mocked<IObserver<WeatherInfo>>;

  beforeEach(() => {
    indoorWeatherData = new IndoorWeatherData();
    outdoorWeatherData = new OutdoorWeatherData();
    mockObserver = {
      update: jest.fn(),
    };
  });

  it('should notify observers with correct source for indoor station', () => {
    indoorWeatherData.registerObserver(mockObserver, 1);
    indoorWeatherData.setMeasurements(22, 0.5, 750, 5, 90);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 22,
      humidity: 0.5,
      pressure: 750,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should notify observers with correct source for outdoor station', () => {
    outdoorWeatherData.registerObserver(mockObserver, 1);
    outdoorWeatherData.setMeasurements(15, 0.8, 760, 6, 180);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 15,
      humidity: 0.8,
      pressure: 760,
      windSpeed: 6,
      windDirection: 180,
      source: WeatherDataSource.OUTDOOR,
    });
  });

  it('should notify observers from both stations independently', () => {
    indoorWeatherData.registerObserver(mockObserver, 1);
    outdoorWeatherData.registerObserver(mockObserver, 1);

    indoorWeatherData.setMeasurements(22, 0.5, 750, 5, 90);
    outdoorWeatherData.setMeasurements(15, 0.8, 760, 6, 180);

    expect(mockObserver.update).toHaveBeenCalledTimes(2);
    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 22,
      humidity: 0.5,
      pressure: 750,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 15,
      humidity: 0.8,
      pressure: 760,
      windSpeed: 6,
      windDirection: 180,
      source: WeatherDataSource.OUTDOOR,
    });
  });

  it('should handle multiple observers with different priorities for both stations', () => {
    const mockObserver1 = { update: jest.fn() };
    const mockObserver2 = { update: jest.fn() };

    indoorWeatherData.registerObserver(mockObserver1, 1);
    outdoorWeatherData.registerObserver(mockObserver2, 2);

    indoorWeatherData.setMeasurements(22, 0.5, 750, 5, 90);
    outdoorWeatherData.setMeasurements(15, 0.8, 760, 6, 180);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 22,
      humidity: 0.5,
      pressure: 750,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 15,
      humidity: 0.8,
      pressure: 760,
      windSpeed: 6,
      windDirection: 180,
      source: WeatherDataSource.OUTDOOR,
    });
  });
});

describe('Wind Data Handling', () => {
  let indoorWeatherData: IndoorWeatherData;
  let outdoorWeatherData: OutdoorWeatherData;
  let mockObserver: jest.Mocked<IObserver<WeatherInfo>>;

  beforeEach(() => {
    indoorWeatherData = new IndoorWeatherData();
    outdoorWeatherData = new OutdoorWeatherData();
    mockObserver = {
      update: jest.fn(),
    };
  });

  it('should handle zero wind speed correctly', () => {
    indoorWeatherData.registerObserver(mockObserver, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 0, 90);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 0,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle negative wind direction correctly', () => {
    indoorWeatherData.registerObserver(mockObserver, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, -90);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: -90,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle wind direction greater than 360 degrees correctly', () => {
    indoorWeatherData.registerObserver(mockObserver, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 450);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 450,
      source: WeatherDataSource.INDOOR,
    });
  });

  it('should handle multiple wind directions correctly', () => {
    indoorWeatherData.registerObserver(mockObserver, 1);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 90);
    indoorWeatherData.setMeasurements(25, 60, 1013, 5, 180);

    expect(mockObserver.update).toHaveBeenCalledTimes(2);
    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 90,
      source: WeatherDataSource.INDOOR,
    });
    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
      windSpeed: 5,
      windDirection: 180,
      source: WeatherDataSource.INDOOR,
    });
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