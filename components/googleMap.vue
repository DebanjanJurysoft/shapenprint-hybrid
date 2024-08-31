<template>
    <div>
      <input
        ref="input"
        type="text"
        placeholder="Search for a place"
        class="input-box-map"
      />
      <div ref="map" style="height: 400px; margin-top: -50px;"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        map: null,
        marker: null,
        autocomplete: null,
        geocoder: null,
      };
    },
    async mounted() {
      await this.initMap();
    },
    methods: {
      async initMap() {
        if (this.$google) {
          this.geocoder = new this.$google.maps.Geocoder(); // Initialize Geocoder
  
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                
                this.map = new this.$google.maps.Map(this.$refs.map, {
                    center: pos,
                    zoom: 12,
                });
                
                this.marker = new this.$google.maps.Marker({
                    position: pos,
                    map: this.map,
                    draggable: true,
                });
                
                const name = await this.geocodePosition(pos); // Get and display address based on the current location
                
                this.$emit('setLatLng', {
                    ...pos,
                    address: name,
                });

                this.setupAutocomplete();
              },
              () => {
                this.handleLocationError(true);
              }
            );
          } else {
            this.handleLocationError(false);
          }
        }
      },
      handleLocationError(browserHasGeolocation) {
        const pos = { lat: 40.7128, lng: -74.0060 }; // Default to New York City
        this.map = new this.$google.maps.Map(this.$refs.map, {
          center: pos,
          zoom: 8,
        });
  
        this.marker = new this.$google.maps.Marker({
          position: pos,
          map: this.map,
          draggable: true,
        });
  
        alert(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
  
        this.setupAutocomplete();
      },
      setupAutocomplete() {
        const input = this.$refs.input;
  
        // Initialize the Autocomplete service
        this.autocomplete = new this.$google.maps.places.Autocomplete(input);
  
        // Bind the Autocomplete object to the map's bounds
        this.autocomplete.bindTo("bounds", this.map);
  
        // Add listener for when a user selects a place from the suggestions
        this.autocomplete.addListener("place_changed", async () => {
          const place = this.autocomplete.getPlace();
  
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
  
          // Set the map's center to the selected place's location
          if (place.geometry.viewport) {
            this.map.fitBounds(place.geometry.viewport);
          } else {
            this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);
          }
  
          // Place a marker at the selected location
          if (this.marker) {
            this.marker.setMap(null);
          }
  
          this.marker = new this.$google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
            draggable: true,
          });
  
          // Emit the new latitude and longitude
          const name = await this.geocodePosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          this.$emit('setLatLng', {
            address: name,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        });
  
        // Add a click listener to the map to place a marker
        this.map.addListener("click", async (event) => {
          if (this.marker) {
            this.marker.setMap(null);
          }
  
          this.marker = new this.$google.maps.Marker({
            position: event.latLng,
            map: this.map,
            draggable: true,
          });
  
          const name = await this.geocodePosition(event.latLng);
          const latLng = {
            address: name,
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          this.$emit('setLatLng', latLng);
  
          // Get and display address based on the clicked position
        });
      },
      async geocodePosition(pos) {
          const data = await this.geocoder.geocode({ location: pos });
          if (data?.results.length) {
            this.$refs.input.value = data.results[0].formatted_address; // Display the address in the input field
            return data.results[0].formatted_address
          } else {
            console.error("Geocoder failed.");
          }
      },
    },
  };
  </script>
  
  <style scoped>
  .input-box-map {
    position: relative;
    top: 5px;
    left: 15px;
    z-index: 1;
    width: 80%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .pac-container {
    z-index: 10000 !important; /* Ensure the dropdown appears above other elements */
  }
  </style>
  