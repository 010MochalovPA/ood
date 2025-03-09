import { WeatherData, WeatherInfo } from '../src/WeatherData';
import { IObserver } from '../src/Observer/IObserver';

describe('WeatherData', () => {
  let weatherData: WeatherData;
  let mockObserver: jest.Mocked<IObserver<WeatherInfo>>;

  beforeEach(() => {
    weatherData = new WeatherData();
    mockObserver = {
      update: jest.fn(),
    };
  });

  it('should register an observer correctly', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });
  });

  it('should remove an observer correctly', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.removeObserver(mockObserver);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver.update).not.toHaveBeenCalled();
  });

  it('should handle removing a non-existent observer gracefully', () => {
    const anotherObserver = { update: jest.fn() };
    weatherData.removeObserver(anotherObserver);

    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver.update).not.toHaveBeenCalled();
    expect(anotherObserver.update).not.toHaveBeenCalled();
  });

  it('should notify multiple observers correctly', () => {
    const mockObserver1 = { update: jest.fn() };
    const mockObserver2 = { update: jest.fn() };

    weatherData.registerObserver(mockObserver1);
    weatherData.registerObserver(mockObserver2);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });
  });

  it('should not notify removed observers while notifying others', () => {
    const mockObserver1 = { update: jest.fn() };
    const mockObserver2 = { update: jest.fn() };

    weatherData.registerObserver(mockObserver1);
    weatherData.registerObserver(mockObserver2);
    weatherData.removeObserver(mockObserver1);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).not.toHaveBeenCalled();
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });
  });

  it('should provide the latest data to observers', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });

    weatherData.setMeasurements(30, 70, 1015);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 30,
      humidity: 70,
      pressure: 1015,
    });
  });

  it('should not modify data after notifying observers', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.setMeasurements(25, 60, 1013);

    const initialData = { temperature: 25, humidity: 60, pressure: 1013 };
    expect(mockObserver.update).toHaveBeenCalledWith(initialData);

    weatherData.setMeasurements(30, 70, 1015);

    expect(initialData).toEqual({ temperature: 25, humidity: 60, pressure: 1013 });
  });

  it('should handle zero values correctly', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.setMeasurements(0, 0, 0);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 0,
      humidity: 0,
      pressure: 0,
    });
  });

  it('should handle negative values correctly', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.setMeasurements(-10, -20, -30);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: -10,
      humidity: -20,
      pressure: -30,
    });
  });

  it('should handle large values correctly', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.setMeasurements(1000, 2000, 3000);

    expect(mockObserver.update).toHaveBeenCalledWith({
      temperature: 1000,
      humidity: 2000,
      pressure: 3000,
    });
  });

  it('should not register the same observer twice', () => {
    weatherData.registerObserver(mockObserver);
    weatherData.registerObserver(mockObserver);

    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver.update).toHaveBeenCalledTimes(1);
  });
});