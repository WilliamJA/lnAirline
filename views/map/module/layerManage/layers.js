/**
 * 图层管理模块
 * @author williamJM
 * date 2018/04/25
 */

"use strict";

define([
    "esri/layers/TileLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/MapImageLayer",
    "sc/config/popus"
],function(TileLayer,FeatureLayer,MapImageLayer,popus) {

    var servicePath = {
        airportMapService : "http://localhost:6080/arcgis/rest/services/lnAirlinesMap/airport/MapServer",
        airportFeatureService : "http://localhost:6080/arcgis/rest/services/lnAirlinesMap/airport/FeatureServer",
        wayPointService : "http://localhost:6080/arcgis/rest/services/lnAirlinesMap/wayPoint/MapServer"
    };

    var airportFeatureLayer = new FeatureLayer(servicePath.airportFeatureService);

    var airportDynaServer = new MapImageLayer({
        url : servicePath.airportMapService,
        sublayers :[{
            id : 0,
            popupEnabled : true,
            source: {
                mapLayerId: 0
            },
            popupTemplate : popus.getAirportPopupTemp()
        }]
    });

    var wayPointDynaServer = new MapImageLayer({
        url : servicePath.wayPointService,
        sublayers :[{
            id : 0,
            popupEnabled : true,
            source: {
                mapLayerId: 0
            },
            popupTemplate : popus.getWayPointPopuTemp()
        }]
    });


    return {
        servicePath : servicePath,
        getAirportFeatureLayer : function () {
            return airportFeatureLayer;
        },
        getAirportDynaLayer : function () {
            return airportDynaServer;
        },
        getWayPointDynaLayer : function () {
            return wayPointDynaServer;
        }
    }


});






