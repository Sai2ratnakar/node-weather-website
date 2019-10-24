const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/37a5c957e1fcb8d4553ce67ac9184b13/'+ lat +',' + lon +'?units=si'
    console.log(url);
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find. Try new search', undefined)
        } else {
            callback(undefined,  body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + 
                     body.currently.precipProbability + "% chance of rain. Today's high is " + body.daily.data[0].temperatureHigh + 
                     " degrees and today's low is " + body.daily.data[0].temperatureLow + ' degrees.');
        }
    })
};

module.exports = forecast; 