/**
 * 机场信息查询
 * @author williamJM
 * date 2018/05/02 9:05
 */


"use strict";

define(["app","config/pathConfig"],function(app,pathConfig) {
    app.registerController("ctrl.airport.airportInfo",function($scope,$http) {


        $scope.airportCode = "ZBAA";
        $scope.showSuggest = false;
        $scope.isSelect = false;
        $scope.noRes = false;
        $scope.currentAirport = {};

        $scope.select = function (airport) {
            $scope.airportCode = airport.ident;
            $scope.showSuggest = false;
            $scope.currentAirport = airport;
            $scope.isSelect = true;
        };


        $scope.$watch("airportCode",function (newValue) {
            if(newValue.trim() !== "") {
                $http.get(pathConfig.backstagePath.getPath() + "/airport/" + newValue)
                    .then(function successCallback(response) {
                        $scope.suggestAirportList = response.data.data;
                        $scope.suggestAirportList.length > 0 ? $scope.noRes = false : $scope.noRes = true;
                        if($scope.isSelect) {
                            $scope.isSelect = false;
                            return;
                        }
                        $scope.showSuggest = true;
                    })
            }
        });

    });
});

