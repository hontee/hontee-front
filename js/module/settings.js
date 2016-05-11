/**
 * Created by larry.qi on 2016-05-11.
 */
$(function() {

    var form = $("#form");

    // 验证
    form.validator({
        fields: {
            'title': 'required;length(2~32)',
            'description': 'required'
        }
    });

    // 提交
    form.on('valid.form', function(e) {
        $.post("settings", form.serialize(), function(data) {
            var r = $.parseJSON(data);
            if (r.success) {
                window.location.href = "dashbord";
            } else {
                alert(r.error.message);
            }
        });
    });
});
