/**
 * 主页
 * @author williamJM
 * date 2018/05/07
 */

define(["app","config/pathConfig","mCustomScrollbar","layer"],function (app,pathConfig,mCustomScrollbar,layer) {
    app.registerController("ctrl.home",function ($scope,$http) {

        setTimeout(function () {
            $("#flightList,#slimScrollDiv").mCustomScrollbar({
                scrollInertia : 500,
                scrollEasing : "easeInOutSine",
                advanced : {
                    updateOnContentResize : true
                },
                mouseWheel:"auto",
                autoDraggerLength : true
            });
        },300);

        //获取航班计划数据
        $http.get(pathConfig.backstagePath.getPath() + "/flightSchedule")
            .then(function successCallback(response) {
                $scope.flightScheduleList = response.data.data;
            });

        //获取系统公告信息
        $http.get(pathConfig.backstagePath.getPath() + "/notice")
            .then(function successCallback(response) {
                $scope.sysNotices = response.data.data;
            });

        //查看公告详细信息
        $scope.open = function (notice) {
            localStorage.setItem("noticeInfo",JSON.stringify(notice));
            var index = layer.open({
                type: 2,
                closeBtn : "1",
                shade : 0,
                title : "公告",
                move : false,
                cancel : function () {
                    localStorage.removeItem("noticeInfo");
                },
                content: "views/notice/open-notice-page.html"
            });
            layer.full(index);
        }





    });
});

