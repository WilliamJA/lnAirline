/**
 * @author williamJM
 * date 2018/05/10 10:22
 */

"use strict";

define(["app","config/pathConfig","Init"],function (app, pathConfig,Init) {
    app.registerController("ctrl.index",function ($rootScope,$state) {

        Init.init();

        //退出系统
        $rootScope.logout = function () {
            $http.get(pathConfig.backstagePath.getPath() + "/logout")
                .then(function successCallback() {
                    sessionStorage.removeItem("currentUserInfo");
                    $state.go()
                    window.location.href = pathConfig.frontDesk.getPath() + "/login.html";
                })
        };

        $rootScope.lockScreen = function () {
            window.location.href = pathConfig.frontDesk.getPath() + "/login.html";
            sessionStorage.setItem("locked","true");
        };



    });
});