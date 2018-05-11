

'use strict';

require([
    "esri/Map",
    "esri/views/MapView",
    "sc/utils/utils",
    "esri/layers/GraphicsLayer",
    "dojo/domReady!"
], function(Map, MapView,utils,GraphicsLayer,loadAirports,layers) {

    var map = new Map({
        basemap: "oceans"
    });

    var view = new MapView({
        container: "map-flight-list",
        map: map,
        center : [110,40],
        zoom : 3
    });


});