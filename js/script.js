jQuery(function($){
	//header fixed
	$(window).scroll(function(){
		if ($(this).scrollTop() > 0) {
			$('.fusion-header-wrapper').addClass('on');
		} else {
			$('.fusion-header-wrapper').removeClass('on');
		}
	});

	//languge select
	$('.box_select select').change(function(){
		var link = $(this).find('option:selected').val();
		window.location = link;
	});

	//mobile nav
	$(window).load(function(){
		$('.fusion-mobile-nav-holder .sns').siblings('.fusion-menu').andSelf().wrapAll('<div class="inner"></div>');
		$('#mobile-menu-gnb>li').each(function(){
			if($(this).hasClass('menu-item-has-children')){
				$(this).children('a').after('<button class="m_toggle">menu down</button>');
			}
		});

		var open = false;
		$('.m_toggle').click(function(){
			if(open == false){
				$(this).text('menu up');
				$(this).addClass('on');
				$(this).siblings('a').addClass('on');
				$(this).siblings('ul').slideDown();
				open = true;
			}else{
				$(this).text('menu down');
				$(this).removeClass('on');
				$(this).siblings('a').removeClass('on');
				$(this).siblings('ul').slideUp();
				open = false;
			}
		});
	});

	if($('body').hasClass('home')){
		// default date
		var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var date = new Date();
		var today = date.getDate();
		if(today < 10){
			today = '0'+date.getDate();
		}else{
			today =  date.getDate();
		}
		document.querySelector('.result_in').innerHTML = today + '<small>/ ' + month[date.getMonth()] + '</small>';
		document.querySelector('.result_out').innerHTML = today + '<small>/ ' + month[date.getMonth()] + '</small>';

		// lightpick
		var picker = new Lightpick({
			field: document.getElementById('check_in'),
			secondField: document.getElementById('check_out'),
			singleDate: false,
			lang: 'en-US',
			onSelect: function(start, end){
				if(start) document.querySelector('.result_in').innerHTML = start.format('DD') + '<small>/ ' + start.format('MMMM') + '</small>';
				if(end) document.querySelector('.result_out').innerHTML = end.format('DD') + '<small>/ ' + end.format('MMMM') + '</small>';
			},
			autoclose: false,
			hideOnBodyClick: true
		});
		// main slider parallax
		parallaxImg('.slider_room .info .slick-slide');
		parallaxImg('.slider_bar  .info .slick-slide');
	}

	// people
	$('input.number').on('keyup', function() {
		$(this).val($(this).val().replace(/[^0-9]/g,''));
	});

	$('.reserve button').click(function(){
		var $people = $(this).siblings('input');
		var peopleNum = $people.val();
		if($(this).hasClass('up')){
			if(Number(peopleNum)+1 >= 0 && Number(peopleNum)+1 < 10){
				$(this).siblings('input').val(pad(Number(peopleNum)+1, 2));
			}else{
				$(this).siblings('input').val(Number(peopleNum)+1);
			}
		}else{
			if(Number(peopleNum)-1 >= 0){
				if(Number(peopleNum)-1 >= 0 && Number(peopleNum)-1 < 10){
					$(this).siblings('input').val(pad(Number(peopleNum)-1, 2));
				}else{
					$(this).siblings('input').val(Number(peopleNum)-1);
				}
			}
		}
	});

	// bed type
	$('.reserve .type select').change(function(){
		var sel = $(this).find('option:selected').text();
		$(this).siblings('span').text(sel)
	});

	// slider wrap
	$('.original .fusion-one-third').wrapAll('<div class="slider_mb view_3"></div>');
	$('.original .fusion-one-half').wrapAll('<div class="slider_mb view_2"></div>');
	$('.activity .fusion-one-third').wrapAll('<div class="slider_mb view_3"></div>');
	$('.slider_mb .fusion-layout-column').attr('class','');

	// main slider
	$('.slider .info').slick({
		autoplay: true,
		arrows: false,
		dots: true,
		speed: 2000,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false
	});

	$('.slider .info h3').each(function(){
		var tit = $(this).html();
		var num = $(this).parents('.slick-slide').attr('data-slick-index');
		$(this).parents('.slider').find('.slick-dots li').eq(num).find('button').html(tit);
	});

	$('.slider .info').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(this).find('.txt').removeClass('scroll on');
	});

	$('.slider .info').on('afterChange', function(event, slick, currentSlide){
		$(this).find('.slick-slide[data-slick-index="'+currentSlide+'"]').find('.txt').addClass('on');
	});


	$('.slider .img').slick({
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
		asNavFor: '.slider .text',
		dots: true,
		centerMode: true,
		centerPadding: 'calc((100% - 1200px) / 2 - 60px)',
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					centerPadding: '0',
					dots: false,
					arrows: false
				}
			}
		]
	});
	$('.slider .text').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider .img',
		fade: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 1300,
				settings: {
					arrows: true
				}
			}
		]
	});

	$('.slider .text').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(this).find('.txt').removeClass('scroll on');
	});

	$('.slider .text').on('afterChange', function(event, slick, currentSlide){
		$(this).find('.slick-slide[data-slick-index="'+currentSlide+'"]').find('.txt').addClass('on');
	});

	// slider mobile view 2
	$('.slider_mb.view_2').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0',
		arrows: false,
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	// slider mobile view 3
	$('.slider_mb.view_3').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0',
		arrows: false,
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					centerPadding: '30px'
				}
			}
		]
	});

	//overview slider
	$('.concept .slider .fusion-imageframe').wrapAll('<div class="img"></div>');
	$('.concept .slider .fusion-text').wrapAll('<div class="text"></div>');
	$('.concept .slider .fusion-text').each(function(){
		$(this).find('p').wrapAll('<div class="txt"></div>');
	});
	$('.highlights .center').wrapAll('<div class="slider_center"></div>');

	$('.concept .slider .img').slick({
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
		asNavFor: '.slider .text',
		arrows: false
	});
	$('.concept .slider .text').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider .img',
		fade: true,
		arrows: true
	});

	$('.concept .slider .text').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(this).find('.txt').removeClass('scroll on');
	});

	$('.concept .slider .text').on('afterChange', function(event, slick, currentSlide){
		$(this).find('.slick-slide[data-slick-index="'+currentSlide+'"]').find('.txt').addClass('on');
	});

	$('.highlights .center').attr('class','');

	$('.highlights .slider_center').slick({
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
		centerMode: true,
		centerPadding: '145px',
		arrows: false,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 1,
					centerPadding: '25px'
				}
			}
		]
	});

	$('.highlights .slider_center').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(this).find('.fusion-text').removeClass('scroll on');
	});

	$('.highlights .slider_center').on('afterChange', function(event, slick, currentSlide){
		$(this).find('.slick-slide[data-slick-index="'+currentSlide+'"]').find('.fusion-text').addClass('on');
	});

	//sub nav
	var subMenu = $('.current-menu-parent ul').html();
	$('.nav ul').html(subMenu);
	var subMenuLeng = $('.nav ul li').length;
	$('.nav ul li').css('width',100/subMenuLeng+'%');

	$(window).resize(function(){
		if($(this).width() <= 640){
			var mm = false;
			$('.current-menu-item a').on('click', function(){
				if(mm == false){
					$(this).parent('li').siblings('li').addClass('on');
					mm = true;
				}else{
					$(this).parent('li').siblings('li').removeClass('on');
					mm = false;
				}
				return false;
			});
		}else{
			$('.current-menu-item a').off('click');
		}
	});

	var pathName = window.location.pathname,
	twoDepth = pathName.split('/')[2];
	if(pathName.indexOf('activities') == -1 || twoDepth == ''){
		$('.nav').hide();
	}

	//portfolio
	$('.portfolio').each(function(){
		var portLeng = $(this).children('ul').children('li').length;
		if(portLeng%2 == 1){
			if($(this).parents('.port_wrap').hasClass('reverse')){
				$(this).parents('.port_wrap').next('.port_wrap').removeClass('reverse');
			}else{
				$(this).parents('.port_wrap').next('.port_wrap').addClass('reverse');
			}
		}
	});

	$('.progress_wrap .fusion-imageframe').wrapAll('<div class="slider_progress"></div>');
	$('.slider_progress').after('<div class="progress_bar"><span></span></div>');
	$('.slider_progress').on('init beforeChange', function(event, slick, currentSlide, nextSlide){
		var count = slick.slideCount;
		progress = 100/ count;
		$('.progress_bar span').css({'width':progress+'%'});
		$('.progress_bar span').css({'width':progress*(nextSlide+1)+'%'});
	});
	$('.slider_progress').slick({
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		pauseOnDotsHover: false,
	});



	//way point
	$('.fusion-fullwidth').waypoint(function() {
		$(this).find('.animated').addClass('fadeInUp');
		$(this).find('.slick-active').find('.txt').addClass('scroll on');
		$(this).find('.layering').addClass('on');
		$(this).find('.box_menu').addClass('on');
		if($(this).hasClass('highlights')){
			$(this).find('.slick-active').find('.fusion-text').addClass('scroll on');
		}
	}, {
		offset: '70%'
	});

	$('.fusion-page-title-row').waypoint(function() {
		$(this).find('h1').addClass('animated fadeInUp');
		$(this).find('h3').addClass('animated delay-03s fadeInUp');
	}, {
		offset: '70%'
	});

	$('.slider_mb').waypoint(function() {
		$(this).find('.fusion-column-wrapper').addClass('on');
	}, {
		offset: '70%'
	});

	$('.port_wrap .portfolio li').waypoint(function() {
		$(this).addClass('on');
	}, {
		offset: '70%'
	});

	function parallaxImg(el) {
		$(window).scroll(function(){
			var targetTop = $(el).offset().top,
			windowH = $(window).height(),
			top = $(window).scrollTop(),
			position1 = top-targetTop+windowH,
			position2 = position1 * 0.1;
			if(top >= targetTop-windowH){
				if(position2 > 100){
					$(el).css({'background-position-y':'100%'});
				}else{
					$(el).css({'background-position-y':position2+'%'});
				}
			}
		});
	}
});

function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
