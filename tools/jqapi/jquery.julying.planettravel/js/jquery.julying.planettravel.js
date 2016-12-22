/**
 * jQuery planet Travel Plug-in v1.0
 *
 * Home : http://julying.com/
 * Mail : i@julying.com
 * created : 2012-06-10 23:00:00
 * Address : China beijing
 *
 * Copyright 2012 | julying.com
 * MIT、GPL2、GNU.
 * http://julying.com/code/license
 *
 ***************************
  注意：此插件我开发之后，并没有发布，请勿盗版哦。
 */
;(function($){
	/*飞行动画，先慢后快*/
	$.extend( jQuery.easing ,{
		starFly: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		}
	});
	
	$.fn.julying_planetTravel = function( option ){
		var $obj = $(this);
		var opts = $.extend({},$.fn.julying_planetTravel.defaults,option);		
		var viewSize ,maxWidth ,maxHeight  ;			
		checkSize();
		
		$obj.addClass( opts.bgCss[ rand(0,opts.bgCss.length - 1 )] );
		$(window).resize(function(e){
           checkSize(); 
        }).scroll(function(){
			checkSize();
		});
		flash();
		fly() ;
		setInterval(function(){
			fly();
		}, opts.flyMakeStarTime );		
		//CollectGarbage();
		return $obj ;
		
		function checkSize(){
			viewSize = getViewSize();
			maxWidth = viewSize[0];
			maxHeight = viewSize[1];
		};	
		
		function flash(){
			var docHeight = getViewSize()[1];
			var scale , imageIndex , html = '' , widh  , height , leftArea , imageIndex ;
			var starsArea = maxWidth * 0.2 * 2 *  docHeight ;
			var starsNum = starsArea / ( 100 * 100 ) * opts.flashStarDensity ;
			
			var imagesNum = opts.flashStarImage.length ;
			for(var i=0 ; i < starsNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;				
				scale = opts.flashStarImage[imageIndex][1] / opts.flashStarImage[imageIndex][2] ;
				widh 	= rand( opts.flashStarImage[imageIndex][1] * 0.2 , opts.flashStarImage[imageIndex][2] );
				/*等比例缩放*/ 
				leftArea  = Array( rand( 10, maxWidth * 0.2 ) , rand( maxWidth * 0.8 , maxWidth - widh - 20 )) ;
				height = widh / scale;
				html += '<img src="'+ opts.flashStarImage[imageIndex][0] +'" style="width:'+ widh +'px;height:'+ height +'px;left:'+ leftArea[ rand( 0 ,leftArea.length - 1) ] +'px;top:'+ rand(10,docHeight - 30)  +'px;" class="planetTravelFlash png" name="planetTravelFlash" />';
			}
			$obj.append(html);
			/*IE8及以下版本不闪烁(IE8 一下改变透明度有严重bug)*/
			if( !( $.browser.msie && $.browser.version < 9)  ){
				$obj.append(html).find('img[name=planetTravelFlash]').each(function(){
					glint($(this));
				});
			}
			function glint($star){
				$star.animate({ opacity : rand(2,10) * 0.1 } , rand( 100, 500 ),function(){
					setTimeout(function(){
						glint($star);
					},rand(100,300));
				});
			}
		}
		
		function fly(){
			var html = '' , imageIndex , xPos;
			var imagesNum = opts.flyStarImage.length ;
			for(var i=0 ; i < opts.flyMakestarNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;
				xPos = [ - opts.flyStarImage[imageIndex][1] , maxWidth - opts.flyStarImage[imageIndex][1] - 20  ];			
				html += '<img src="'+ opts.flyStarImage[imageIndex][0] +'" status="start" index="'+imageIndex+'" xpos="'+ xPos.join(',') +'" class="planetTravelFly" style="left:'+ (maxWidth * 0.5) +'px;top:'+ (maxHeight * 0.35) +'px;"/>';
			}
			$obj.append(html).find('img[status=start]').each(function(){
				html = null ;
				var $this = $(this);
				var index = $this.attr('index');
				xPos = $this.attr('xpos').split(',');
				$this.attr('status','run').css({opacity : rand(opts.flyStartBright[0] * 10 , opts.flyStartBright[1] * 10 ) * 0.1 }).animate({
					top: 	rand( - Math.max( 200 , maxHeight * 0.2 ) , maxHeight - 10 ) ,
					left:	xPos[rand(0,1)] ,
					width: 	rand(opts.flyStarImage[index][1] / 4 ,opts.flyStarImage[index][1]),
					height: rand( opts.flyStarImage[index][2] / 4 , opts.flyStarImage[index][2] )
				} , rand( opts.flyDuration * 0.5 , opts.flyDuration * 4 ) , 'starFly' ,function(){
					$this.remove();
				});
			});
		}
	};
	$.fn.julying_planetTravel.defaults = {
		bgCss				: ['planetTravelBg_1' ,'planetTravelBg_2' ,'planetTravelBg_3' ],
		flyStarImage		: [ ['images/star-fly-1.png' , 23 ,23 ] ],/*星星图片地址.地址，宽度，高度*/	
		flyStartBright	 	: Array( 0.6 , 1 ) ,  /*star 亮度范围*/ 
		flyDuration			: 10000 , /*星星飞行的时间,单位 ms 。（决定星星飞行速度的快慢）*/
		flyMakeStarTime		: 5000 , /*制造star时间间隔,单位 ms.*/
		flyMakestarNum		: 2 ,  /*每次产生多少个star,单位 ms.*/
		
		flashStarImage		: [ ['images/star-flash-1.png' , 30 ,27 ] , [ 'images/star-flash-2.png' , 40 ,40 ], [ 'images/star-flash-2.png' , 40 ,40 ] ],/*星星图片地址 。地址，宽度，高度  */
		flashStarDensity	: 0.3 /* 闪烁星星的密度。 单位：个。即 每100平方像素 面积内 闪烁星星的平均数量（即：100px * 100px 面积内）*/
	};
})(jQuery);