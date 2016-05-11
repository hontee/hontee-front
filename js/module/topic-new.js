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
        $.post("/topics/new", form.serialize(), function(data) {
            var r = $.parseJSON(data);
            if (r.success) {
                alert('已提交，请耐心等待审核！');
                window.location.href = "/";
            } else {
                alert(r.error.message);
            }
        });
    });
});
