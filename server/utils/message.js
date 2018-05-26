const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getDate()
  }
};

const generateLocationMessage = (data) => {
  return {
    from: data.from,
    url: `https://maps.google.com?q=${data.latitude},${data.longitude}`,
    createdAt: data.createdAt
  }
};

module.exports = { generateMessage, generateLocationMessage };