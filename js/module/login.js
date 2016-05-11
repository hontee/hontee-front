/**
 * Created by larry.qi on 2016-05-11.
 */
$(function() {

    var form = $("#form");

    // 验证
    form.validator({
        fields: {
            'username': 'required;length(2~32)',
            'password': 'required;length(6~16)'
        }
    });

    // 提交
    form.on('valid.form', function(e) {
        $.post("/login", form.serialize(), function(data) {
            var r = $.parseJSON(data);
            if (r.success) {
                KYER.redirect(r.result);
            } else {
                alert(r.error.message);
            }
        });
    });
});
