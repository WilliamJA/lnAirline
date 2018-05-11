/**
 * 用户备忘录日历
 * @author williamJM
 * datetime 2018/4/13 10:06
 */

'use strict';

var Calendar = function () {

    return {
        //初始化个人日历模块
        init: function () {

            Init.addResponsiveHandler(function () {
                Calendar.initCalendar();
            });

            $('.page-sidebar .sidebar-toggler').click(function () {
                Calendar.initCalendar();
            });
            Calendar.initCalendar();
        },

        initCalendar: function () {

            if (!jQuery().fullCalendar) {
                return;
            }

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var h = {};

            if (Init.isRTL()) {
                if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'agendaDay, agendaWeek, month, today'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        right: 'title',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today, prev,next'
                    };
                }
            } else {
                if ($('#calendar').parents(".portlet").width() <= 720) {
                    $('#calendar').addClass("mobile");
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    $('#calendar').removeClass("mobile");
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }
            }


            var initDrag = function (el) {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim(el.text()) // use the element's text as the event title
                };
                // store the Event Object in the DOM element so we can get to it later
                el.data('eventObject', eventObject);
                // make the event draggable using jQuery UI
                el.draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 //  original position after the drag
                });
            };

            var addEvent = function (title) {
                title = title.length == 0 ? "Untitled Event" : title;
                var html = $('<div class="external-event label">' + title + '</div>');
                jQuery('#event_box').append(html);
                initDrag(html);
            };

            $('#external-events div.external-event').each(function () {
                initDrag($(this))
            });

            $('#event_add').unbind('click').click(function () {
                var title = $('#event_title').val();
                addEvent(title);
            });

            //添加事件标签
            $('#event_box').html("");
            addEvent("召开会议");
            addEvent("制定航班计划");
            addEvent("派遣航班");
            addEvent("召开安全会议");
            addEvent("工作总结");
            addEvent("业绩汇报");

            // 销毁日历
            $('#calendar').fullCalendar('destroy');

            //重新初始化
            $('#calendar').fullCalendar({
                header: h,
                slotMinutes: 15,
                editable: true,
                dropable: true,
                columnFormat : {
                    month: 'dddd', // Mon
                    week: 'M月d日 ddd', // Mon 9/7
                    day: 'M月d日 dddd' // Monday 9/7
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

                drop: function (date, allDay) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');
                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;
                    copiedEventObject.className = $(this).attr("data-class");

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                events: [{
                    title: 'All Day Event',
                    start: new Date(y, m, 2),
                    backgroundColor: Init.getLayoutColorCode('yellow')
                }, {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    backgroundColor: Init.getLayoutColorCode('green')
                }, {
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 3, 16, 0),
                    allDay: false,
                    backgroundColor: Init.getLayoutColorCode('red')
                }, {
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 4, 16, 0),
                    allDay: false,
                    backgroundColor: Init.getLayoutColorCode('green')
                }, {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false
                }, {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    backgroundColor: Init.getLayoutColorCode('grey'),
                    allDay: false
                }, {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    backgroundColor: Init.getLayoutColorCode('purple'),
                    allDay: false
                }, {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    backgroundColor: Init.getLayoutColorCode('yellow'),
                    url: 'http://google.com/'
                }
                ]
            });

        }

    };

}();