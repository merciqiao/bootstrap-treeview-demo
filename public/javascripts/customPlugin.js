/** 
* customPlugin.js 自定义插件 
* des:需要引用bootstrap和jquery 
*/
; (function ($) {
    $.fn.extend({
        /**
        *渲染左侧导航菜单
        */
        renderLeftMenu: function (options) {
            //var json = [{ "state": { "checked": false }, "nodes": [{ "state": { "checked": false }, "nodes": [{ "state": { "checked": false }, "nodes": [], "id": "4", "text": "添加申请单" }, { "state": { "checked": false }, "nodes": [], "id": "7", "text": "扫描件上传" }, { "state": { "checked": false }, "nodes": [], "id": "8", "text": "申请单列表" }, { "state": { "checked": false }, "nodes": [], "id": "9", "text": "质检回退列表" }], "id": "3", "text": "录单管理" }, { "state": { "checked": false }, "nodes": [{ "state": { "checked": false }, "nodes": [], "id": "10", "text": "待质检申请列表" }, { "state": { "checked": false }, "nodes": [], "id": "11", "text": "待签约申请单列表" }, { "state": { "checked": false }, "nodes": [], "id": "12", "text": "已质检申请单列表" }], "id": "5", "text": "订单管理" }, { "state": { "checked": false }, "nodes": [{ "state": { "checked": false }, "nodes": [], "id": "13", "text": "运营审核列表" }, { "state": { "checked": false }, "nodes": [{ "state": { "checked": false }, "nodes": [], "id": "21", "text": "添加" }], "id": "14", "text": "运营审核历史列表" }], "id": "6", "text": "合同管理" }], "id": "2", "text": "根权限目录" }];
            var defaults = {
                data: [],
                onSuccess: function () { }//成功后执行
            }
            var opts = $.extend({}, defaults, options);
            var $this = $(this);
            $this.html('');
            bindData();
            opts.onSuccess();
            return $this;

            //绑定数据
            function bindData() {

                var json = opts.data;
                if (json && json.length) {
                    $this.html('');
                    $.each(json, function (i, item) {
                        RenderFirstMenu(json[0].nodes);
                    });
                }
                //渲染LevType=1的一级菜单
                function RenderFirstMenu(json) {
                    $.each(json, function (i, item) {
                        item.id = "menu_" + item.id;//防止id冲突
                        item.ParentID = "menu_" + item.ParentID;
                        var $menu = $('<li id="' + item.id + '" parentid="' + item.ParentID + '" class="treeview">'
                                        + '<a href="' + item.Url + '"><i class="' + item.ImgUrl + '"></i><span>' + item.text + '</span></a>'
                                        + '</li>'
                                     );
                        if (item.nodes.length > 0) {
                            RenderSecondMenu(item.nodes, $menu);
                        }
                        $this.append($menu);
                    });
                }
                //渲染LevType=2的二级菜单
                function RenderSecondMenu(json, $parentMenu) {
                    var $ul = $('<ul class="treeview-menu"></ul>');
                    $.each(json, function (i, item) {
                        item.id = "menu_" + item.id;//防止id冲突
                        item.ParentID = "menu_" + item.ParentID;
                        var $menu = $('<li id="' + item.id + '" parentid="' + item.ParentID + '">'
                           + '<a href="' + item.Url + '">'
                                + '<i class="' + item.ImgUrl + '"></i>'
                                + '<span>' + item.text + '</span>'
                            + '</a>'
                        + '</li>');
                        $ul.append($menu);
                    });
                    $parentMenu.append($ul);
                }
            }

        },

    });

    $.extend({
        /**
       *dialog
       *des:提示框
       */
        showMsg: function (options) {
            var defaults = {
                text: '成功',
                title: '提示'
            }
            var opts = $.extend({}, defaults, options);
            BootstrapDialog.show({
                title: '提示',
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                message: opts.text,
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
        },
        /**
          *dialog
          *des:提示框
          */
        showMsgText:function(text)
        {
            $.showMsg({ text: text });
        }
    });
})(jQuery);