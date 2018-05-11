/**
 * 飞机列表
 * @author williamJM
 * date 2018/04/17 19:45
 */

"use strict";

define(['app',"config/pathConfig"],function(app,pathConfig){
    app.registerController('ctrl.aircraftList',function($scope,$http){

        //获取所有飞机数据
        $http.get(pathConfig.backstagePath.getPath() + "/aircraft").then(function successCallback(response) {
                $scope.aircraftList = response.data.data;
            });


       /* var fnFormatDetails = function(oTable, nTr) {
            var aData = oTable.fnGetData(nTr);
            var sOut = '<table>';
            sOut += '<tr><td>Platform(s):</td><td>'+aData[2]+'</td></tr>';
            sOut += '<tr><td>Engine version:</td><td>'+aData[3]+'</td></tr>';
            sOut += '<tr><td>CSS grade:</td><td>'+aData[4]+'</td></tr>';
            sOut += '<tr><td>Others:</td><td>Could provide a link here</td></tr>';
            sOut += '</table>';
            return sOut;
        };

        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

        $('#aircraft-type-list thead tr').each( function () {
            this.insertBefore( nCloneTh, this.childNodes[0] );
        });

        $('#aircraft-type-list tbody tr').each( function () {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0] );
        });

        var oTable = $('#aircraft-type-list').dataTable( {
            "aoColumnDefs": [
                {"bSortable": false, "aTargets": [0] }
            ],
            "ordering": false,
            "aLengthMenu": [
                [10,15, 20,-1],
                [10,15, 20,"全部"]
            ],
            "paging": true,
            "oLanguage": { // 国际化配置
                "sProcessing": "正在获取数据，请稍后...",
                "sLengthMenu": "显示 _MENU_ 条",
                "sZeroRecords": "没有找到数据",
                "sInfo": "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
                "sInfoEmpty": "记录数为0",
                "sInfoFiltered": "(全部记录数 _MAX_ 条)",
                "sInfoPostFix": "",
                "sSearch": "查询",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "第一页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "最后一页"
                }
            },
            data : $scope.aircraftList,
            columns : {
                "data" : "aircraftType",
                "data" :"engine"
            }
        });

        $('#aircraft-type-list').on('click', 'tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
            if (oTable.fnIsOpen(nTr)) {
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose( nTr );
            } else {
                $(this).addClass("row-details-open").removeClass("row-details-close");
                oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr), 'details' );
            }
        });*/



    });
});
