/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 */
Date.prototype.format = function () {
	var fmt = "yyyy-MM-dd HH:mm";
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * CMS
 */
var CMS = CMS || {};
CMS.msg = {
	info: "信息提示",
	error: "错误提示",
	addS: "添加成功",
	addF: "添加失败",
	editS: "更新成功",
	editF: "更新失败",
	removeS: "删除成功",
	removeF: "删除失败",
	delConfirm: "确定要删除吗？",
	cutS: "批量删除成功",
	cutF: "批量删除失败"
};

/**
 * 重新加载Datagrid
 */
CMS.reload = function($obj) {
	$obj.dg.datagrid('clearSelections'); // 清除所有选中行
    $obj.dg.datagrid('reload',{}); // 重新加载
}

CMS.showMsg = function($title, $msg) {
    $.messager.show({
    	title: $title,
    	msg: $msg,
    	showType:'show',
    	style:{
    		right:'',
    		top:document.body.scrollTop+document.documentElement.scrollTop,
    		bottom:''
    	}
    });
}

/**
 * 查看
 * @param data 成功返回的数据
 * @param $obj EL对象
 */
CMS.viewHandler = function(path) {
	if (homeTabs.tabs("exists", "查看")) {
		homeTabs.tabs('close', "查看");
	}
	homeTabs.tabs('add', {
      id: "view",
      title : "查看",
      index: 1,
      href: path,
      closable : true
    });
}

/**
 * 添加提交处理
 * @param data 成功返回的数据
 * @param $obj EL对象
 */
CMS.addSubmitHandler = function(data, $obj) {
  var r = $.parseJSON(data);
  if (r.success) {
	CMS.showMsg(CMS.msg.info, CMS.msg.addS);
    $obj.win.window('close'); // 关闭窗口
    CMS.reload($obj);
  } else {
    $.messager.alert(CMS.msg.error, r.error.message, "error");
  }
}

/**
 * 更新提交处理
 * @param data 成功返回的数据
 * @param $obj EL对象
 */
CMS.editSubmitHandler = function(data, $obj) {
  var r = $.parseJSON(data);
  if (r.success) {
    CMS.showMsg(CMS.msg.info, CMS.msg.editS);
    $obj.win.window('close'); // 关闭窗口
    CMS.reload($obj);
  } else {
    $.messager.alert(CMS.msg.error, r.error.message, "error");
  }
}

/**
 * 刪除提交處理
 * @param $obj EL对象
 * @param uri 请求名称 如:platforms
 */
CMS.removeSubmitHandler = function($obj, uri) {
  var row = $obj.dg.datagrid('getSelected');
  if (row) {
    $.messager.confirm(CMS.msg.info, CMS.msg.delConfirm, function(ok){
      if (ok){
        var url = '/cms/' + uri + '/'+row.id +'/delete';
        $.post(url, function(data) {
          var r = $.parseJSON(data);
          if (r.success) {
        	CMS.showMsg(CMS.msg.info, CMS.msg.editS);
            CMS.reload($obj);
          } else {
            $.messager.alert(CMS.msg.removeF, r.error.message, "error");
          }
        });
      } 
    });
  }
}

/**
 * 批量刪除
 * @param $obj EL對象
 * @param uri 请求名称 如:platforms
 */ 
CMS.batchDeleteSubmitHandler = function($obj, uri) {
  var rows = $obj.dg.datagrid('getSelections');
  if (rows.length > 0) {
    var ids = new Array(rows.length);
    for (var i = 0; i < rows.length; i++) {
      ids[i] = rows[i].id;
    }
	$.messager.confirm(CMS.msg.info, CMS.msg.delConfirm, function(ok){
      if (ok){
        var url = '/cms/' + uri + '/delete?ids=' + ids;
        $.post(url, function(data) {
          var r = $.parseJSON(data);
          if (r.success) {
        	CMS.showMsg(CMS.msg.info, CMS.msg.editS);
            CMS.reload($obj);
          } else {
            $.messager.alert(CMS.msg.removeF, r.error.message, "error");
          }
        });
      } 
    });
  }
}
/**
* 更新统计
* @param $obj EL对象
* @param uri 请求名称 如:platforms
*/
CMS.countSubmitHandler = function($obj, uri) {
   $.messager.confirm("信息提示", "预计完成统计需要花费几分钟的时间，确定继续？", function(ok){
     if (ok){
       var url = '/cms/' + uri + '/count/task';
       $.post(url, function(data) {
         var r = $.parseJSON(data);
         if (r.success) {
           CMS.showMsg("信息提示", "更新统计完成");
           CMS.reload($obj);
         } else {
           $.messager.alert("信息提示", "更新统计失败", "error");
         }
       });
     } 
   });
}
