const { generateMessage } = require('./message.js');

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