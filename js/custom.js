/*---------------------------------
[Master Javascript]

Project: Music

-------------------------------------------------------------------*/
(function($) {
	"use strict";
	var Music = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function() {
			if (!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}
			/*-------------- Music Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.RTL();
			this.homeslider();
			this.playlist_crousel();
			this.smooth_scroll();
			this.Responsive_menu();
			this.Active_menu();
			this.audio_player();
			this.MailFunction();
			this.wowanimation();
		},
		/*-------------- Music Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		RTL: function() {
			// On Right-to-left(RTL) add class 
			var rtl_attr = $("html").attr('dir');
			if (rtl_attr) {
				$('html').find('body').addClass("rtl");
			}
		},
		
		//main slider
		homeslider: function() {
			if($(".home_slider").length > 0){ 
				$('.home_slider').owlCarousel({
					loop:true,
					margin:0,
					items:1,
					singleItem:true,
					autoplay:true,
					autoplayTimeout:4000,
					autoplaySpeed:1000,
					smartSpeed:1500,
					dots:true,
					nav:false,
					responsiveClass:true,
					responsive:{
						0:{
							items:1        
						},
						600:{
							items:1
						},
						768:{
							items:1
						},
						1000:{
							items:1
						}
					},
					animateIn:'slideup',
					animateOut:'slidedown',
					touchDrag:true,
					mouseDrag:false,
				})
			}
		},
		//fullslider
		//playlist crousel
		playlist_crousel: function() {
			if($(".playlist_slider").length > 0){ 
				$('.playlist_slider').owlCarousel({
					loop:true,
					margin:0,
					items:2,
					autoplay:false,
					autoplayTimeout:4000,
					autoplaySpeed:1500,
					smartSpeed:1500,
					dots:false,
					nav:true,
					navText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
					responsiveClass:true,
					responsive:{
						0:{
							items:1        
						},
						768:{
							items:1
						},
						992:{
							items:2
						}
					}
				})
			}
		},
		
		//smooth scroll
		smooth_scroll: function() {
			$(function() {
			  $('.header_right_menu ul > li > a').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				  var target = $(this.hash);
				  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				  if (target.length) {
					$('html, body').animate({
					  scrollTop: target.offset().top
					}, 1000);
					return false;
				  }
				}
			  });
			});
		},
		//Responsive Menu
		Responsive_menu: function() {
			$(".nav_toggle").on('click',function(){
				$(this).toggleClass("toggle_open");
				$(".header_right_menu").slideToggle(500);
			});
		},
		//Active menu
		Active_menu:function(){
			$(".header_right_menu > ul > li > a").on('click',function(){
				$('ul.menu > li > a').removeClass("active");
				$(this).addClass("active");
			});
		},
		//audio player
		audio_player:function(){
			$('audio').mediaelementplayer({
				loop: true,
				playlist: true,
				favourite: true,
				audioHeight: 30,
				playlistposition: 'bottom',
				features: ['playlistfeature', 'prevtrack', 'playpause', 'nexttrack', 'tracks', 'current', 'duration', 'progress', 'volume']
			});
			
			// $(".play_button").on("click",function(e){
				// var song = $(this).attr("data-song");
				// $("audio source").attr("src",song);
				// e.preventDefault();
			// });
		},
		//contact form mail script
		MailFunction:function(){
			$('.submit_btn').on('click', function(){
				var name=$('#u_name').val();
				var email=$('#u_email').val();
				var sub=$('#u_subject').val();
				var u_msg=$('#u_message').val();
				$.ajax({
					type: "POST",
					url: "contactmail.php",
					data: {
						'username':name,
						'useremail':email,
						'usersub':sub,
						'usermsg':u_msg,
						},
					success: function(msg) {
						var full_msg=msg.split("#");
						if(full_msg[0]=='1'){
							$('#u_name').val("");
							$('#u_email').val("");
							$('#u_subject').val("");
							$('#u_message').val("");
							$('#err_msg').html( full_msg[1] );
						}
						else{
							$('#u_name').val(name);
							$('#u_email').val(email);
							$('#u_subject').val(sub);
							$('#u_message').val(u_msg);
							$('#err_msg').html( full_msg[1] );
						}
					}
				});
			});
		},
		//animation on page scroll
		wowanimation:function(){
			var wow = new WOW({
				boxClass:     'wow',      // default
				animateClass: 'animated', // default
				offset:       0,          // default
				mobile:       true,       // default
				live:         true        // default
			})
			wow.init();
		},
	
   };
	Music.init();
	//window load function
	$(window).load(function(){
		$(".preloader").fadeOut("slow").delay("600");
	});
	
	//window scroll function
	$(window).bind('scroll', function() {
        if ($(window).scrollTop() > 200 ) {
            $('.ms_header_section').addClass('fixed_top_menu');
        }
		else {
            $('.ms_header_section').removeClass('fixed_top_menu');
        }
    });

})(jQuery);