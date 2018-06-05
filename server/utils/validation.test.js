const { isRealString } = require('./validation.js');

describe('- isRealString()', () => {
  test('should allow string with non-spaces', () => {
    let str = 'Aleksei';
    let result = isRealString(str);

    expect(result).toBeTruthy();
  });

  test('should reject string with only spaces', () => {
    let str = '   ';
    let result = isRealString(str);

    expect(result).toBeFalsy();
  });

  test('should reject non-string value', () => {
    let str = 12345;
    let result = isRealString(str);

    expect(result).toBeFalsy();
  });
});