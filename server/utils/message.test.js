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

test('should generate correct location message object', () => {
  let createdAt = Date.getDate();

  let data = {
    latitude: 1,
    longitude: 2,
    from: 'User',
    createdAt
  };

  let url = `https://maps.google.com/?q=${data.latitude},${data.longitude}`;

  let testObj = generateMessage(data);

  expect(testObj).toBeTruthy();
  expect(testObj).toHaveProperty(url, url);
  expect(testObj).toHaveProperty(from, data.from);
  expect(testObj).toHaveProperty(createdAt, data.createdAt);
});