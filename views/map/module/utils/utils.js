/**
 * 创建地图小部件
 * @author williamJM
 * datatime 2018/4/12 18:40
 *
 */

'use strict';

define([
    "dojo/_base/declare",
    "esri/widgets/Compass",
    "esri/widgets/Home",
    "esri/widgets/ScaleBar",
    "esri/widgets/NavigationToggle",
    "esri/widgets/Locate",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Search",
    "sc/layerManage/layers",
    "sc/config/popus"
],function(declare,Compass,Home,ScaleBar,NavigationToggle,Locate,BasemapToggle,Search,layers,popus) {

    //创建导航部件
    var createCompass = function (view) {
        var compass = new Compass({
            view : view
        });
        view.ui.add(compass,{
            position: "top-left"
        })
    };

    //创建HOME部件
    var createHome = function (view) {
        var home = new Home({
            view : view
        });
        view.ui.add(home,{
            position: "bottom-right"
        })
    };

    //创建比例尺部件
    var createScaleBar = function (view) {
        var scaleBar = new ScaleBar({
            view : view
        });
        view.ui.add(scaleBar,{
            position: "bottom-left"
        })
    };

    //创建NavigationToggle
    var createNavigationToggle = function (view) {
        var navigationToggle = new NavigationToggle({
            view : view
        });
        view.ui.add(navigationToggle,{
            position: "top-left"
        })
    };

    //创建定位小部件
    var createLocate = function (view) {
        var locate = new Locate({
            view : view
        });
        view.ui.add(locate,{
            position: "bottom-right"
        })
    };

    //创建底图切换部件
    var caeateBaseMapToggle = function (view) {
        var basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "terrain"
        });
        view.ui.add(basemapToggle,{
            position: "top-right"
        })
    };

    //创建搜索小工具
    var createSearch = function (view) {
        var search = new Search({
            view: view,
            sources : [{
                featureLayer: layers.getAirportFeatureLayer(),
                searchFields: ["ident","name"],
                displayField: "ident",
                outFields: ["*"],
                placeholder: "搜索机场",
                autoSelect : true,
                popupTemplate : popus.getAirportPopupTemp(),
                popupEnabled : false,
                suggestions : ["ident","name"],
                popupOpenOnSelect : true
            }]
        });
        view.ui.add(search,{
            position: "top-left"
        })
    };



    return {
        addCompass : function (view) {
            createCompass(view)
        },
        addHome : function (view) {
            createHome(view);
        },
        addScaleBar : function (view) {
            createScaleBar(view);
        },
        addNavigationToggle : function (view) {
            createNavigationToggle(view);
        },
        addLocate : function (view) {
            createLocate(view);
        },
        addBasemapToggle : function (view) {
            caeateBaseMapToggle(view);
        },
        addSearch : function (view) {
            createSearch(view);
        }

    }

});


