const { isRealString } = require('./validation.js');

describe('- isRealString()', () => {
  test('should return true', () => {
    let str = 'Aleksei';
    let result = isRealString(str);

    expect(result).toBeTruthy();
  });

  test('should return false', () => {
    let str = '   ';
    let result = isRealString(str);

    expect(result).toBeFalsy();
  });
});