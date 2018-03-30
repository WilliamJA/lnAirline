/**
 定义系统的相关设置
 **/

var System = function() {

    //配置serverPath
    var serverPath = {
        port : ':8080',
        protocol : 'http://',
        host : 'localhost',
        projectName : "lnAirline",
        getPath : function () {
            return this.protocol + this.host + this.port  + "/" + this.projectName;
        }
    };

    var $mainContent = $("#main-content");

    var userCalendar = function() {
        $mainContent.load(serverPath.getPath() + "/views/user/user-calendar.html");
    };

    var userProfile = function() {
        $mainContent.load(serverPath.getPath() + "/views/user/user-profile.html");
    };

    var queryAirChart = function () {
        $mainContent.load(serverPath.getPath() + "/views/airport/air-chart.html");
    };

    var addAirport = function () {
        $mainContent.load(serverPath.getPath() + "/views/airport/airport-manage.html");
    };

    var airportInfo = function () {
        $mainContent.load(serverPath.getPath() + "/views/airport/airport-manage.html");
    };

    var airportWeather = function () {
        $mainContent.load(serverPath.getPath() + "/views/weather/airport-weather.html");
    };

    var airRouteWeather = function() {
        $mainContent.load(serverPath.getPath() + "/views/weather/air-route-weather.html");
    };

    var aircraftTypeList = function () {
        $mainContent.load(serverPath.getPath() + "/views/aircraft/aircraft-type-list.html");
    };

    var addAircraftType = function () {
        $mainContent.load(serverPath.getPath() + "/views/aircraft/add-aircraft-type.html");
    };




    //配置路由表
    var routes = {
        '/user/personalCalendar': userCalendar,
        '/airport/airChart' : queryAirChart,
        '/airport/addAirport' : addAirport,
        '/airport/airportInfo' : airportInfo,
        '/user/profile' : userProfile,
        '/weather/airportWeather' : airportWeather,
        '/weather/airRouteWeather' : airRouteWeather,
        '/aircraft/aircraftTypeList' : aircraftTypeList,
        '/aircraft/addAircraftType' : addAircraftType
    };


    //初始化系统路由
    var routeInit = function () {
        var router = Router(routes);
        router.init();
    };






    return {

        initSystem : function () {
            routeInit();
        }
    }

}();