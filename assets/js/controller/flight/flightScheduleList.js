/**
 * 当前航班计划列表
 * @author williamJM
 * date 2018/04/23
 */

"use strict";

define(["app","layer","config/pathConfig"],function (app,layer,pathConfig) {
    app.registerController("ctrl.flightScheduleList",function ($scope,$location,$http,DTOptionsBuilder, DTColumnDefBuilder) {


        $scope.edit = function (flightSchedule) {
            $location.path("makeFlightPlan");
        };


        //获取航班计划数据
        $http.get(pathConfig.backstagePath.getPath() + "/flightSchedule")
            .then(function successCallback(response) {
                $scope.flightScheduleList = response.data.data;
            });

        $scope.dtOption = {
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
        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(12).notSortable()
        ];




    })
});




