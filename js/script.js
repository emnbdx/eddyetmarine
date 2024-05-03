(function($) {
	"use strict"; // Start of use strict
	
	/* Logo Lettering */
	var logo_rotate = $("header .logo_animation").attr('data-rotate');
	if (logo_rotate!='') {
		$("header .logo_animation").addClass('logo_rotate_'+logo_rotate);
	}
	
	$("header .logo_animation").lettering();
	$("header .logo_animation span").each(function(){
	 	var min = 0;
	 	var max = 50;
	 	var randomNumber = Math.floor(Math.random()*(max-min+1)+min);
	 	$(this).css('transition-delay', '0.'+randomNumber+'s');
	 });

	/*Firefly*/
	if ($('.jqueryFireFly').length>0) {
		$('.jqueryFireFly').each(function(){
			var total = $(this).attr('data-total');
			var minPixel = $(this).attr('data-minPixel');
			var maxPixel = $(this).attr('data-maxPixel');
			$.firefly({
			  minPixel: minPixel,
       	maxPixel: maxPixel,
				color: 'none',
				total : total,
				twinkle: 0.9,
				on:'.firefly'
			});
		});
		
	};

    /* Section Background */
	$('.image_bck').each(function(){
		var image = $(this).attr('data-image');
		var gradient = $(this).attr('data-gradient');
		var color = $(this).attr('data-color');
		var blend = $(this).attr('data-blend');
		var opacity = $(this).attr('data-opacity');
		var position = $(this).attr('data-position');
		var height = $(this).attr('data-height');
		if (image){
			$(this).css('background-image', 'url('+image+')');	
		}
		if (gradient){
			$(this).css('background-image', gradient);	
		}
		if (color){
			$(this).css('background-color', color);	
		}
		if (blend){
			$(this).css('background-blend-mode', blend);	
		}
		if (position){
			$(this).css('background-position', position);	
		}
		if (opacity){
			$(this).css('opacity', opacity);	
		}
		if (height){
			$(this).css('height', height);	
		}

	});

	/* Over */
	$('.over, .head_bck').each(function(){
		var color = $(this).attr('data-color');
		var image = $(this).attr('data-image');
		var opacity = $(this).attr('data-opacity');
		var blend = $(this).attr('data-blend');
		if (color){
			$(this).css('background-color', color);	
		}
		if (image){
			$(this).css('background-image', 'url('+image+')');	
		}
		if (opacity){
			$(this).css('opacity', opacity);	
		}
		if (blend){
			$(this).css('mix-blend-mode', blend);	
		}
	});

	/* Mobile Menu */
	$('.top_menu_mobile_link').on("click", function(e){
		$(this).next('.top_menu_cont').fadeToggle();
		$(this).parents('.light_nav').toggleClass('active');
	});

	/*Scroll Effect*/
	$('.go, .top_menu_cont a').on("click", function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 2300);
		e.preventDefault();
	});

	$(".team_slider").owlCarousel({
 		navigation : true, 
 		responsive: true, 
 		responsiveRefreshRate : 600, 
 		responsiveBaseElement:window, 
 		slideSpeed : 1500, 
 		addClassActive:true,
		paginationSpeed : 700, 
		rewindSpeed : 3000,
		items:3,
		itemsTablet:[1000,2],
		itemsMobile : [569,1],
		itemsDesktop:3,
		autoPlay : true, 
		touchDrag:false,
	});	

	/*Animation Block Delay*/	
	$('div[data-animation=animation_blocks]').each(function(){
	var i = 0;	
		$(this).find('.icon_box, .skill-bar-content, .anim_box, .bd, .story_txt, .portfolio_item_cont').each(function(){
			$(this).css('transition-delay','0.'+i+'s');
			i++;
		})
	})

	/* Shortcode Nav */
	var top_offset = $('header').height() - 1; 

	$('#nav-sidebar, .top_menu_cont').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 700,
		scrollOffset: top_offset,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
	});

	/* Anchor Scroll */
	$(window).scroll(function(){
		if ($(window).scrollTop() > 100) {
			$(".logo").addClass('active');
			$('body').addClass('first_step');
			
		}
		else {
			$('body').removeClass('first_step');
			$(".logo").removeClass('active');
		}
		if ($(window).scrollTop() > 500) {
			$('body').addClass('second_step');
		}
		else {
			$('body').removeClass('second_step');
		}
	});

	/* Fixed for Parallax */
	$(".fixed").css("background-attachment","fixed");

 	/* Mobile Menu */
	$('.mobile_menu_content .parent').on("click", function(e){
		$(this).find('ul').slideToggle(300);
	});
	$('.mobile_menu').on("click", function(e){
		$(this).toggleClass('active');
		$('.mobile_menu_hor').toggleClass('active');
	});
	$('.header_search span').on("click", function(e){
		$(this).next('.header_search_cont').fadeToggle();
	});

	/* Block Autheight */
	if( !device.tablet() && !device.mobile() ) {
		$('.auto_height').each(function(){
			setEqualHeight($(this).find('div[class^="col"]'));
		});
	}
	if( device.tablet() && device.landscape() ) {
		$('.auto_height').each(function(){
			setEqualHeight($(this).find('div[class^="col"]'));
		});
	}

	$(window).resize(function() {
		if( !device.tablet() && !device.mobile() ) {
			$('.auto_height').each(function(){
				setEqualHeight($(this).find('div[class^="col"]'));
			});
		}
		if( device.tablet() && device.landscape() ) {
			$('.auto_height').each(function(){
				setEqualHeight($(this).find('div[class^="col"]'));
			});
		}
	});

	/*Boxes AutoHeight*/
	function setEqualHeight(columns)
	{
		var tallestcolumn = 0;
		columns.each(
			function()
			{
				$(this).css('height','auto');
				var currentHeight = $(this).height();
				if(currentHeight > tallestcolumn)
					{
					tallestcolumn = currentHeight;
					}
			}
		);
	columns.height(tallestcolumn);
	}

	
	
})(jQuery);


$(window).load(function(){
	/*Countdown*/
	$('.countdown').each(function(){
		var year = $(this).attr('data-year');
		var month = $(this).attr('data-month');
		var day = $(this).attr('data-day');
		$(this).countdown({until: new Date(year,month-1,day)});

	});
});

// CONTACT FORM FUNCTION
var contact_send = function() {
	
	var name 	= document.querySelector('[name="name"]').value;
	var email	= document.querySelector('[name="email"]').value;
	var guests	= document.querySelector('[name="guests"]').value;
	var message = document.querySelector('[name="message"]').value;
	
	$(".mail-error").addClass('hidden'); 
	$(".mail-success").addClass('hidden'); 

	if (name.trim() == "") { 
		$(".mail-error").text("Le nom est obligatoire"); 
		$(".mail-error").removeClass('hidden'); 
		$(name).focus(); 
		return;
	}
	
	if (email.trim() == "") {
		$(".mail-error").text("L'email est obligatoire");
		$(".mail-error").removeClass('hidden');
		$(email).focus();
		return;
	}

	var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!regex.test(email)) {
    	$(".mail-error").text("L'email est invalide");
		$(".mail-error").removeClass('hidden');
		$(email).focus();
		return;
    }
	
	if (guests.trim() == "") {
		$(".mail-error").text("Le nombre de personne est obligatoire");
		$(".mail-error").removeClass('hidden');
		$(guests).focus();
		return;
	}

	$.post("contact.php", { 
				name:name, 
				email:email, 
				guests:guests, 
				message:message 
			}, 
			function (result) {
				if (result == "SUCCESS") {
					$(".mail-success").text("Votre message a bien été envoyé"); 
					$(".mail-success").removeClass('hidden');

					setTimeout(function () {
						$(name).val("");
						$(email).val("");
						$(guests).val("");
						$(message).val("");
					}, 3000);
				} else {
					$(".mail-error").text("Bon à priori tout ne s'est pas passé comme prévu contactez nous par tel !");
					$(".mail-error").removeClass('hidden');
				}
			});
};
