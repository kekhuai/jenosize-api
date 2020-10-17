const get = require('lodash/get');
const map = require('lodash/map');
const { Client } = require('@googlemaps/google-maps-services-js');

async function searchRestaurant(term) {
  try {
    const client = new Client({});
    const searchResult = await client.findPlaceFromText({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY,
        input: term,
        inputtype: 'textquery',
      },
    });
    const candidates = get(searchResult, 'data.candidates');
    return Promise.all(map(candidates, async (candidate) => {
      const placeDetail = await client.placeDetails({
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY,
          'place_id': candidate['place_id']
        },
      });
      return placeDetail.data.result;
    }));
  } catch (err) {
    console.error(err);
  }
}

module.exports = { searchRestaurant };
