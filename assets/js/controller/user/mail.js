/**
 * 消息盒子
 * @author williamJM
 * date 2018/05/02 10:25
 */

"use strict";

define(["app","config/pathConfig","wangEditor","layer"],function (app,pathConfig,Editor,layer) {
    app.registerController("ctrl.user.mail",function ($scope,$http) {

        $scope.mail = {
            subject : "",
            recipient : ""
        };

        var wait = layer.msg("加载中，请稍后", {
            icon: 16
            ,shade: 0.2
        });
        //获取用户邮件列表
        $http.get(pathConfig.backstagePath.getPath() + "/user/mail")
            .then(function success(response) {
                $scope.mailList = response.data.data;
                layer.close(wait);
            });

        var editor = new Editor("#editor");
        editor.create();

        var submit = function (data) {
            return new Promise(function (resolve,reject) {
                $http.post(pathConfig.backstagePath.getPath() + "/user/mail",data)
                    .then(function successCallback(response) {
                        resolve(response.data);
                    })
            })
        };

        //发送邮件
        $scope.send = function () {
            var data = {
                recipientMailAccount : $scope.mail.recipient,
                mail : {
                    subject : $scope.mail.subject,
                    content : editor.txt.html()
                }
            };
            var loading = layer.msg("邮件发送中...", {
                icon: 16,
                shade: 0.6
            });
            submit(data).then(function (response) {
                if(response.status === 200) {
                    layer.close(loading);
                    layer.msg('保存成功！', {icon: 1,time:1500});
                } else if(response.status === 500) {
                    layer.close(loading);
                    layer.msg("服务器错误,保存失败！", {icon: 2,time:1500});
                }
            })
        };

        //查看邮件详情
        $scope.open = function (mail) {
            localStorage.setItem("currentMail",JSON.stringify(mail));
            var index = layer.open({
                type: 2,
                closeBtn : "1",
                shade : 0,
                title : "当前邮件",
                move : false,
                cancel : function () {
                    localStorage.removeItem("currentMail");
                },
                content: "views/user/mail-open.html"
            });
            layer.full(index);
        }


    })
});


