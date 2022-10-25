//기본 js
$(function(){
    // 햄버거 메뉴
    $(".trigger_box").click(function () {
        $(this).toggleClass("is-active");
        posY = $(window).scrollTop();

        if ($(this).hasClass("is-active")) {
            $(".bg_black").stop().fadeIn();
            $(".nav_wrap").stop().animate({"left":"0%"});
            $("html, body").addClass("not_scroll");
            $(".cont").css("top",-posY);
            if($(window).width() <= 500) {
                $(".main_sns").show();
            }
        } else {
            $(".bg_black").stop().fadeOut();
            $(".nav_wrap").stop().animate({"left":"-100%"});
            $("html, body").removeClass("not_scroll");
            posY = $(window).scrollTop(posY);
            if($(window).width() <= 500) {
                $(".main_sns").hide();
            }
        }
    });

    // 검색창
    if($(window).width() <= 500) {
        $(".search").click(function(){
            $(this).toggleClass("on");

            if($(".search").hasClass("on")){
                $(".search_box input").css("visibility","visible");
                $(".logo").hide();
            } else {                 
                $(".search_box input").css("visibility","hidden");
                $(".logo").show();
            }
        });
    }
    
    // 서브메뉴
    $(".main_menu>a").on('click', function () {
        $(this).toggleClass("on");
        $(this).siblings(".sub_menu").slideToggle();
    });   

    // 탑 버튼
    $("#top_btn").hide();
    
    $(window).scroll(function(){
        if($(this).scrollTop()>100){
            $("#top_btn").fadeIn();
        } else {
            $("#top_btn").fadeOut();
        }
    });

    $("#top_btn").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});


//메인 비쥬얼 슬라이드
$(function(){
	var num = 0;
	var slide;

	$(".main_img li").eq(num).css({"left":"0%","top":"0%"});
    $(".main_shose li").eq(num).css({"right":"0px","bottom":"-8%"});
    $(".circle_nav li a").eq(num).addClass("selected");
	
	slide = setInterval(function(){
		start();
	}, 3000); 
	
	function start(){
		var no = num + 1;
        
		if(no>=$(".main_img li").length){ 
			no = 0;
		}
        
        $(".circle_nav li a").click(function(){
            var new_num = $(this).parent("li").index();

            $(".circle_nav li a").removeClass("selected");
            $(this).addClass("selected");
            
            no = new_num;
            num = new_num-1;
        });

        $(".main_img li").stop().animate({"left":"-100%","top":"-100%"});
        $(".main_shose li").stop().delay(200).animate({"right":"-200%","bottom":"-200%"});
		$(".main_img li").eq(no).stop().animate({"left":"0%","top":"0%"},800);
        $(".main_shose li").eq(no).stop().delay(200).animate({"right":"0px","bottom":"-8%"});
        $(".circle_nav li a").stop().removeClass("selected");
        $(".circle_nav li a").eq(no).stop().addClass("selected");
		
		num = no; // 반복
	};
});
    
// 퀵메뉴 슬라이더
$(function(){
    $('.slider_for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider_inner'
    });
    
    $('.slider_inner').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider_for',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
        prevArrow: $('#prev'),
		nextArrow: $('#next'),
        responsive: [
            {  //500-1023
                breakpoint: 1295,
                settings: {                           
                    slidesToShow: 2,
                    slidesToScroll: 1
                } 
            }
        ]
    });
});