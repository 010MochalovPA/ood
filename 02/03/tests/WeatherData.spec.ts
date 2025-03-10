import { WeatherData, WeatherInfo } from '../src/WeatherData';
import { IObserver } from '../src/Observer/IObserver';

describe('WeatherData', () => {
  let weatherData: WeatherData;
  let mockObserver1: jest.Mocked<IObserver<WeatherInfo>>;
  let mockObserver2: jest.Mocked<IObserver<WeatherInfo>>;
  let mockObserver3: jest.Mocked<IObserver<WeatherInfo>>;

  beforeEach(() => {
    weatherData = new WeatherData();
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
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });
  });

  it('should remove an observer correctly', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.removeObserver(mockObserver1);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).not.toHaveBeenCalled();
  });

  it('should handle removing a non-existent observer gracefully', () => {
    const anotherObserver = { update: jest.fn() };
    weatherData.removeObserver(anotherObserver);

    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).not.toHaveBeenCalled();
    expect(anotherObserver.update).not.toHaveBeenCalled();
  });

  it('should notify multiple observers correctly', () => {
    const mockObserver1 = { update: jest.fn() };
    const mockObserver2 = { update: jest.fn() };

    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver2, 1);
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
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver2, 1);
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
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });

    weatherData.setMeasurements(30, 70, 1015);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 30,
      humidity: 70,
      pressure: 1015,
    });
  });

  it('should not modify data after notifying observers', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.setMeasurements(25, 60, 1013);

    const initialData = { temperature: 25, humidity: 60, pressure: 1013 };
    expect(mockObserver1.update).toHaveBeenCalledWith(initialData);

    weatherData.setMeasurements(30, 70, 1015);

    expect(initialData).toEqual({ temperature: 25, humidity: 60, pressure: 1013 });
  });

  it('should handle zero values correctly', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.setMeasurements(0, 0, 0);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 0,
      humidity: 0,
      pressure: 0,
    });
  });

  it('should handle negative values correctly', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.setMeasurements(-10, -20, -30);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: -10,
      humidity: -20,
      pressure: -30,
    });
  });

  it('should handle large values correctly', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.setMeasurements(1000, 2000, 3000);

    expect(mockObserver1.update).toHaveBeenCalledWith({
      temperature: 1000,
      humidity: 2000,
      pressure: 3000,
    });
  });

  it('should not register the same observer twice', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver1, 1);

    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).toHaveBeenCalledTimes(1);
  });

  it("should safely handle self-removing observers during notification", () => {
    const weatherData = new WeatherData();

    class SelfRemovingObserver implements IObserver<WeatherInfo> {
      public update = jest.fn((data: WeatherInfo) => {
        weatherData.removeObserver(this);
      });
    }

    const selfRemovingObserver1 = new SelfRemovingObserver();
    const selfRemovingObserver2 = new SelfRemovingObserver();

    weatherData.registerObserver(selfRemovingObserver1, 1);
    weatherData.registerObserver(selfRemovingObserver2, 1);

    weatherData.setMeasurements(25, 65, 760);

    expect(selfRemovingObserver1.update).toHaveBeenCalledTimes(1);
    expect(selfRemovingObserver2.update).toHaveBeenCalledTimes(1);

    weatherData.setMeasurements(30, 70, 765);
    
    expect(selfRemovingObserver1.update).toHaveBeenCalledTimes(1);
    expect(selfRemovingObserver2.update).toHaveBeenCalledTimes(1);
  });

  it('should notify observers in descending order of priority', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver2, 2);
    weatherData.registerObserver(mockObserver3, 3);
  
    weatherData.setMeasurements(25, 60, 1013);
  
    const callOrder = [
      mockObserver3.update.mock.invocationCallOrder[0],
      mockObserver2.update.mock.invocationCallOrder[0],
      mockObserver1.update.mock.invocationCallOrder[0],
    ];
  
    expect(callOrder[0]).toBeLessThan(callOrder[1]);
    expect(callOrder[1]).toBeLessThan(callOrder[2]);
  });

  it('should not register the same observer with the same priority twice', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver1, 1);

    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).toHaveBeenCalledTimes(1);
  });

  it('should allow re-registering an observer with a different priority', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver1, 2);

    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).toHaveBeenCalledTimes(1);
  });

  it('should handle observers with the same priority correctly', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver2, 1);

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

  it('should handle removing an observer with a specific priority', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver2, 2);

    weatherData.removeObserver(mockObserver1);
    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).not.toHaveBeenCalled();
    expect(mockObserver2.update).toHaveBeenCalledWith({
      temperature: 25,
      humidity: 60,
      pressure: 1013,
    });
  });

  it('should notify observers in descending order of priority', () => {
    const mockObserver11 = { update: jest.fn() };
    const mockObserver22 = { update: jest.fn() };
    const mockObserver33 = { update: jest.fn() };

    weatherData.registerObserver(mockObserver11, 1);
    weatherData.registerObserver(mockObserver22, 2);
    weatherData.registerObserver(mockObserver33, 3);
  
    weatherData.setMeasurements(25, 60, 1013);
  
    const callOrder = [
      mockObserver33.update.mock.invocationCallOrder[0],
      mockObserver22.update.mock.invocationCallOrder[0],
      mockObserver11.update.mock.invocationCallOrder[0],
    ];
  
    expect(callOrder[0]).toBeLessThan(callOrder[1]);
    expect(callOrder[1]).toBeLessThan(callOrder[2]);
  });

  it('should handle registering the same observer multiple times safely', () => {
    weatherData.registerObserver(mockObserver1, 1);
    weatherData.registerObserver(mockObserver1, 1);

    weatherData.setMeasurements(25, 60, 1013);

    expect(mockObserver1.update).toHaveBeenCalledTimes(1);
  });

  it('should handle removing a non-existent observer safely', () => {
    const nonExistentObserver = { update: jest.fn() };

    expect(() => weatherData.removeObserver(nonExistentObserver)).not.toThrow();
  });
});