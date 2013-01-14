/*!
 * jQuery左侧浮动折叠菜单 仿天猫
 * Copyright (c) 2013, 梦幻神化 
 * http://www.bluesdream.com
 *
 * Create: 2013.01.09
 * Version: 1.2
 * 
 * 请保留此信息，如果您有修改或意见可通过网站给我留言，也可以通过邮件形式联系本人。
 * Mail: hello@bluesdream.com
 */
(function($) {
	$(function(){
		var nav = $("#nav");
		var category = $(".category");
		var categoryHd = $(".categoryHd");
		var categoryBtn = categoryHd.find("i");
		var categoryBd = $(".categoryBd");
		var subCategory = $(".subCategory");
		var catItem = categoryBd.find(".item");
		var subView = subCategory.find(".subView");
		var s_space = 80; //滚动间距，每滚动多少时，折叠下一个菜单
		var isIE = !!window.ActiveXObject;
		var isIE6 = isIE&&!window.XMLHttpRequest;

		if (isIE) {
			$("body").prepend("<div class=\"browserTip\">亲~你肿么还在使用IE6？ 用它上网，不但安全性无法很好保障，还丢失了很多乐趣，为了您和家人的健康请抛弃他~</div>");
		};

		function cancelBubble(event) {
			event.stopPropagation();
		};

		catItem.mouseenter(function(){
			var i = catItem.index(this); //获得当前元素的位置(序列)
			var cur_c = catItem.eq(i);
			var cur_s = subView.eq(i);
			cur_c.addClass("selected").siblings().removeClass('selected');
			cur_s.removeClass('hide').siblings().addClass('hide');

			var subView_w = cur_s.outerWidth(true);
			var subView_h = cur_s.outerHeight(true);
			var subCat_t = catItem.eq(i).offset().top - categoryBd.offset().top + 20;
			var subCat_t2 = $(window).height() -  cur_s.outerHeight(true) - catItem.eq(i).outerHeight(true);
			var subCat_t3 = $(document).scrollTop() - catItem.eq(i).outerHeight(true);
			subCategory.css({'height':subView_h});
			if (!isIE6) {
				if ( subView_h+ subCat_t >= $(window).height() ) {
					if ( subCat_t2 < 0 ) {
						subCategory.stop(true,false).animate({'width':subView_w,'top':'20'},150);
					}else{
						subCategory.stop(true,false).animate({'width':subView_w,'top':subCat_t2},150);
					};
				}else{
					subCategory.stop(true,false).animate({'width':subView_w,'top':subCat_t},150);
				};
			}else{
				if( subCat_t3 > 0 && subCat_t3 + cur_s.outerHeight(true)>$(window).height() ){
					subCategory.stop(true,false).animate({'width':subView_w,'top':subCat_t3},150);
				}else{
					subCategory.stop(true,false).animate({'width':subView_w,'top':'20'},150);
				}
			};
		});
		function closeCat() {
			catItem.removeClass('selected');
			subCategory.stop(true,false).animate({'width':'0'},150);
		}
		categoryHd.mouseenter(function(){ closeCat() });
		category.mouseleave(function(){ closeCat() });

		$(".itemBottom").hover(function(){
			$(this).addClass("selected");
		},function(){
			$(this).removeClass("selected");
		});

		if ( !isIE6 ) {
			/* 菜单折叠 */
			var expand = $(".expand"),simple = $(".simple");
			expand.click(function(){ //展开
				$(this).addClass("selected");
				simple.removeClass("selected");
				catItem.removeClass("itemSelected")
			});
			simple.click(function(){ //折叠
				if ( category.css("position") != "fixed" ) {
					$(this).addClass("selected");
					expand.removeClass("selected");
					catItem.addClass("itemSelected");
				}else{
					$(this).addClass("selected");
					expand.removeClass("selected");
					catItem.addClass("itemSelected");
					categoryBtn.addClass("hide");
				};
			});
			/* 滚动折叠 */
			function s_switch(s_cur) {
				for( var i = 0; i < s_cur; i++ ) {
					if( i < catItem.length) {
						catItem.eq(i).addClass("itemSelected");
					}
					if ( i >= catItem.length ) {
						categoryBtn.addClass("hide");
					};
				}
				for( var i = catItem.length-1; i >= s_cur ; i-- ) {
					if( i >= 0 ) {
						catItem.eq(i).removeClass("itemSelected");
					}
				}
			};
			$(window).scroll(function() {
				var nav_t = nav.offset().top; //判断滚动多少值时，菜单折叠，并切换成浮动状态
				var s_top = $(document).scrollTop();
				var s_cur = parseInt((s_top - nav_t)/ 20 );
				var scrollTimeOut;
				clearTimeout(scrollTimeOut);
				if( s_top > nav_t ){
					if ( simple.attr("class") != "simple selected" ) {
						scrollTimeOut = setTimeout(function() {
							s_switch(s_cur);
						},200);
					};
					category.addClass("cateFixed");
				}else{
					category.removeClass("cateFixed");
					if ( simple.attr("class") != "simple selected" ) {
						scrollTimeOut = setTimeout(function() {
							s_switch(s_cur);
							categoryBtn.removeClass("hide");
						},200);
					};
				};
			});
		};
	});
})(jQuery);