

"use strict";

$(document).ready(function () {
    var $account = $("input[name='username']");
    var $password = $("input[name='password']");
    var $submitBtn = $("#submit");
    var $accountMsg = $(".accountMsg");
    var $passwordMsg = $(".passwordMsg");

    var validate = function () {

        if($.trim($account.val()) === "") {
            $accountMsg.empty().append("<label class='help-inline help-small no-left-padding'>账户名不能为空</label>");
            return false;
        }
        if($.trim($password.val()) === "") {
            $passwordMsg.empty().append("<label class='help-inline help-small no-left-padding'>密码不能为空</label>");
            return false;
        }
        return true;
    };

    var login = function (data) {
		$.ajax({
			url : "http://localhost:8080/SSM_lnAirlines/user/login.do",
			type : "post",
			data : data,
			success : function (response) {
				if(response.status === 200) {
				    sessionStorage.setItem("currentUserInfo",JSON.stringify(response.data));
					window.location.href = "../../../views/temp/index.html";
				} else {
                    $passwordMsg.empty().append("<label class='help-inline help-small no-left-padding'>"+response.message+ "</label>");
				}

            }
		});

    };

    $submitBtn.on("click",function () {
		if(validate()) {
			var data = "account=" + $account.val() + "&password=" + $password.val();
			login(data);
		}
    });

    $(document).on("keypress",function (e) {
        if(e.keyCode === 13) {
            $submitBtn.trigger("click");
        }
    });

    $account.change(function () {
		if($(this).val() !== "") {
            $accountMsg.empty();
		}
    });

    $password.change(function () {
        if($(this).val() !== "") {
            $passwordMsg.empty();
        }
    })

});