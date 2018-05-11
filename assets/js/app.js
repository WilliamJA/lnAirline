/**
 * 定义angularJS应用
 * @author willimJM
 * date 2018/04/18
 */

"use strict";

define([
    "jquery",
    "config/pathConfig",
    "jeDate",
    "angular",
    "moment",
    "layer",
    "calendar",
    "datatables",
    "sanitize",
    "uiRoute",
    "uniform",
    "angularDrag",
    "angularEvents",
    "angularMessage"
], function ($,pathConfig,jeDate,angular,moment,layer) {
    var app = angular.module("app",
        ["ui.router","datatables","ui.calendar","ngSanitize","ngDraggable","ui.router.state.events","ngMessages"]);

    //定义机场选择组件
    app.factory("airportComponent", function () {
        return {
            initAirportAssembly: function ($scope, $http, pathConfig) {

                $scope.leavelRwyisNotOptional = true;
                $scope.arrivalRwyisNotOptional = true;
                $scope.arrivalRwy = "-1";
                $scope.leaveRwy = "-1";
                $scope.currentLeaveAirport = {
                    ident : " -- "
                };
                $scope.currentArrAirport = {
                    ident : " -- "
                };
                $scope.search = {
                    leaveAirport: "ZBAA",
                    arrivalAirport: "ZGGG"
                };

                $scope.visible = false;
                $scope.toggle = function () {
                    $scope.visible = !$scope.visible;
                    $scope.arrVisible = false;
                };

                $scope.arrVisible = false;
                $scope.arrToggle = function () {
                    $scope.visible = false;
                    $scope.arrVisible = !$scope.arrVisible;
                };

                //获取机场信息
                var getAirport = function (word, type) {
                    $http.get(pathConfig.backstagePath.getPath() + '/airport/' + word)
                        .then(function successCallback(response) {
                            if (type === "arr") {
                                $scope.ArrAirportList = response.data.data;
                            } else if (type === "leave") {
                                $scope.LevAirportList = response.data.data;
                            }
                        })
                };

                //根据机场获取跑道信息
                var getRwyInfo = function (airportId, type) {
                    $http.get(pathConfig.backstagePath.getPath() + '/runway/airport/' + airportId)
                        .then(function successCallback(response) {
                            if (type === "arr") {
                                $scope.arRnwayList = response.data.data;
                            } else if (type === "leave") {
                                $scope.LevRnwayList = response.data.data;
                            }
                        })
                };


                //离港机场监听
                $scope.$watch("search.leaveAirport", function (newValue) {
                    if (newValue !== "") {
                        getAirport(newValue, "leave");
                    }
                });

                //到港机场监听
                $scope.$watch("search.arrivalAirport", function (newValue) {
                    if (newValue !== "") {
                        getAirport(newValue, "arr");
                    }
                });

                //离港机场选择
                $scope.checked = function (airport) {
                    $scope.visible = false;
                    $scope.currentLeaveAirport = airport;
                    getRwyInfo(airport.airportId, "leave");
                    $scope.leavelRwyisNotOptional = false;
                };

                //到港机场选择
                $scope.arrChecked = function (airport) {
                    $scope.arrVisible = false;
                    $scope.currentArrAirport = airport;
                    getRwyInfo(airport.airportId, "arr");
                    $scope.arrivalRwyisNotOptional = false;
                };

                //获取航空公司列表
                $http({
                    url: pathConfig.backstagePath.getPath() + "/airline",
                    method: "GET"
                }).then(function successCallback(response) {
                    $scope.airlineList = response.data.data;
                });

            }
        }
    });



    //初始化UI组件
    app.factory("initUIComponent",function () {
        return {
            init : function () {
                $("input[type=checkbox]").uniform();
            }
        }
    });

    app.run(['$rootScope', '$location', "$state",function($rootScope, $location, $state) {
        /* 监听路由的状态变化 */
        $rootScope.$on('$stateChangeSuccess', function(evt, next, current){
            //$state.go($location.path().split("/")[1]);
            $rootScope.$watch("$stateChangeStart",function () {
                switch ($location.path()) {
                    case "/login" : $rootScope.bodyClass = "login";
                        break;
                    case "/lockScreen" :  $rootScope.bodyClass = "";
                        break;
                    default : $rootScope.bodyClass = "page-header-fixed"
                }
            });
        });
    }]);

    app.controller("bodyCtrl",function ($rootScope,$interval) {

        $interval(function () {
            $rootScope.utc = moment(new Date()).utc().format();
        },1000);

        //配置表格参数
        $rootScope.dtOption = {
            "oLanguage": { // 国际化配置
                "sProcessing": "正在获取数据，请稍后...",
                "sLengthMenu": "显示 _MENU_ 条",
                "sZeroRecords": "没有找到数据",
                "sInfo": "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
                "sInfoEmpty": "记录数为0",
                "sInfoFiltered": "(全部记录数 _MAX_ 条)",
                "sInfoPostFix": "",
                "sSearch": "查询: ",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "第一页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "最后一页"
                }
            }
        };

    });

    //定义时间插件
    app.directive("jeDate", function () {
        return {
            restrict: 'A',
            replace: true,
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                var value = "";
                var unregister = scope.$watch(function () {
                    element.on('change', function () { //注册onChange事件，设置viewValue
                        scope.$apply(function () {
                            ctrl.$setViewValue(value);
                        });
                    });

                    element.on('click', function () {
                        element.jeDate({
                            format:"YYYY-MM-DD",
                            language:{                                  //多语言设置
                                name  : "cn",
                                month : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                                weeks : [ "日", "一", "二", "三", "四", "五", "六" ],
                                times : ["小时","分钟","秒数"],
                                titText: "请选择日期时间",
                                clear : "清空",
                                today : "今天",
                                yes   : "确定",
                                close : "关闭"
                            },
                            minDate : $.nowDate(),
                            onClose : false,
                            okfun : function (obj) {
                                value = obj.val;
                                element.change();
                            }
                        });
                    });

                    //第一次绑定事件，模拟一次click，否则肯能要点两下才会出日期框
                    element.click();
                    return ctrl.$modelValue;
                }, initialize);

                function initialize(value) {
                    ctrl.$setViewValue(value);
                    unregister();
                }
            }
        }
    });

    //创建地图指令
    app.directive("map", function () {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs, ctrl) {

                element.on("click",function () {
                    if(!eval(attrs.active)) {
                        attrs.active = true.toString();
                        layer.open({
                            type: 2,
                            area: ['700px', '450px'],
                            fixed: false, //不固定
                            maxmin: true,
                            closeBtn : "1",
                            shade : 0,
                            moveOut: true,
                            resize : true,
                            scrollbar : true,
                            cancel : function () {
                                attrs.active = false.toString()
                            },
                            content: "views/map/map.html"
                        });
                    }
                });
            }
        }
    });

    app.filter("cusDate",function () {
        return function (value) {
            var v = value.toString();
            var j = v.length;
            for(var i = 0; i < 4-j; i++) {
                v = 0 + v;
            }
            return v.substr(0,2) + ":" + v.substr(2);
        }
    });


    return app;

});





