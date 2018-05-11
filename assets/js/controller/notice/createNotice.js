/**
 * 发布公告
 * @author williamJM
 * date 2018/05/07
 */

"use strict";

define([
    "app",
    "config/pathConfig",
    "wangEditor",
    "jquery-fileupload",
    "layer",
    "fileuploadUi",
    "fileupload-image"
],function (app,pathConfig,Editor,fileupload,layer) {
    app.registerController("ctrl.notice", function ($scope, $http) {

        $scope.type = "-1";

        //创建文本编辑器
        var editor = new Editor("#editor");
        editor.create();

        //获取公告类型
        $http.get(pathConfig.backstagePath.getPath() + "/notice/type")
            .then(function successCallback(response) {
                $scope.types = response.data.data;
            });

        //提交
        var submit = function (data) {
            return new Promise(function (resolve,reject) {
                $http.post(pathConfig.backstagePath.getPath() + "/notice",data)
                    .then(function successCallback(response) {
                        resolve(response.data);
                    })
            })
        };

        $scope.save = function () {
            layer.confirm('确定要保存当前的航班计划吗？', {
                icon: 3,
                title:'保存提示',
                btn: ['确定','取消']
            }, function () {
                var loading = layer.msg('请稍后...', {icon: 16,shade: 0.4});
                var data = {
                    title : $scope.title,
                    type : $scope.type,
                    content : editor.txt.html()
                };
                submit(data).then(function (response) {
                    if(response.status === 200) {
                        layer.close(loading);
                        layer.msg("保存成功！", {icon: 1,time:1500});
                    }else if(response.status === 500) {
                        layer.close(loading);
                        layer.msg("服务器错误,保存失败！", {icon: 2,time:1500});
                    }
                })
                //upload(data);
            });
        };


        var upload = function (data) {
            $("#fileupload").fileupload({
                url: pathConfig.backstagePath.getPath() + "/notice",
                dataType : "json",
                data : data,
                type : "post",
                /*headers : {
                    "Content-type" : "application/json;charset"
                }*/
                fail: function(e, data) {
                    layer.msg("文件上传失败！", {icon: 2,time:1500});
                },
                add: function (e, data) {
                    data.submit();
                },
                done: function (e, data) {
                    $.each(data.result.files, function (index, file) {
                        $('<p/>').text(file.name).appendTo(document.body);
                    });
                }
            });
        }







    });
});



