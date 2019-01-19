jQuery(document).ready(function($) {
	
	$('.media_embed').click(function(){
		$('.media_embed_popup').each(function(){
			$(this).fadeOut('fast');
		});
		$(this).next('.media_embed_popup').fadeIn('fast');
		element = $(this).next('.media_embed_popup').find('.object');
		$(element).focus().select();
		return false;
	});
	
	$('.close_popup').click(function(){
		$(this).parents('.media_embed_popup').fadeOut('fast');
	});
	
	$('.more_posts').click(function(){
		var postoffset = parseInt($(this).attr('data-offset'));
		var template = $(this).attr('data-template');
		var category = $(this).attr('data-category');
		var tag = $(this).attr('data-tag');
		var query = $(this).attr('data-query-string');
		
		$(this).attr('data-offset', postoffset+10);
		
		$('#content .post').last().after().append('<div class="loading_more"></div>');
		
		$.get(ajaxurl, {
			action: 'load_panel',
			panel: 'more_posts',
			offset: postoffset,
			template: template,
			category: category,
			tag: tag,
			query: query
		}, function(data) {
			$('.loading_more').fadeOut('fast', function(){
				$('#content .post').last().after().append(data);
			}).remove();
		});
		
		return false;
	});
	
	
	if($('#ajax_comments').length>0) {
		var ajaxID = $("#ajax_comments").attr('data-post-id');
		
		$.get(ajaxurl, {action: 'load_panel', panel: 'tonight_comments', ajaxID: ajaxID}, function(data) {
			$('#ajax_comments').html(data);
			$('#ajax_comments').find('#respond').remove();
		});

	}

/************************************************************************************
UNIFORM JS
***********************************************************************************/
	//$("input, select, input:checkbox, input:radio, input:file").uniform();
	
	default_value = $('#searchsubmit').attr('value').toUpperCase();
	$('#s').attr('value', default_value);
	$('#s').focus(function(){
		if(this.value == default_value) {
		            this.value = '';
		}
	});
	$('#s').blur(function(){
		if(this.value == '') {
		            this.value = default_value;
		}
	});

	$('#scientist_scrollable').scrollable({circular:true}).autoscroll({autoplay:true, interval:4500}).navigator({navi:'ul.navi'});
	if($('#scientist_scrollable').size() > 0) {
		var sciapi = $('#scientist_scrollable').data('scrollable');
		sciapi.seekTo(0, 0);
	}

/*
	if($('.intro_excerpt').height() > $('.post_intro .post_thumbnail').height()) {
		$('.intro_excerpt, .intro_excerpt table td').height($('.post_intro .post_thumbnail').height()); 
	}
*/	
	
	$('#scientist_scrollable').each(function(){
		var currentTallest = 0;
		
		$(this).find('.slide_container').each(function(i){
			if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
		});
		
		$(this).height(currentTallest);
	});



	/*******************************************
	TABS
	*******************************************/	

		$('.tabs').tabs('div.panes > div', {
			effect: 'fade'
		});

	/*******************************************
	CALENDAR
	*******************************************/
		$('#cal_header .Prev a').live('click', function() {
			$.post(ajaxurl,
				{ action: 'tonight_back', offset: parseInt($('.calendar_container').attr('data-offset'))-1 },
				function(response) { $('#CalendarWidget').html(response); });
			return false;
		});
		$('#cal_header .Next a').live('click', function() {
			$.post(ajaxurl,
				{ action: 'tonight_next', offset: parseInt($('.calendar_container').attr('data-offset'))+1 },
				function(response) { $('#CalendarWidget').html(response); });
			return false;
		});


		//force download.
		$('a.media_download').click(function(){
			fn = $(this).attr('href');
			loc = 'http://earthsky.org/wp-content/themes/earthsky_v2/lib/functions/forceDownload.php';
			window.location=loc+'?filenm='+fn; return false;
		});
		
		//email
		$('.email_article a, a.email_article').click(function(){
			var title = $('.entry-title').text();
		 	var pathname = $(this).attr('rel');
			strMailToLink = 'mailto:?subject='+title+'&body="'+pathname+'"';
			win = window.open(strMailToLink,'emailWindow');
			if (win && win.open &&!win.closed) win.close();
			return false;
		});


/************************************************************************************
JQUERY TOOLS TABS AND SLIDERS
***********************************************************************************/		

	

	
	$('a.next, a.prev').click(function(){
		return false;
	});

	
	
	
	
	/*******************************************
	MP3 EMBEDDING
	*******************************************/
		//PROPERLY DONE MP3 EMBED
		if($('#en90 a.embeded_link').length > 0){
			var wp90source = $('#en90 a.embeded_link').attr('href');
			$('#en90').height('40px');
			flashembed("en90", "http://earthsky.org/wp-content/themes/earthsky/swf/player.swf", {
				flashvars: '&duration=90&file='+wp90source+'&skin=http://earthsky.org/wp-content/themes/earthsky/swf/ES_skin_blue.swf'
			});
		}

		if($('#en8 a.embeded_link').length>0) {
			var wp8source = $('#en8 a.embeded_link').attr('href');
			$('#en8').height('40px');
			flashembed("en8", "http://earthsky.org/wp-content/themes/earthsky/swf/player.swf", {
				flashvars: '&duration=480&file='+wp8source+'&skin=http://earthsky.org/wp-content/themes/earthsky/swf/ES_skin_orange.swf'
			});
		}	
	

	
	
});

