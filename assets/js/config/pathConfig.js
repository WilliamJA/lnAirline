/**
 * 定义路径配置
 * @author williamJM
 * date 2018/04/16 11:11
 */

'use strict';

define([],function() {

    //后台路径
    var backstagePath = {
        port : ':8080',
        protocol : 'http://',
        host : 'localhost',
        projectName : "SSM_lnAirlines",
        getPath : function () {
            return this.protocol + this.host + this.port  + "/" + this.projectName;
        },
        getUploadPath : function () {
            return this.getPath() + "/upload"
        }
    };

    //前台路径
    var frontDesk = {
        port : ':8080',
        protocol : 'http://',
        host : 'localhost',
        projectName : "lnAirline",
        getPath : function () {
            return this.protocol + this.host + this.port  + "/" + this.projectName;
        }
    };

    return {
        backstagePath : backstagePath,
        frontDesk : frontDesk
    }

});




