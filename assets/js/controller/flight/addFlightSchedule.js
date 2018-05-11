/**
 * 制作航班计划
 * @author williamJM
 * date 2018/04/17 19:45
 */

"use strict";

define(['app',"config/pathConfig","moment","layer"],function(app,pathConfig,moment,layer){
    app.registerController('ctrl.addFlight',function($scope,$http,airportComponent,initUIComponent){

        $scope.flightType = "-1";
        $scope.operationType = "-1";

        //初始化机场选择组件
        airportComponent.initAirportAssembly($scope,$http,pathConfig);
        //初始化UI组件
        initUIComponent.init();


        //获取航班类型
        $.get(pathConfig.backstagePath.getPath() + "/flight/flightType").then(function successCallback(response) {
            $scope.flightTypeList = response.data;
            $scope.flightType = ''+ $scope.flightTypeList[0].typeId;
        });

        //获取操作类型
        $.get(pathConfig.backstagePath.getPath() + "/flight/operationType").then(function successCallback(response) {
            $scope.operationTypeList = response.data;
            $scope.operationType = ''+ $scope.operationTypeList[0].operationId;
        });

        $scope.flightSchedule = {
            airlineId : "1",
            flightNo : "",
            fromAirportId : "",
            toAirportId : "",
            flightTypeId : "",
            operationType : "-1",
            commercialNum : "",
            std : "",
            sta : "",
            eet : "",
            date : moment(new Date()).format('YYYY-MM-DD')
        };


        $scope.week = {
            mon : false,
            tue : false,
            wed : false,
            thu : false,
            fri : false,
            sat : false,
            sun : false
        };

        $(".select-week input[type=checkbox]").on("change",function () {
            var $ngModel = $(this).attr("ng-model");
            var str = $ngModel.split(".");
            $scope.week[str[1]] = $(this).prop("checked");
        });

        $scope.repetitive = false;
        $(".repetitive").on("change",function () {
            $scope.repetitive = $(this).prop("checked");
        });

        $scope.$watch("repetitive",function (value) {
            if(value) {
                $scope.startScheduleDate = moment(new Date()).format('YYYY-MM-DD');
                $scope.endScheduleDate = moment(new Date()).add(7,"d").format('YYYY-MM-DD');
                $scope.flightSchedule.date = "";
                $(".select-week .checkbox").css("color","#333")
                    .find("input[type=checkbox]")
                    .attr("disabled",false);
            } else {
                $(".select-week .checkbox")
                    .css("color","#ccc")
                    .find("span").removeClass("checked")
                    .find("input[type=checkbox]")
                    .attr("disabled",true);
                $scope.startScheduleDate = "";
                $scope.endScheduleDate = "";
                $scope.flightSchedule.date = moment(new Date()).format('YYYY-MM-DD');
            }
        });

        var submit = function (flightSchedule,week,startDate,endDate,callback) {
            $http.post(pathConfig.backstagePath.getPath() + "/flightSchedule",
                {
                    flightScheduler : flightSchedule,
                    weekVo : week,
                    startDate : startDate,
                    endDate : endDate
                }).then(function successCallback(response) {
                callback(response);
            })
        };


        //保存航班计划
        $scope.save = function() {
            layer.confirm('确定要保存当前的航班计划吗？', {
                icon: 3,
                title:'保存提示',
                btn: ['确定','取消']
            }, function () {
                //当Repetitive激活时，禁用当天航班时间
                $scope.flightSchedule.fromAirportId = $scope.currentLeaveAirport.airportId;
                $scope.flightSchedule.toAirportId = $scope.currentArrAirport.airportId;
                var loading = layer.msg('请稍后...', {icon: 16,shade: 0.4});
                submit($scope.flightSchedule,$scope.week,$scope.startScheduleDate,
                    $scope.endScheduleDate,function (response) {
                    if(response.status === 200) {
                        layer.msg("保存成功！", {icon: 1,time:1500});
                    } else if(response.status === 500) {
                        layer.msg("服务器错误！", {icon: 2,time:1500});
                    }
                    layer.close(loading);

                });

            });
        }
    });
});
