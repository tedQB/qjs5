// JavaScript Document
$(function(){
	
	initEffect();
	
	$.ajaxSetup({ cache: false });	
	
	//�ж��Ƿ���hash����hash������ҳ��
	if (window.location.hash) {
		//����ǲ���ȷ��hash������ص�һ��ҳ��,�������ָ��ҳ��
		if (window.location.hash.indexOf('|') === -1) {
			$("#j_gui_sidebar li > a:first").trigger("click");
		}
	}else{
		window.location.hash = "extra|history";
	}
	
	var path = window.location.href.replace(/(index\.html)?#/,'');
		path = path.replace('\|','/') + '.html';
		Guide.loadPage(path);

})

/***
 * ҳ�����ʱ��ʼ��ҳ���¼�
 */
var initEffect = function(){
	//��ർ���˵�
	$("#j_gui_sidebar .gui_ol a").click(function(){
		if (!$(this).hasClass("active")) {
			$("#j_gui_sidebar .gui_ol a").removeClass("active");
			$(this).addClass("active");
			Guide.loadPage(this.href);
		}
		return false;
	});
	$("#js_gui_item").click(function(){
		Guide.loadPage(this.href);
		return false;
	});
	//���������
	$("#js_toggle_code").toggle(function(){
		$(".gui_h2").next(".js_box").hide();
//		$(".js_gui_code").hide();
		$(this).removeClass("gui_icon_minus_d").addClass("gui_icon_minus").html('��ʾ����');
		return false;
	},function(){
		$(".gui_h2").next(".js_box").show();
		$(this).removeClass("gui_icon_minus").addClass("gui_icon_minus_d").html('��������');
		return false;
	});
	
	//ȫ�����
	$("#js_full_screen").toggle(function(){
		$("#js_warp").addClass("gui_full_screen");
		$(this).addClass("gui_icon_null").text("�ر�ȫ��");
		$("#js_gui_collapsible").hide();
		return false;
	},function(){
		$("#js_warp").removeClass("gui_full_screen");
		$(this).removeClass("gui_icon_null").text("ȫ�����");
		$("#js_gui_collapsible").show();
	});
	
	//˫����ʾȫ������
	$(".gui_code").live("dblclick",function(){
		var $this = $(this);
		if( $this.height() == 400 ){
			$this.css("height","auto");
		}else if( $this.height() > 400 ){
			$this.height(400);
		}
//		$(this).toggleClass("gui_code_full");
	});
	
	
	//ȫ�����
//	$("#js_full_screen").click(function(){
//		$("#js_warp").toggleClass("gui_full_screen");
//		$(this).toggleClass("gui_icon_null");
//		
//		$("#js_gui_collapsible").click();
//		return false;
//	});
	
	
	
	//������ػ���ʾ��һ���ڵ�
	$(".gui_h2 a,.gui_h3 a").live("click",function(){
		var $this = $(this);
		$this.parent().next(".js_box").slideToggle("fast");
		return false;
	});
	
	//չ���������˵�
	$(".js_gui_tit > a").click(function(){
		$(this).parent().next("ol").toggle();
		return false;
	})
	
	//����Html�����ڵĵ���¼�
	$(".gui_annotate a").live("click",function(){
		return false;
	});
	
	//������¼�
	$(".gui_table a").live("click",function(){
		Guide.loadPage(this.href);
		return false;
	});
	
	//���������	
	$("#js_gui_collapsible").bind("mouseover mousemove mouseout click",function(e){
		var $this = $(this),
			$arrow = $("#js_gui_icon");
		if(e.type == 'mouseover' || e.type == 'mousemove'){
			var left = $this.position().left;
				OFFSET = 15;
			$arrow.show();
			if($("#j_gui_sidebar").is(":hidden")){
				//����
				$arrow.removeClass("gui_hide_arrow").addClass("gui_show_arrow").css({left:(left + OFFSET + 5),top:e.pageY});
			}else{
				$arrow.removeClass("gui_show_arrow").addClass("gui_hide_arrow").css({left:(left -OFFSET),top:e.pageY});
			}
		}else if(e.type =="mouseout"){
			$arrow.hide();
		}else if(e.type =="click"){
			$("#js_warp").toggleClass("gui_sidebar_hide");
			$this.toggleClass("gui_collapsible_hide");
			$arrow.hide();
			return false;
		}
	});
	
	
}//end initEfect



var Guide = function(){
	return {
		
		/***
		 * ����html���룬��ȡbody����
		 * @param {Object} html_data
		 */
		filterHtml:function(html_data){
			var data = html_data;
			data = data.replace(/<script.*>.*<\/script>/ig, ""); // Remove script tags
			data = data.replace(/<\/?link.*>/ig, ""); //Remove link tags
			data = data.replace(/<\/?meta.*>/ig, ""); //Remove meta tags
			data = data.replace(/<\/?html.*>/ig, ""); //Remove html tag
			data = data.replace(/<\/?body.*>/ig, ""); //Remove body tag
			data = data.replace(/<\/?head.*>/ig, ""); //Remove head tag
			data = data.replace(/<\/?!doctype.*>/ig, ""); //Remove doctype
			data = data.replace(/<title.*>.*<\/title>/ig, ""); // Remove title tags
//			data = data.replace(/\x2E\x2E\x2F\x2E\x2E\x2F/g, '');
//			data = data.replace(/((href|src)=["'])(?!(http|#))/ig, "$1" + directory + "/");
			return data;
		},
		
		
		/***
		 * ��ȡģ�����岿��
		 * @param {Object} path:ģ��url
		 */
			loadPage: function(path){
				var directory = path.match(/([^\/]+)\/[^\/\.]+\.html$/)[1];
				var section = path.replace(/\/[^\/]+\.html/, '');
				$.get(path, function(data){
					data = Guide.filterHtml(data);
					window.location.hash = directory + '|' + path.replace(/(.*\/){0,}([^\.]+).*/ig,"$2")
					$iframe = $("#js_gui_iframe");
					$iframe.html(data);
					$(".gui_results").hide();
					Guide.cloneCode();
					
					$(".gui_code").each(function(){
						var $this = $(this);
						if ($this.height() > 400) {
							$this.height(400);
						}
					})
					
				}, "html");
				$("#sidebar .navTree a").removeClass("active");
				$("#sidebar .navTree a[href='"+ path +"']").addClass("active");
				$("#js_toggle_code").removeClass("gui_icon_minus").addClass("gui_icon_minus_d").html('��������');
				
				
			},// loadPage

		/***
		 * ��¡���벢��ʾ��ҳ����
		 */
		cloneCode: function(){
			$(".gui_annotate").each(function(i){
				var $this = $(this), html = $this.html(),
					code_id = "js_gui_copydd" + i,
					$code_cont = $this.next().next(".js_box");
					$container = $('<div class="js_gui_code"></div>').prependTo($code_cont);
					html = $.htmlClean(html, {format:true});
//					alert(html);
				$('<pre class="gui_code language-html"></pre>').text(html).prependTo($container);//language-html
				$('<input type="hidden" />').val(html).prependTo($container);//language-html
				$('<div class="relative"><a href="javascript:;" class="gui_copy">����Html����</a></div>').prependTo($container);
			});
			//��Ӹ��ƴ����¼�
			Guide.copyCode();
			$.SyntaxHighlighter.init({
					'prettifyBaseUrl': 'http://webteam.isd.com/media/guide/js/syntaxhighlighter/prettify',
					'baseUrl': 'http://webteam.isd.com/media/guide/js/syntaxhighlighter/master'
					
			});
		},//end cloneCode
		
		/***
		 * �������code
		 * @param {Object} obj
		 */
		copyCode: function(obj,item){
			
			
			clip = new ZeroClipboard.Client();
			clip.setHandCursor(true);
			
			
			$(".gui_copy").mouseover( function() {
				var txt = "";
				var input = $(this).closest(".js_gui_code").find("input[type='hidden']");
				if(input.length){
					txt = $(this).closest(".js_gui_code").find("input[type='hidden']").val();
				}else{
					txt = $(this).parent().next().text();
				}
				
				txt = $.trim(txt);
				// set the clip text to our innerHTML
				clip.setText( txt );
				
				// reposition the movie over our element
				// or create it if this is the first time
				if (clip.div) {
					clip.receiveEvent('mouseout', null);
					clip.reposition(this);
				}
				else clip.glue(this);
				
				// gotta force these events due to the Flash movie
				// moving all around.  This insures the CSS effects
				// are properly updated.
				clip.receiveEvent('mouseover', null);
			} );
			
			clip.addEventListener('complete', function (client, text) {
				$("#js_gui_suc").addClass("shown");
				setTimeout(function(){
					$("#js_gui_suc").removeClass("shown");
				},1000)
			});
			
		}//end copyCode
		
		
	}
}()









