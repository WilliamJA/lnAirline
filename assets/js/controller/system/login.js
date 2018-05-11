/**
 * 登录
 * @author williamJM
 * date 2018/05/10 10:22
 */

"use strict";

define(["app","config/pathConfig"],function (app, pathConfig) {
    app.registerController("ctrl.login",[
        "$scope",
        '$location',
        "$http",
    "$state",
    function($scope, $location,$http,$state){
        $scope.loginMsg = "";

        $scope.info = {
            token : {
                principal: "",
                credentials: ""
            }
        };

        $scope.login = function () {
            $http.post(pathConfig.backstagePath.getPath() + "/user/login.do",$scope.info)
                .then(function successCallback(response) {
                switch (response.data.status) {
                    case 200 : {
                        $state.go("index.home");
                        sessionStorage.setItem("currentUserInfo",response.data.data);
                    }
                    break;
                    default : $scope.loginMsg = response.data.message;
                }
            })
        }


    }]);


});
