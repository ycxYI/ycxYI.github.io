/***
 * ����Jquery��������
 * ��дʱ�䣺2012��7��21��
 * version:manhuaDialog.1.0.js
***/
$(function() {
	$.fn.manhuaDialog = function(options) {
		var defaults = {
			Event : "click",								//������Ӧ�¼�
			title : "title",								//������ı���
			type : "text",									//����������(text������ID��URL��Iframe)
			content : "content",							//�����������(text�ı�������ID���ơ�URL��ַ��Iframe�ĵ�ַ)
			width : 500,									//������Ŀ��
			height : 400,									//������ĸ߶�
			scrollTop : 200,								//�㻬���ĸ߶�Ҳ���ǵ�����ʱ�붥�������ľ���
			isAuto : false,									//�Ƿ��Զ�����
			time : 2000,									//�����Զ�������ʱ�䣬ǰ����isAuto=true
			isClose : false,  								//�Ƿ��Զ��ر�		
			timeOut : 2000									//�����Զ��ر�ʱ�䣬ǰ����isClose=true
			
		};
		var options = $.extend(defaults,options);
		
		$("body").prepend("<div id='floatBoxBg'></div><div id='floatBox' class='floatBox'><div class='title'><h4></h4><span id='closeDialog'>X</span></div><div class='content'></div></div>");
		var $this = $(this);								//��Ȼ��Ӧ�¼�����
		var $blank = $("#floatBoxBg");						//���ֲ����
		var $title = $("#floatBox .title h4");				//������������
		var $content = $("#floatBox .content");				//���������ݶ���
		var $dialog = $("#floatBox");						//���������
		var $close = $("#closeDialog");						//�رղ㰴ť����
		var stc,st;
		$close.live("click",function(){
			$blank.animate({opacity:"0"},"normal",function(){$(this).hide();});
  			$dialog.animate({top:($(document).scrollTop()-parseInt(options.height))+"px"},"normal",function(){$(this).hide();});
			if(st){
				clearTimeout(st);//�����ʱ��
			}
			if(stc){
				clearTimeout(stc);//�����ʱ��
			}
		});		
		$content.css("height",parseInt(options.height)-70);
		//�ı�����¼�
		$this.live(options.Event,function(e){	
			$title.html(options.title);
			switch(options.type){
				case "url":									//�������ǵ�ַ��ʱ��					
					$content.ajaxStart(function(){
						$(this).html("loading...");
					});
					$.get(options.content,function(html){
						$content.html(html);						
					});
					break;
				case "text":								//���������ı���ʱ��
					$content.html(options.content);
					break;
				case "id":									//������������ID��ʱ��
					$content.html($("#"+options.content+"").html());
					break;
				case "iframe":								//��������Iframe��ʱ��
					$content.html("<iframe src=\""+options.content+"\" width=\"100%\" height=\""+(parseInt(options.height)-70)+"px"+"\" scrolling=\"auto\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>");
					break;
				default:									//Ĭ������µ�ʱ��
					$content.html(options.content);
					break;
			}
			
			$blank.show();
			$blank.animate({opacity:"0.5"},"normal");		
			$dialog.css({display:"block",left:(($(document).width())/2-(parseInt(options.width)/2))+"px",top:($(document).scrollTop()-parseInt(options.height))+"px",width:options.width,height:options.height});
			$dialog.animate({top:($(document).scrollTop()+options.scrollTop)+"px"},"normal");
			if (options.isClose){
				stc = setTimeout(function (){			
					$close.trigger("click");
					clearTimeout(stc);
				},options.timeOut);	
			}
			
		});	
		if (options.isAuto){
			st = setTimeout(function (){			
				$this.trigger(options.Event);
				clearTimeout(st);
			},options.time);	
		}
	}
});