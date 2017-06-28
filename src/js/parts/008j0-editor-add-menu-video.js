// video 菜单
_e(function (E, $) {

    E.createMenu(function (check) {
        var menuId = 'video';
        if (!check(menuId)) {
            return;
        }
        var editor = this;
        var lang = editor.config.lang;
        // var reg = /^<(iframe)|(embed)/i;  // <iframe... 或者 <embed... 格式

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,
            id: menuId,
            title: lang.video
        });

        // 创建 panel 内容
        var $content = $('<div></div>');
        var $linkInputContainer = $('<div style="margin:20px 10px;"></div>');
        var $linkInput = $('<input type="text" class="block" placeholder=\'视频链接\'/>');
        $linkInputContainer.append($linkInput);
        var $sizeContainer = $('<div style="margin:20px 10px;"></div>');
        var $widthInput = $('<input type="text" value="640" style="width:50px;text-align:center;"/>');
        var $heightInput = $('<input type="text" value="498" style="width:50px;text-align:center;"/>');
        $sizeContainer.append('<span> ' + lang.width + ' </span>')
                      .append($widthInput)
                      .append('<span> px &nbsp;&nbsp;&nbsp;</span>')
                      .append('<span> ' + lang.height + ' </span>')
                      .append($heightInput)
                      .append('<span> px </span>');
        var $btnContainer = $('<div></div>');
        var $howToCopy = $('');
        var $btnSubmit = $('<button class="right">' + lang.submit + '</button>');
        var $btnCancel = $('<button class="right gray">' + lang.cancel + '</button>');
        $btnContainer.append($howToCopy).append($btnSubmit).append($btnCancel);
        $content.append($linkInputContainer).append($sizeContainer).append($btnContainer);

        // 取消按钮
        $btnCancel.click(function (e) {
            e.preventDefault();
            $linkInput.val('');
            menu.dropPanel.hide();
        });

        // 确定按钮
        $btnSubmit.click(function (e) {
            e.preventDefault();
            var link = $('<video src="'+ $.trim($linkInput.val()) +'"/>');
            var $link;
            var width = parseInt($widthInput.val());
            var height = parseInt($heightInput.val());
            var $div = $('<div>');
            var html = '<p>{content}</p>';

            // 验证数据
            if (!link) {
                menu.dropPanel.focusFirstInput();
                return;
            }

            // if (!reg.test(link)) {
            //     alert('视频链接格式错误！');
            //     menu.dropPanel.focusFirstInput();
            //     return;
            // }

            if (isNaN(width) || isNaN(height)) {
                alert('宽度或高度不是数字！');
                return;
            }

            $link = $(link);

            // 设置高度和宽度
            $link.attr('width', width)
                 .attr('height', height);

            // 拼接字符串
            html = html.replace('{content}', $div.append($link).html());

            // 执行命令
            editor.command(e, 'insertHtml', html);
            $linkInput.val('');
        });

        // 创建panel
        menu.dropPanel = new E.DropPanel(editor, menu, {
            $content: $content,
            width: 400
        });

        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

});