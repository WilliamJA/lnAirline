


'use strict';

define([
    "dojo/_base/xhr",
    "esri/Graphic"
],function (xhr,Graphic) {

    var markerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    };

    var point = {
        type: "point"
    };

    function getData() {
        xhr.get({
            url:"http://localhost:8080/SSM_lnAirlines/airport/getAllMediumAirport",
            handleAs:"json",
            load: function(data){
                console.log(data);
                return data;
            }
        });
    }

    var loadAirport = function(graphicLayer) {

        xhr.get({
            url:"http://localhost:8080/SSM_lnAirlines/airport/largeAirport",
            handleAs:"json",
            load: function(data){
                dojo.forEach(data.data,function (item) {
                    point.longitude = item['lonx'];
                    point.latitude = item['laty'];

                    var pointGraphic = new Graphic({
                        geometry: point,
                        symbol: markerSymbol
                    });
                    graphicLayer.add(pointGraphic);
                });
            }
        });


    };

    return {
        loadAirport : loadAirport
    }




});


