/**
 * 用户个人信息
 * @author williamJM
 * date 2018/05/02 10:25
 */

"use strict";

define(["app","config/pathConfig","layer","Cropper"],function (app,pathConfig,layer,Cropper) {
    app.registerController("ctrl.user.profile",function ($scope,$http) {

        //获取用户登录的信息
        $scope.loginUserInfo = JSON.parse(sessionStorage.getItem("currentUserInfo"));
        $scope.loginUserInfo.pic = pathConfig.backstagePath.getUploadPath() + $scope.loginUserInfo.pic;


        var handleHobby = function (data) {
            return data.split(",").toString();
        };


        //保存用户信息
        var submitUserInfo = function(params) {
            return new Promise(function (resolve,reject) {
                $http.put(pathConfig.backstagePath.getPath() + "/user",params)
                    .then(function successCallback(response) {
                        resolve(response.data);
                    });
            })
        };

        //保存用户基本信息
        $scope.saveBaseInfo = function () {

            var userBaseInfo = {
                firstName : $scope.loginUserInfo.firstName,
                lastName : $scope.loginUserInfo.lastName,
                englishName : $scope.loginUserInfo.englishName,
                sex : $scope.loginUserInfo.sex
            };

            layer.confirm('确定要保存当前页面的信息吗？', {
                icon: 3,
                title:'保存提示',
                btn: ['确定','取消']
            }, function () {
                submitUserInfo(userBaseInfo).then(function (response) {
                    if(response.status === 200) {
                        layer.msg('保存成功！', {icon: 1,time:1500});
                    } else if(response.status === 500) {
                        layer.msg("服务器错误,保存失败！", {icon: 2,time:1500});
                    }
                });
            });
        };

        //保存用户详细信息
        $scope.saveDetailsInfo = function () {

            var userDetailsInfo = {
                phone :  $scope.loginUserInfo.phone,
                email :  $scope.loginUserInfo.email,
                hobby :  handleHobby ($scope.loginUserInfo.hobby),
                price :  $scope.loginUserInfo.price,
                personalProfile :  $scope.loginUserInfo.personalProfile,
                blog : $scope.loginUserInfo.blog
            };

            layer.confirm('确定要保存当前页面的信息吗？', {
                icon: 3,
                title:'保存提示',
                btn: ['确定','取消']
            }, function () {
                submitUserInfo(userDetailsInfo).then(function (response) {
                    if(response.status === 200) {
                        layer.msg('保存成功！', {icon: 1,time:1500});
                    } else if(response.status === 500) {
                        layer.msg("服务器错误,保存失败！", {icon: 2,time:1500});
                    }
                });
            });
        };


        //用户头像上传
        $scope.msg = "";
        var imgPosition = 0;
        var zoom = 0;
        var fileMaxSize = 1024*5;
        var image = document.getElementById("image");
        var view =  document.getElementsByClassName("col-md-3")[0];
        var file = document.getElementsByClassName("input-file")[0];

        var options = {
            width: 200,
            height: 200,
            minWidth: 256,
            minHeight: 256,
            maxWidth: 4096,
            maxHeight: 4096,
            fillColor: '#fff',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high'
        };

        var crop = new Cropper(image, {
            aspectRatio: 1 / 1, //裁剪比例
            viewMode : 1,  //裁剪范围
            preview : view,  //第二视图
            toggleDragModeOnDblclick : true,//当在裁剪器上单击两次时，是否可以在“裁剪”和“移动”之间切换拖动模式
            minCropBoxWidth : 80,  //裁剪框的最小宽度。
            minCropBoxHeight : 80  //裁剪框的最小高度。
        });

        function isImageFile(file) {
            if(file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif|svg)$/.test(file);
            }
        }

        file.addEventListener("change",function () {
            if (!isImageFile(this.files[0])) {
                $scope.msg = "请选择一个图像文件！";
            } else if(this.files[0].size / 1024 > fileMaxSize) {
                $scope.msg = "图片文件过大，请选择小于5M的图片！";
            } else {
                $scope.msg = this.files[0].name;
                var freader = new FileReader();
                freader.readAsDataURL(file.files[0]);
                freader.onload = function(e) {
                    image.src = e.target.result;
                    crop.replace(image.src);
                }
            }
        });


       $scope.aleft = function () {
           crop.rotate(imgPosition - 90);
       };

       $scope.aright = function () {
           crop.rotate(imgPosition + 90);
       };

       $scope.move = function () {
           crop.setDragMode("move");
       };

       $scope.zoomIn = function () {
           crop.zoom(zoom + 0.1);
       };

       $scope.zoomOut = function () {
           crop.zoom(zoom - 0.1);
       };

       $scope.reset = function () {
           crop.reset();
       };

       var upload = function (data) {
           return new Promise(function (resolve,reject) {
               $http({
                   url : pathConfig.backstagePath.getPath() + "/user/pic",
                   processData: false,
                   contentType : false,
                   cache : false,
                   data: data,
                   method: "POST",
                   headers : {
                       'Content-Type' : undefined
                   },
                   transformRequest : angular.identity
               }).then(function successCallback(response) {
                       resolve(response.data);
                   })
           })
       };

       $scope.uploadImg = function () {
           crop.getCroppedCanvas(options).toBlob(function (blob) {
               var formData = new FormData();
               formData.append('croppedImage', blob);
               upload(formData).then(function (response) {
                   if(response.status === 200) {
                       layer.msg('保存成功！', {icon: 1,time:1500});
                   } else if(response.status === 500) {
                       layer.msg("服务器错误,保存失败！", {icon: 2,time:1500});
                   }
               })
           });
       };

       var submitNewPsw = function (data) {
           return new Promise(function (resolve,reject) {
               $http.put(pathConfig.backstagePath.getPath() + "/user",data)
                   .then(function successCallback(response) {
                       resolve(response.data);
                   });
           })
       };

       //用户密码验证
        var validatePsw = function (callback) {
            $http.post(pathConfig.backstagePath.getPath() + "/user/password",$scope.oldPsw)
                .then(function success(response) {
                    callback(response.data);
                });
        };


       //修改密码
        $scope.updatePsw = function () {

            validatePsw(function (response) {
                if(response.data !== true) {
                    $scope.oldMsg = "原始密码输入错误，请重新输入！";
                    return;
                } else {
                    $scope.oldMsg = "";
                }
                if($scope.repeatPsw !== $scope.newPsw) {
                    $scope.repeatMsg = "两次密码不一致，请重新输入！";
                    return;
                } else {
                    $scope.repeatMsg = "";
                }

                var data = {
                    password : $scope.newPsw
                };
                submitNewPsw(data).then(function (response) {
                    if(response.status === 200) {
                        layer.msg('修改成功！', {icon: 1,time:1500});
                    } else if(response.status === 500) {
                        layer.msg("服务器错误,修改失败！", {icon: 2,time:1500});
                    }
                })
            });

        }




    })
});


