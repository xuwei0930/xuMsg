/*
* Name:xuMsg0.1
* Author xuwei
* Email xuwei0930@gmail.com
* Date: 2012-12-13
* 简单的提示框插件
*API==================
* w:420,//宽度
* mask    :true,    //遮罩		false无遮罩|true遮罩
* opacity :0.6,     //遮罩透明度	设置透明度 0~1
* header  :true,    //头部		xuMsg头部  true|false
* title   :"xuMsg", //标题文字	此项需要header设置true
* callBack:false,	//			关闭按钮   回调函数  //需要绑定直接写事件
* text	  :true,		//			提示文本
* value	  :"欢迎使用xuMsg",			此项需要提示text设置true
* okBtn   :false,	//			确定按钮 //需要绑定事件直接写事件否则为为true
* okText  :			//确定按钮文本默认Content
* noBtn   :false	//			取消按钮 //需要绑定事件直接写事件否则为为true
* noText  :			//取消按钮文本默认Cansel
*/

(function($){
    $.fn.xuMsg = function(options){
        var defaults = {
            w       :420,//宽度
			mask    :true,//遮罩
			opacity :0.6,//遮罩透明度
			header  :true,//头部
			title   :"xuMsg",//标题文字
			callBack:false,
			text	:true,
			value	:"This is xuMsg",
			okBtn   :false,
			okText	:"Submit",
			noBtn   :false,
			noText	:"Cancel",
        };
        var options = $.extend(defaults, options);
		if($('.xuMsg').length>0){return false;}
		var $box =$("<div>").css({
				 'left'		: $(document.body).outerWidth(true)/2,
				 'marginLeft': options.w/2-options.w,
				 'opacity':0.1,
				 'filter':'alpha(opacity=10)',
				 'width'    : options.w
			})
			.addClass("xuMsg");
			if(options.header==true){
				$box.append('<div class="xuMsg-head"><span class="xuMsgClose">&times;</span><h2>'+options.title+'</h2><span style="clear:both;"></span></div>');
			}
			if(options.text==true){
				$box.append('<div class="xuMsg-content">'+options.value+'</div>');
			}
			if(options.okBtn!=false && options.noBtn==false){
				$box.append('<div class="xuMsg-foot"><span class="okBtn">'+options.okText+'</span></div>');
			}else if(options.okBtn==false && options.noBtn!=false){
				$box.append('<div class="xuMsg-foot"><span class="noBtn">'+options.noText+'</span></div>');	
			}else if(options.okBtn!=false && options.noBtn!=false){
				$box.append('<div class="xuMsg-foot"><span class="noBtn">'+options.noText+'</span><span class="okBtn">'+options.okText+'</span></div>');	
			}
			$box.appendTo('body').animate({'top':($(window).height()/2)-($box.height()/2)+50,'opacity':0.9},200).delay(50).animate({'top':($(window).height()/2)-($box.height()/2),'opacity':1},250);
			/*绑定事件*/
			$('.xuMsgClose').live("click",function(){//关闭窗口
				closexuMag($(this));
				if(options.callBack!=false){//绑定函数
					options.callBack.call(options.callBack);
					options.callBack.close();
				};
			});
			$('.okBtn').live("click",function(){//确定按钮
				closexuMag($(this));
				if(options.okBtn!=true){//绑定函数
					options.okBtn.call(options.okBtn);
					options.okBtn.close();
				};
			});
			$('.noBtn').live("click",function(){//取消按钮
				closexuMag($(this));
				if(options.noBtn!=true){//绑定函数
					options.noBtn.call(options.noBtn);
					options.noBtn.close();
				};
			});
			function closexuMag(obj){//关闭窗口调用函数
				obj.parents(".xuMsg").animate({'top':($(window).height()/2)-($box.height()/2)+50,'opacity':0.9},200).delay(50).animate({'top':0,'opacity':0.1},250,function(){$(this).remove();});
				$(".mask").fadeOut(300);
				$('.okBtn').unbind("click");//移除函数
				$('.noBtn').unbind("click");//移除函数
				$('.xuMsgClose').unbind("click");//移除函数
				}
		if (options.mask==true){
			var $mask = $("<div>").css({'opacity':options.opacity})
			.addClass("mask")
			.appendTo('body')
			.fadeIn(300);
		}
    };
})(jQuery);
