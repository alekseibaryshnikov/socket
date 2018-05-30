const moment = require('moment');


const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().format('H:mm')
  }
};

const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://maps.google.com?q=${latitude},${longitude}`,
    createdAt: moment().format('H:mm')
  }
};

module.exports = { generateMessage, generateLocationMessage };