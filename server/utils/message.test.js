const { generateMessage, generateLocationMessage } = require('./message.js');

describe('- generateMessage()', () => {
  test('should generate correct message object', () => {
    let from = 'Aleksei';
    let text = 'Some text for someone user';
    let message = generateMessage(from, text);

    expect(message).toBeTruthy();
    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
    expect(message).toHaveProperty('createdAt');
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('- generateLocationMessage()', () => {
  test('should generate correct location message object', () => {
    let testObj = generateLocationMessage('user', 1, 2);

    expect(testObj).toBeTruthy();
    expect(testObj).toHaveProperty('url', 'https://maps.google.com?q=1,2');
    expect(testObj).toHaveProperty('from', 'user');
    expect(testObj).toHaveProperty('createdAt');
  });
});
