/**
 * 机场航图
 * @author williamJM
 * date 2018/04/28 13:25
 */

define(["app","config/pathConfig"],function(app,pathConfig) {
    app.registerController("ctrl.airChart",function ($scope,$http) {

        $scope.airportCode = "";
        $scope.showSuggest = false;
        $scope.isSelect = false;
        $scope.noRes = false;
        $scope.currentAirport = {};
        
        var selectAirChart = function (airportId) {
            $http.get(pathConfig.backstagePath.getPath() + "/airport/" + airportId + "/airchart")
                .then(function successCallback(response){
                    $scope.airChartList = response.data.data;
                    if($scope.airChartList.length > 0) {
                        $scope.airchart = pathConfig.backstagePath.getUploadPath() + $scope.airChartList[0].url;
                    } else {
                        $scope.airchart = pathConfig.frontDesk.getPath() + "/views/error/4041.html"
                    }
                })
        };

        $scope.select = function (airport) {
            $scope.airportCode = airport.ident;
            $scope.showSuggest = false;
            $scope.currentAirport = airport;
            $scope.isSelect = true;
        };

        $scope.queryAirChart = function () {
            selectAirChart($scope.currentAirport.airportId);
        };

        $scope.$watch("airportCode",function (newValue) {
            if(newValue.trim() !== "") {
                $http.get(pathConfig.backstagePath.getPath() + '/airport/' + newValue)
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

        //选择航图
        $scope.choiceAirchart = function(airchart) {
            $scope.airchart = pathConfig.backstagePath.getUploadPath() + airchart.url;
        }


    })
});



