import { Coordinate } from './coordinate.vo';

describe('Coordinate Value Object', () => {
  it('should throw an error when providing latitude less than -90', () => {
    expect(() => new Coordinate(-90.1, 0)).toThrow('Latitude inválida');
  });

  it('should throw an error when providing latitude greater than 90', () => {
    expect(() => new Coordinate(90.1, 0)).toThrow('Latitude inválida');
  });

  it('should not throw an error when providing latitude equals -90', () => {
    expect(() => new Coordinate(-90, 0)).not.toThrow();
  });

  it('should not throw an error when providing latitude equals 90', () => {
    expect(() => new Coordinate(90, 0)).not.toThrow();
  });

  it('should throw an error when providing longitude less than -180', () => {
    expect(() => new Coordinate(0, -180.1)).toThrow('Longitude inválida');
  });

  it('should throw an error when providing longitude greater than 180', () => {
    expect(() => new Coordinate(0, 180.1)).toThrow('Longitude inválida');
  });

  it('should not throw an error when providing longitude equals -180', () => {
    expect(() => new Coordinate(0, -180)).not.toThrow();
  });

  it('should not throw an error when providing longitude equals 180', () => {
    expect(() => new Coordinate(0, 180)).not.toThrow();
  });

  it('should create a coordinate value object when providing valid latitude and longitude', () => {
    const coordinateVo = new Coordinate(32.8770961, 130.8685864);

    expect(coordinateVo).toBeInstanceOf(Coordinate);
    expect(coordinateVo).toMatchObject({ lat: 32.8770961, lng: 130.8685864 });
  });
});
