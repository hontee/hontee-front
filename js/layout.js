$(function () {

  var $wndw = $(window),
    $body = $('body'),
    $both = $('body, html'),
    $mmenu = $("#mmenu");

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  //	Auto submenu
  var sections = [];
  var submenu = '';
  $('.submenutext').each(function (i) {
      var $h = $(this).parent(),
      id = $h.attr('id') || 'h' + i;

      $h.attr('id', id);

      sections.push('#' + id);
      submenu += '<li><a href="#' + id + '">' + $(this).text().capitalize() + '</a></li>';
    }
  );

  if (submenu.length) {
    sections = sections.reverse();

    var $submenu = $('<div class="submenu"><div><ul>' + submenu + '</ul></div></div>').insertAfter('h1');

    var $subfixed = $submenu.clone().addClass('fixed Fixed').insertAfter($submenu);

    var fixed = false, start = $submenu.offset().top;

    $submenu.add($subfixed).find('a').on('click', function (e) {
      e.preventDefault();
      $both.animate({
        scrollTop: $($(this).attr('href')).offset().top - 120
      });
    });

    $wndw.on('scroll.submenu', function (e) {
      var offset = $wndw.scrollTop();
      if (fixed) {
        if (offset < start) {
          $body.removeClass('fixedsubmenu');
          fixed = false;
        }
      } else {
        if (offset >= start) {
          $body.addClass('fixedsubmenu');
          fixed = true;
        }
      }
    });

    var _selected = -1;
    var $subitems = $submenu.add($subfixed).find('li');

    $wndw.on('scroll.submenu',function (e) {
      var offset = $wndw.scrollTop();
      for (var s = 0; s < sections.length; s++) {
        if ($(sections[s]).offset().top < offset + 160) {
          if (_selected !== s) {
            _selected = s;
            $subitems
              .removeClass('selected')
              .find('[href="' + sections[s] + '"]')
              .parent()
              .addClass('selected');
          }
          break;
        }
      }
    });

    $wndw.trigger('scroll.submenu');
  }

  //	The menu
  if ($.fn.mmenu) {
    var API = $mmenu.mmenu({
      extensions: ['widescreen'],
      counters: true,
      dividers: {
        fixed: true
      },
      navbar: {
        title: '<a href="/">快吧分类</a>'
      },
      navbars: [{
        position: 'top'
      }]
    })
    .data('mmenu');
  }

  // 关注点击
  var followEl = {
    follows: $("[data-follow='follow']"),
    follow: $("#follow"),
    star: $("#star")
  }

  if(followEl.follow) {
    followEl.follow.click(function() {
      // 判断用户是否登录
      if (1==1) {
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
      } else {
        alert("请登录...");
      }
    });
  }

  if(followEl.follows) { // 遍历
    followEl.follows.each(function(i) {
      var follow = $(this);
      follow.click(function() {
        // 判断用户是否登录
        if (1==1) {
          var href = follow.attr("data-href");
          var star = follow.parent().find("[data-follow='star']");
          var num = new Number(star.text());

          if (follow.text().trim() == "关注") { // 添加关注
            $.post(href, function(data) {
              follow.text("取消关注");
              follow.attr("data-href", href.replace("/follow", "/unfollow"));
              star.text(++num);
            });
          } else { // 取消关注
            $.post(href, function(data) {
              follow.text("关注");
              follow.attr("data-href", href.replace("/unfollow", "/follow"));
              star.text(--num);
            });
          }
        } else {
          alert("请登录...")
        }
      });
    });
  }
});

