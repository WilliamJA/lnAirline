
'use strict';

define(['app'], function (app) {
        app.config(function($stateProvider, $urlRouterProvider, $controllerProvider){
            app.registerController = $controllerProvider.register;
            app.loadJs = function(js){
                return function($rootScope, $q){
                    var def = $q.defer(),deps=[];
                    angular.isArray(js) ? (deps = js) : deps.push(js);
                    require(deps,function(){
                        $rootScope.$apply(function(){
                            def.resolve();
                        });
                    });
                    return def.promise;
                };
            };

            //$urlRouterProvider.otherwise("login");

            $stateProvider.state('addFlightSchedule',{
                url : '/addFlightSchedule',
                templateUrl : 'views/flight/add-flight-schedule.html',
                controller : 'ctrl.addFlight',
                resolve:{
                    deps:app.loadJs('./controller/flight/addFlightSchedule')
                }
            });

            $stateProvider.state("login",{
                url : "/login",
                views : {
                    "body" : {
                        templateUrl : "views/login.html",
                        controller : "ctrl.login"
                    }
                },
                resolve:{
                    deps:app.loadJs("./controller/system/login")
                }
            });

            $stateProvider.state("index",{
                url : "/index",
                views : {
                    "body" : {
                        templateUrl : "views/index.html",
                        controller : "ctrl.index"
                    }
                },
                resolve:{
                    deps:app.loadJs("./controller/system/index")
                }
            });

            $stateProvider.state("lock",{
                url : "/lock",
                views : {
                    "body" : {
                        templateUrl : "views/lock.html",
                        controller : "ctrl.lock"
                    }
                },
                resolve:{
                    deps:app.loadJs("./controller/system/lock")
                }
            });

            //home
            $stateProvider.state("index.home",{
                url : "/home",
                views : {
                    "mainContent" : {
                        templateUrl : "views/home/home.html",
                        controller : "ctrl.home"
                    }
                },
                resolve:{
                    deps:app.loadJs("./controller/home/home")
                }
            });

            //个人信息
            $stateProvider.state("index.profile",{
                url : "/user/profile",
                views : {
                    "mainContent" : {
                        templateUrl : 'views/user/user-profile.html',
                        controller : 'ctrl.user.profile',
                    }
                },
                resolve:{
                    deps:app.loadJs('./controller/user/profile')
                }
            });

            //个人日历
            $stateProvider.state("index.calendar",{
                url : "/user/calendar",
                views : {
                    "mainContent" : {
                        templateUrl : 'views/user/user-calendar.html',
                        controller : 'ctrl.calendar'
                    }
                },
                resolve:{
                    deps:app.loadJs('./controller/user/calendar')
                }
            });

            //个人消息
            $stateProvider.state("index.mail",{
                url : "/user/mail",
                views : {
                    "mainContent": {
                        templateUrl : "views/user/user-mail.html",
                        controller : "ctrl.user.mail"
                    }
                },
                resolve:{
                    deps:app.loadJs('./controller/user/mail')
                }
            });

            //飞机管理
            $stateProvider.state("index.addAircraft",{
                url : '/aircraft/addAircraft',
                views : {
                    "mainContent" : {
                        templateUrl : 'views/aircraft/add-aircraft-type.html',
                        controller : 'ctrl.aircraft.addAircraft'
                    }
                },
                resolve:{
                    deps:app.loadJs('./controller/aircraft/addAircraft')
                }
            });


            $stateProvider.state('makeFlightPlan',{
                url : '/makeFlightPlan',
                templateUrl : 'views/flight/make-flight-plan.html',
                controller : 'ctrl.makeFlightPlan',
                resolve:{
                    deps:app.loadJs('./controller/flight/makeFlightPlan')
                }
            });


            $stateProvider.state('aircraftList',{
                url : '/aircraftList',
                templateUrl : 'views/aircraft/aircraft-list.html',
                controller : 'ctrl.aircraftList',
                resolve:{
                    deps:app.loadJs('./controller/aircraft/aircraftList')
                }
            });






            $stateProvider.state('flightScheduleList',{
                url : '/flightScheduleList',
                templateUrl : 'views/flight/flight-schedule-list.html',
                controller : 'ctrl.flightScheduleList',
                resolve:{
                    deps:app.loadJs('./controller/flight/flightScheduleList')
                }
            });


            //机场航图
            $stateProvider.state('airChart',{
                url : '/airport/airChart',
                templateUrl : 'views/airport/air-chart.html',
                controller : 'ctrl.airChart',
                resolve:{
                    deps:app.loadJs('./controller/airport/airChart')
                }
            });

            //添加飞机制造商
            $stateProvider.state('addAirCompany',{
                url : '/aircraft/airCompany',
                templateUrl : 'views/aircraft/add-manufacturer.html',
                controller : 'ctrl.aircraft.airCompany',
                resolve:{
                    deps:app.loadJs('./controller/aircraft/addAirCompany')
                }
            });

            //机场信息查询
            $stateProvider.state("airport/airportInfo",{
                url : '/airport/airportInfo',
                templateUrl : 'views/airport/airport-info.html',
                controller : 'ctrl.airport.airportInfo',
                resolve:{
                    deps:app.loadJs('./controller/airport/airportInfo')
                }
            });


            //发布公告
            $stateProvider.state("notice",{
                url : "/notice",
                templateUrl : "views/notice/create-notice.html",
                controller : "ctrl.notice",
                resolve:{
                    deps:app.loadJs("./controller/notice/createNotice")
                }
            });

            //编辑航路
            $stateProvider.state("route/editRoute",{
                url : "/route/editRoute",
                templateUrl : "views/route/edit-route.html",
                controller : "ctrl.route.editRoute",
                resolve:{
                    deps:app.loadJs("./controller/route/editRoute")
                }

            })

        });

});

