/**
 * 配置弹出信息
 * @author williamJM
 * date 2018/04/26
 */

"use strict";

define([
    "esri/PopupTemplate"
],function (PopupTemplate) {

    //机场弹出模板
    var airportPopuTemp = new PopupTemplate({
        title : "当前机场：{ident}",
        content : [{
            type: "fields",
            fieldInfos: [{
                fieldName: "ident",
                label: "机场三字码/四字码"
            }, {
                fieldName: "name",
                label: "机场名"
            }, {
                fieldName: "country",
                label: "国家"
            }, {
                fieldName: "longest_runway_length",
                label: "最长跑道"
            }, {
                fieldName: "altitude",
                label: "标高"
            },{
                fieldName: "num_runways",
                label: "跑道个数"
            }
            ]
        }]
    });

    //导航点弹出模板
    var wayPointPopuTemp = new PopupTemplate({
        title : "当前导航点：{ident}",
        content : [{
            type: "fields",
            fieldInfos: [{
                fieldName: "ident",
                label: "导航点"
            }, {
                fieldName: "type",
                label: "类别"
            }, {
                fieldName: "region",
                label: "区属"
            }, {
                fieldName: "num_victor_airway",
                label: "导航台数量"
            }]
        }]
    });


    return {
        getAirportPopupTemp : function () {
            return airportPopuTemp;
        },
        getWayPointPopuTemp : function () {
            return wayPointPopuTemp;
        }
    }


});


