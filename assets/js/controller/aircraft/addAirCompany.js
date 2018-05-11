/**
 * 添加飞机制造商
 * @author williamJM
 * date 2018/04/28
 */

"use strict";


define(["app","config/pathConfig","layer"],function (app,pathConfig,layer) {
    
    app.registerController("ctrl.aircraft.airCompany",function ($scope,$rootScope,$state,$http,DTOptionsBuilder, DTColumnDefBuilder) {

        $scope.airCompany = {};

        var submit = function (airCompany,callback) {
            $http.post(pathConfig.backstagePath.getPath() + "/airCompany",airCompany)
                .then(function successCallback(response) {
                    callback(response);
                });
        };

        var deleteById = function (airCompanyId,callback) {
            $http.delete(pathConfig.backstagePath.getPath() + "/airCompany/" + airCompanyId)
                .then(function successCallback(response) {
                    callback(response);
                });
        };

        $scope.save = function () {
            layer.confirm('确定要保存当前页面的信息吗？', {
                icon: 3,
                title:'保存提示',
                btn: ['确定','取消']
            }, function () {
                var loading = layer.msg('请稍后...', {icon: 16,shade: 0.4});
                submit($scope.airCompany,function (callback) {
                    layer.close(loading);
                    if(callback.status === 200) {
                        layer.msg("保存成功！", {icon: 1,time:1500});
                    } else if (callback.status === 500) {
                        layer.msg("服务器错误，保存失败！", {icon: 2,time:1500});
                    }
                });
            });
        };

        //获取飞机制造商信息
        $http.get(pathConfig.backstagePath.getPath() + "/airCompany")
            .then(function successCallback(response) {
                $scope.airCompanyList = response.data.data;
            },function errorCallback(response) {
                layer.msg("获取数据失败，请稍后再试！",{ico:2,time:1500});
            });


        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(6).notSortable()
        ];

        $scope.edit = function () {
            layer.open({
                title : "编辑制造商信息",
                type: 1,
                area: ['700px', '450px'],
                fixed: false, //不固定
                maxmin: true,
                closeBtn : "1",
                shade : 0.5,
                moveOut: true,
                resize : true,
                content: ""
            });
        };

        $scope.delete = function (index,airCompanyId) {
            layer.confirm('您确定要删除当前的信息吗？', {
                icon: 3,
                title:"删除提示",
                btn: ['确定','取消']
            }, function () {
                var loading = layer.msg('请稍后...', {icon: 16,shade: 0.4});
                deleteById(airCompanyId,function (callback) {
                    layer.close(loading);
                    if(callback.status === 200) {
                        layer.msg("删除成功！", {icon: 1,time:1500});
                    } else if (callback.status === 500) {
                        layer.msg("服务器错误，删除失败！", {icon: 2,time:1500});
                    }
                    $state.reload();
                });
            });
        };

        
    })
    
});


