/**
 * Base KYER
 * @type {{}}
 */
var KYER = KYER || {};

KYER.redirect = function(href) {
  window.location.href = href;
}

KYER.login = function() {
  KYER.redirect("/login?redirect=" + window.location.href);
}

/**
 * 关注和取消关注
 */
$(function () {

  var followEl = {
    loginUser: $("meta[property='ht:user']").attr('content'),
    dataFollow: $("[data-follow='follow']"),
    follow: $("#follow"),
    star: $("#star")
  }

  if(followEl.follow) {
    followEl.follow.click(function() {
      // 判断用户是否登录
      if (!followEl.loginUser) {
        KYER.login();
      } else {
        var href = followEl.follow.attr("data-href");
        var star = followEl.star.text();
        var num = new Number(star);

        if (followEl.follow.text().trim() == "关注") { // 添加关注
          $.post(href, function(data) {
            followEl.follow.text("取消关注");
            followEl.follow.attr("data-href", href.replace("/follow", "/unfollow"));
            followEl.star.text(++num);
          });
        } else { // 取消关注
          $.post(href, function(data) {
            followEl.follow.text("关注");
            followEl.follow.attr("data-href", href.replace("/unfollow", "/follow"));
            followEl.star.text(--num);
          });
        }
      }
    });
  }

  if(followEl.dataFollow) { // 遍历
    followEl.dataFollow.each(function() {
      var follow = $(this);
      follow.click(function() {
        // 判断用户是否登录
        if (!followEl.loginUser) {
          KYER.login();
        } else {
          var href = follow.attr("data-href");
          var star = follow.parent().find("[data-follow='star']");
          var num = new Number(star.text());

          if (follow.text().trim() == "关注") { // 添加关注
            $.post(href, function(data) {
              follow.attr("data-href", href.replace("/follow", "/unfollow")).text("取消关注");
              star.text(++num);
            });
          } else { // 取消关注
            $.post(href, function(data) {
              follow.attr("data-href", href.replace("/unfollow", "/follow")).text("关注");
              star.text(--num);
            });
          }
        }
      });
    });
  }
});

