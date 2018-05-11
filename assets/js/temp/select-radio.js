var SelectRadio = function () {

    var radios = $(".radio");

    var select = function () {
        radios.on("click", function () {
            radios.find("span").removeClass("checked");
            radios.find(":radio").removeAttr("checked");
            $(this).find("span").addClass("checked").find("input").attr("checked","checked");
        });
    };

    return {
        init : function () {
            select();
        }
    }

}();