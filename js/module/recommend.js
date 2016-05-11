/**
 * Created by larry.qi on 2016-05-11.
 */
$(function() {

    var form = $("#form");

    // 验证
    form.validator({
        rules: {
            url: [/^http(s)?:\/\//, "请填写有效的网址"],
        },
        fields: {
            'url': 'required;url'
        }
    });

    // 提交
    form.on('valid.form', function(e) {
        $.post("/recommend", form.serialize()).done(function(d) {
            var r = $.parseJSON(d);
            if (r.success) {
                window.location.href = "/";
            } else {
                alert(r.error.message);
            }
        });
    });

});
