/**
 * 地图服务主模块
 * @author williamJM
 * date 2018/05/09 08:51
 */

'use strict';

require([
    "esri/Map",
    "esri/views/MapView",
    "sc/utils/utils",
    "esri/layers/GraphicsLayer",
    "sc/loadAirports/loadAirports",
    "sc/layerManage/layers",
    "dojo/domReady!"
], function(Map, MapView,utils,GraphicsLayer,loadAirports,layers) {

    var map = new Map({
        basemap: "gray-vector"
    });

    var view = new MapView({
        container: "map",
        map: map,
        center : [110,40],
        zoom : 3
    });

    utils.addHome(view);
    utils.addNavigationToggle(view);
    utils.addCompass(view);
    utils.addScaleBar(view);
    utils.addLocate(view);
    utils.addBasemapToggle(view);
    utils.addSearch(view);

    //map.add(layers.getAirportDynaLayer());
    //map.add(layers.getWayPointDynaLayer());

});