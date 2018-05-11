
/**
 * 添加机型
 * @author williamJM
 * date 2018/04/17 19:45
 */

"use strict";

define(['app',"config/pathConfig","layer"],function(app,pathConfig,layer){
    app.registerController('ctrl.aircraft.addAircraft',function($scope,$http){

        $scope.aircraftType = "1";

        //准备机型模板数据
        $http.get(pathConfig.backstagePath.getPath() + "/aircraftType")
            .then(function successCallback(response) {
            $scope.aircraftTemp = response.data.data;
        });

        //根据id查询机型、制造商、起降模式等信息
        var getAircraftTypeById = function (id) {

            $http.get(pathConfig.backstagePath.getPath() + "/aircraftType/extend/" + id)
                .then(function successCallback(response) {
                    $scope.currentAircraftType = response.data.data[0];
                    $scope.climb = $scope.currentAircraftType.aircraftClimb[0].climbId+'';
                    $scope.curise = $scope.currentAircraftType.aircraftCurises[0].curiseId+'';
                    $scope.descent = $scope.currentAircraftType.aircraftDescents[0].descentId+'';
                    $scope.company = $scope.currentAircraftType.airCompany.airCompanyId;
                });
        };

        $scope.$watch("aircraftType",function (newValue) {
            getAircraftTypeById(newValue);
        });

        //保存飞机信息
        var saveAircraft = function (callback) {

            var aircraft = $scope.currentAircraftType;
            aircraft.climb = $scope.climb;
            aircraft.curise = $scope.curise;
            aircraft.descent = $scope.descent;
            aircraft.airCompany = $scope.company;
            aircraft.aircraftType = $scope.aircraftType;

            $http.post(pathConfig.backstagePath.getPath() + "/aircraft",aircraft)
                .then(function success(response) {
                    callback(response.data);
                });
        };


        $scope.submit = function() {
            layer.confirm('确定要保存当前页面的信息吗？', {
                icon: 3,
                title:'保存提示',
                btn: ['确定','取消']
                }, function () {
                saveAircraft(function (callback) {
                    if(callback.status === 200) {
                        layer.msg('保存成功！', {icon: 1});
                    } else if(callback.status === 500) {
                        layer.msg("服务器错误！", {icon: 2});
                    }
                });

            });
        }

    });
});




