/**
 * 定义angularJS应用
 * @author willimJM
 * date 2018/04/18
 */

"use strict";

define([
    "app",
    "config/pathConfig"
], function (app,pathConfig) {
    app.config(["$stateProvider",'angularShiroConfigProvider',function ($stateProvider,config) {
        config.setFilter('/**/*','authc');
        config.setAuthenticateUrl(pathConfig.backstagePath.getPath() + "/user/login.do");
    }]);


    app.run(function($httpBackend, $rootScope, subject) {

        /*$httpBackend.whenGET('views/login.html').passThrough();
        $httpBackend.whenGET('partials/app.html').passThrough();*/

        $rootScope.subject = subject;

        var admin = "{\n"
            + "  \"info\": {\n"
            + "    \"authc\": {\n"
            + "      \"principal\": {\n"
            + "        \"name\": \"Edgar Degas\",\n"
            + "        \"login\": \"edegas\",\n"
            + "        \"email\": \"edegas@mail.com\"\n"
            + "      },\n"
            + "      \"credentials\": {\n"
            + "        \"name\": \"Edgar Degas\",\n"
            + "        \"login\": \"edegas\",\n"
            + "        \"email\": \"edegas@mail.com\"\n"
            + "      }\n"
            + "    },\n"
            + "    \"authz\": {\n"
            + "        \"roles\" : [\"ADMIN\"],\n"
            + "        \"permissions\" : [\"address:view,create,edit,delete\"]\n"
            + "    }\n" + "  }\n" + "}";

       /* $httpBackend.whenPOST(pathConfig.backstagePath.getPath() + "/user/login.do",'{"token":{"principal":"admin","credentials":"admin"}}')
            .respond(admin);*/


    })


});





