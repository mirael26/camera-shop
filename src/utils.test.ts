import { addPriceSeparators } from './utils';

describe('addPriceSeparators function', () => {
  test('Return correct three-digit result', () => {
    const priceResult = addPriceSeparators(123);
    expect(priceResult).toBe('123');
  });

  test('Return correct four-digit result', () => {
    const priceResult = addPriceSeparators(1234);
    expect(priceResult).toBe('1 234');
  });

  test('Return correct seven-digit result', () => {
    const priceResult = addPriceSeparators(1234567);
    expect(priceResult).toBe('1 234 567');
  });

  test('Return correct result with custom sign', () => {
    const priceResult = addPriceSeparators(1234, '.');
    expect(priceResult).toBe('1.234');
  });

  test('If negative value return undefined', () => {
    const priceResult = addPriceSeparators(-3);
    expect(priceResult).toBeUndefined();
  });
});