/**
 * 用户日历备忘录
 * @author williamJM
 * date 2018/04/17 19:45
 */

"use strict";

define(['app',"config/pathConfig","moment","layer"],function(app,pathConfig,moment,layer){
    app.registerController('ctrl.calendar',function($scope,$http,uiCalendarConfig){

        //$scope.labelBox = "";
        $scope.eventTitle = "";

        //获取用户事件标签
        var getEventLabelData = function () {
            $http.get(pathConfig.backstagePath.getPath() + "/user/eventLabel")
                .then(function successCallback(response) {
                    $scope.eventLabelList = response.data.data;
                });
        };
        getEventLabelData();

        //boolean转数字
        var booleanToInt = function(b) {
            return b === true ? 1 : 0;
        };

        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };

        //配置日历参数
        $scope.uiConfig = {
            calendar:{
                header : {
                    left: 'title',
                    right: 'prev,next,today,month,agendaWeek,agendaDay'
                },
                slotMinutes: 15,
                editable: true,
                dropable: true,
                columnFormat : {
                    month: 'dddd',
                    week: 'M月d日 ddd',
                    day: 'M月d日 dddd'
                },
                titleFormat : "yyyy年MM月",
                buttonText : {
                    today: '今天',
                    month: '月',
                    week: '周',
                    day: '天'
                },
                monthNames : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
                    '十月', '十一月', '十二月'],
                dayNames : ['星期日', '星期一', '星期二', '星期三',
                    '星期四', '星期五', '星期六'],
                dayNamesShort : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],

                //拖动事件时的不透明度
                dragOpacity : 0.7,
                eventDrop : function (event, dayDelta, minuteDelta, allDay) {
                    updateEvent({
                        labelId : event.labelId,
                        eventId : event.id,
                        start : moment(event.start),
                        end : moment(event.end),
                        isAllDay : booleanToInt(allDay)
                    });
                },
                eventResize : function (event, dayDelta, minuteDelta, allDay) {
                    updateEvent({
                        labelId : event.labelId,
                        eventId : event.id,
                        start : moment(event.start),
                        end : moment(event.end),
                        isAllDay : booleanToInt(allDay)
                    });
                }
            },
            eventRender: $scope.eventRender
        };


        //更新用户事件
        var updateEvent = function (event) {
          $http.put(pathConfig.backstagePath.getPath() + "/user/event",event)
              .then(function successCallback(response) {
              },function errorCallback(res) {
              });
        };

        var initDrag = function (el) {
            var eventObject = {
                title: $.trim(el.text())
            };
            el.data('eventObject', eventObject);
            el.draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0
            });
        };


        //向数据库中添加事件标签
        var submit = function (data) {
            $http.post(pathConfig.backstagePath.getPath() + "/user/eventLabel",{name:data})
                .then(function successCallback(response) {
                    if(response.status === 200) {
                        getEventLabelData();
                    }
                })
        };


        //添加事件标签
        $scope.addEventLabel = function () {
            if($scope.eventTitle.length > 0) {
                var html = "<div class='external-event label'>" + $scope.eventTitle + "</div>";
                $scope.labelBox = $scope.labelBox + html;
                submit($scope.eventTitle);
                initDrag($(html));
            }
        };

        //判断是否是全天事件
        var isAllDay = function (data) {
            return data !== 0;
        };

        $scope.events = [];
        //获取用户事件数据
        $http.get(pathConfig.backstagePath.getPath() + "/user/event")
            .then(function successCallback(response) {
                var data = response.data.data;

                for(var i = 0; i < data.length; i++) {
                    $scope.events.push({
                        id : data[i].eventId,
                        title : data[i].userEventLabel.name,
                        start : new Date(data[i].start),
                        end : new Date(data[i].end),
                        allDay : isAllDay(data[i].isAllDay),
                        labelId : data[i].labelId
                    });
                }

            });

        $scope.eventSources = [$scope.events];


    });
});
