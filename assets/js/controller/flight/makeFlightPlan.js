/**
 * 制作航班计划
 * @author williamJM
 * date 2018/04/17 19:45
 */

"use strict";

define(['app',"config/pathConfig","moment"],function(app,pathConfig,moment){
    app.registerController('ctrl.makeFlightPlan',function($scope,$http,airportComponent){

        airportComponent.initAirportAssembly($scope,$http,pathConfig);

    });
});
