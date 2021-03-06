  layui.config({
     base: CXL.ctxPath + '/layuiadmin/' //静态资源所在路径
  }).extend({
    index: 'lib/index' //主入口模块
  }).use(['index', 'form'], function(){
	  var form = layui.form;
	  var admin = layui.admin;
	  var $ = layui.$;
	  //监听提交
	  form.on('submit(form-btn-save)', function(data){
		  var field = data.field; //获取提交的字段
		  //修改开关的值on或""
          if(field.status == "on") {
        	  field.status = "1";
          } else {
        	  field.status = "0";
          }
		  
	      var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
	      
	      //提交 Ajax 成功后，关闭当前弹层并重载表格
	      $.ajax({
	             type: "post",
	             url: CXL.ctxPath + '/sys/user/save',
	             data: field,
	             success: function(res) {
		    		 if(res.success) {
		    			 CXL.success(res.msg);
		    			 parent.layui.table.reload('sys-user-table'); //重载表格
		    		     parent.layer.close(index); //再执行关闭 
		    		 }else {
		    			 CXL.warn(res.msg);
		    		 }
		    	 }
	         });
	      
	     
     
	  });
	    
	    
  })