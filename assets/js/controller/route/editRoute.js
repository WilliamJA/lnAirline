/**
 * 制作航路计划
 * @author williamJM
 * date 2018/05/08 14:52
 */

"use strict";

define(["app","config/pathConfig","layer"],function (app,pathConfig,layer) {
    app.registerController("ctrl.route.editRoute",function ($scope,$http,airportComponent) {

        //初始化机场选择组件
        airportComponent.initAirportAssembly($scope,$http,pathConfig);

        $scope.sid = "-1";
        $scope.star = "-1";
        $scope.starIsDisabled = true;
        $scope.sidIsDisabled = true;

        $scope.$watch("leaveRwy",function (value) {
            if(value !== "" && value !== "-1") {
                $scope.sidIsDisabled = false;
                getSid(Number(value));
            } else {
                $scope.sidIsDisabled = true
            }
        });

        $scope.$watch("arrivalRwy",function (value) {
            if(value !== "" && value !== "-1") {
                $scope.starIsDisabled = false;
            } else {
                $scope.starIsDisabled = true
            }
        });

        //根据runway_end_id查询进近点
        var getSid = function (rwyEndId) {
            $http.get(pathConfig.backstagePath.getPath() + "/approach/"+rwyEndId+"/sid")
                .then(function successCallback(response) {
                    $scope.sids = response.data.data;
                    $scope.sid = "-1";
                })
        }




    })
    
});
