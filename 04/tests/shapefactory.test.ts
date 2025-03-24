import { ShapeFactory } from "../src/shapefactory/ShapeFactory";
import { Triangle } from "../src/shape/Triangle";
import { Rectangle } from "../src/shape/Rectangle";
import { Ellipse } from "../src/shape/Ellipse";
import { RegularPolygon } from "../src/shape/RegularPolygon";
import { Color } from "../src/common/Color";

describe("ShapeFactory", () => {
  let factory: ShapeFactory;

  beforeEach(() => {
    factory = new ShapeFactory();
  });
  
  describe("createShape", () => {
    it("should create a Triangle with correct parameters", () => {
      const shape = factory.createShape("triangle pink 0 0 10 0 5 10");
      expect(shape).toBeInstanceOf(Triangle);
      expect(shape.getColor()).toBe('#FFC0CB');
    });

    it("should create a Rectangle with correct parameters", () => {
      const shape = factory.createShape("rectangle red 0 0 10 10");
      expect(shape).toBeInstanceOf(Rectangle);
      expect(shape.getColor()).toBe('#FF0000');
    });

    it("should create an Ellipse with correct parameters", () => {
      const shape = factory.createShape("ellipse green 5 5 10 20");
      expect(shape).toBeInstanceOf(Ellipse);
      expect(shape.getColor()).toBe('#00FF00');
    });

    it("should create a RegularPolygon with correct parameters", () => {
      const shape = factory.createShape("polygon blue 0 0 5 10");
      expect(shape).toBeInstanceOf(RegularPolygon);
      expect(shape.getColor()).toBe('#0000FF');
    });

    it("should throw error for unknown shape type", () => {
      expect(() => factory.createShape("unknown white 0 0")).toThrowError(
        "Unknown shape type: unknown"
      );
    });

    it("should throw error for unknown color", () => {
      expect(() => factory.createShape("triangle unknown 0 0 10 0 5 10")).toThrowError(
        "Unknown color: unknown"
      );
    });

    it("should throw error for insufficient coordinates for Triangle", () => {
      expect(() => factory.createShape("triangle pink 0 0 10 0")).toThrowError(
        "Triangle requires exactly 6 coordinates (3 points)"
      );
    });

    it("should throw error for insufficient coordinates for Rectangle", () => {
      expect(() => factory.createShape("rectangle red 0 0 10")).toThrowError(
        "Rectangle requires exactly 4 coordinates (2 points)"
      );
    });

    it("should throw error for insufficient coordinates for Ellipse", () => {
      expect(() => factory.createShape("ellipse green 5 5 10")).toThrowError(
        "Ellipse requires exactly 4 coordinates (center, radiusX, radiusY)"
      );
    });

    it("should throw error for insufficient coordinates for RegularPolygon", () => {
      expect(() => factory.createShape("polygon blue 0 0 5")).toThrowError(
        "RegularPolygon requires exactly 4 coordinates (center, vertexCount, radius)"
      );
    });

    it("should throw error for insufficient description parts", () => {
      expect(() => factory.createShape("triangle")).toThrowError(
        "Description must contain at least shape type, color and coordinates"
      );
    });
  });
});