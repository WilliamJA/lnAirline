/**
 * app JS 主模块
 * @author williamJM
 * /datetime 2018/04/13 9:40
 */
'use strict';

//配置模块路径
require.config({
    baseUrl : "assets/js",
    paths : {
        "jquery" : "plug/jquery/jquery-1.10.1.min",
        "bootstrap" : "plug/bootstrap/bootstrap.min",
        "dtBootStrap" : "plug/bootstrap/DT_bootstrap",
        "jqueryUi" : "plug/jquery/jquery-ui-1.10.1.custom.min",
        "jqDataTables" : "plug/jquery/jquery.dataTables.min",
        "angular" : "plug/angular/angular.min",
        "uiRoute" : "plug/angular/angular-ui-router.min",
        "calendar" : "plug/angular/angular-ui-calendar",
        "angularDrag" : "plug/angular/angular-draggable.min",
        "sanitize" : "plug/angular/angular-sanitize.min",
        "uniform" : "plug/jquery/jquery.uniform.min",
        "fileupload" : "plug/bootstrap/bootstrap-fileupload",
        "datatables" : "plug/angular/angular-datatables",
        "select2" : "plug/select2/select2.min",
        "Init" : "Init",
        "blockui" : "plug/jquery/jquery.blockui.min",
        "routes" : "routes",
        "jeDate" : "plug/jeDate/jquery.jedate.min",
        "moment" : "plug/moment/moment-2.10-6",
        "fullCalendar" : "plug/fullcalendar/fullcalendar.min",
        "layer" : "plug/layer/layer",
        "draggable" : "plug/draggable/draggable.min",
        "Cropper" : "plug/cropper/cropper",
        "wangEditor" : "plug/wangEditor/wangEditor.min",
        "mousewheel" : "plug/jquery/jquery.mousewheel.min",
        "mCustomScrollbar" : "plug/jquery/jquery.mCustomScrollbar",
        "domReady" : "plug/domReady/domReady.min",
        "jquery-fileupload" : "plug/jquery/jquery.fileupload",
        "fileupload-fp" : "plug/jquery/jquery.fileupload-fp",
        "fileuploadUi" : "plug/jquery/jquery.fileupload-ui",
        "load-image" : "plug/blueimp-load-image/load-image.min",
        "load-image-meta" : "plug/blueimp-load-image/load-image-meta.min",
        "load-image-scale" : "plug/blueimp-load-image/load-image-scale.min",
        "load-image-exif" : "plug/blueimp-load-image/load-image-exif.min",
        "canvas-to-blob" : "plug/canvas/canvas-to-blob.min",
        "tmpl" : "plug/tmpl/tmpl.min",
        "jquery-ui-widget" : "plug/jquery/jquery.ui.widget",
        "iframe-transport" : "plug/jquery/jquery.iframe-transport",
        "fileupload-audio" : "plug/jquery/jquery.fileupload-audio",
        "fileupload-video" : "plug/jquery/jquery.fileupload-video",
        "fileupload-validate" : "plug/jquery/jquery.fileupload-validate",
        "fileupload-process" : "plug/jquery/jquery.fileupload-process",
        "fileupload-image" : "plug/jquery/jquery.fileupload-image",
        "angularShiro" : "plug/angular/angular-shiro",
        "angularEvents" : "plug/angular/angular-events.min",
        "shiro" : "shiro",
        "angularMessage" : "plug/angular/angular-message.min"
    },
    shim: {
        "bootstrap": {
            deps: ['jquery'],
            exports: "bootstrap"
        },
        "dtBootStrap" : {
            deps: ["bootstrap","jqDataTables","select2"],
            exports: "dtBootStrap"
        },
        "jqueryUi" : {
            deps: ['jquery'],
            exports: "jqueryUi"
        },
        "jqDataTables" : {
            deps: ['jquery'],
            exports: "jqDataTables"
        },
        "datatables" : {
            deps: ["jquery","jqDataTables"]
        },
        "angular" : {
            exports: "angular"
        },
        "uiRoute" : {
            deps: ['angular']
        },
        "calendar" : {
            deps: ["angular","fullCalendar"],
            exports: "calendar"
        },
        "angularDrag" : {
            deps: ["angular","jquery"]
        },
        "sanitize" : {
            deps: ["angular"]
        },
        "uniform" : {
            deps: ["jquery"]
        },
        "fileupload" : {
            deps: ["bootstrap"],
            exports: "fileupload"
        },
        "select2" : {
            deps: ["jquery"],
            exports: "select2"
        },
        "Init" : {
            exports: "Init"
        },
        "moment" : {
            exports: "moment"
        },
        "fullCalendar" : {
            deps: ["jquery","moment","draggable"]
        },
        "blockui" : {
            exports: "blockui"
        },
        "jeDate" : {
            deps: ["jquery"],
            exports: "jeDate"
        },
        "layer" : {
            deps: ["jquery"]
        },
        "draggable" : {
            deps: ["jquery"]
        },
        "Cropper" : {
            deps: ["jquery"]
        },
        "mCustomScrollbar" : {
            deps: ["mousewheel"]
        },
        "angularShiro" : {
            deps : ["angular"]
        },
        "angularEvents" : {
            deps : ["angular","uiRoute"]
        },
        "angularMessage" : {
            deps : ["angular"]
        }
    }
});

require([
    "jquery",
    "layer",
    "bootstrap",
    "dtBootStrap",
    "jqueryUi",
    "angular",
    "uiRoute",
    "uniform",
    "fileupload",
    "routes",
    "app",
],function ($,layer,bootstrap,dtBootStrap,jqueryUi,angular) {

    layer.config({
        resize : false,
        scrollbar : false
    });

    angular.bootstrap(document, ["app"]);

});










