// plugins/google-maps.js
import { Loader } from '@googlemaps/js-api-loader';

export default async ({ app }, inject) => {
  const loader = new Loader({
    apiKey: process.env.googleMapApiKey,
    libraries: ['places'], // Add other libraries you might need here
  });

  const google = await loader.load();

  inject('google', google);
};
