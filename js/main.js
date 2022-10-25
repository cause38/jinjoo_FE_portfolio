//reponsive
    // var loading = setTimeout(function() {
    //     $("#loading").fadeOut();
    // }, 2500);
$(function(){
    //mobile device height setting
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    //mobile menu
    $(".ham").click(function(){
        $("nav").fadeIn(400);
    });

    $("nav .close").click(function(){
        $("nav").fadeOut(400);
    });

    var wd = $(window).width();

    if(wd <= 500) {
        $(".lnb li a, h1").click(function(){
            $("nav").fadeOut(400);
        });
    }

    $(window).resize(function(){
        location.reload();
    });
});

//fullpage scroll
$(document).ready(function() {
    $("#fp-nav, #top_btn").hide();

    $('#full-page').fullpage({
        licenseKey : '',
        navigation: 'true',
        menu: 'header',
        scrollingspeed: 1000,
        anchors: ['intro', 'about', 'skills', 'work', 'contact'],
        scrollOverflow: true,
        normalScrollElements: '.about_txt',
        'afterLoad': function (anchorLink, index) {
			if (index == 1|| index == 3 || index == 5){
				$("#fp-nav, #top_btn, .ham").removeClass("on");
			} else {
                $("#fp-nav, #top_btn, .ham").addClass("on");
            }
            
            var wd = $(window).width();

            if (index == 1){
                $("#fp-nav, #top_btn").fadeOut();
            } else if (wd <= 500){
                $("#fp-nav, #top_btn").fadeOut();
            } else {
                $("#fp-nav, #top_btn").fadeIn();
            }

            if (index == 1){
                $("header").removeClass("on");
                $("header").fadeIn();
            } else {
                $("header").addClass("on");

                if(wd <= 500) {
                    $("header").show();
                } else {
                    $("header").fadeOut();
                }
            }

            if (index == 4){
				$(".work_list li").addClass("on");
			} else {
                $(".work_list li").removeClass("on");
            }
		}
    });
});

//intro main_img
$(function(){
    const box = new Array();

    for(var i=0; i<700; i++){
        box[i] = '#80ffdd ' + -i + 'px' + ' ' + i + 'px';
    }

    var s = box.join(',');
    var domObj = document.getElementById("main_img");
    domObj.style.boxShadow = s;
});

//height check
$(function(){
    var ab_scroll = function ab_scroll() {
        var abh = $(window).height();
        var abw = $(window).width();
        if(abw > 1355){
            if(abh <= 740){
                $(".about_txt").stop().css({"overflow-y":"scroll","height":"100%","padding-right":"40px"});
            } else {
                $(".about_txt").stop().css({"overflow-y":"hidden","height":"auto"});
            }
        } else {
            if(abh <= 640){
                $(".about_txt").stop().css({"overflow-y":"scroll","height":"100%","padding-right":"40px"});
                $("footer dl").css("margin","20px 0");
                $(".contact_box").css("top","calc(50% + 20px)");
                $(".contact_box h2").css("font-size","1.2em");
            } else {
                $(".about_txt").stop().css({"overflow-y":"hidden","height":"auto"});
            }
        }

        //tablet about_txt height setting
        if(abw <= 1040) {
            var ab_img_h = $(".about_img").height();
            var ab_inner_h = $(".about_inner").height();
            let ab_txt = ab_inner_h - ab_img_h;
            document.documentElement.style.setProperty('--ab_txt', `${ab_txt}px`);
        }

        if(abh <= 715 && abw <= 768) {
            $(".progress_wrap").css({"width":"200px","font-size":"16px"});
        
        }
    }

    ab_scroll();

    $(window).resize(function(){
        ab_scroll();
    });
});

//skills
$(function(){
    $('.skills_list li').eq(0).children("a").addClass("on")
    $(".skills_txt").hide();
    $(".skills_txt").eq(0).fadeIn();

    var doms = '';
    var $m = $('.progress');
    var $data = $m.find('span');
    var data = $('.skills_list li').eq(0).children("a").data('percent');
    var com = Math.round(data / 100 * 360);

    var getVendorPrefix = function() {
        var body = document.body || document.documentElement,
            style = body.style,
            transition = "Transition",
            vendor = ["Moz", "Webkit", "ms"],
            lastGage,
            i = 0;
        while (i < vendor.length) {
            if (typeof style[vendor[i] + transition] === "string") {
                return vendor[i];
            }
            i++;
        }
        return false;
    };
    var prefix = getVendorPrefix();
    var transform = prefix + 'Transform';


    for(var i=0; i <= com; i++){
        doms = '<div class="gage-bar"></div>';
        $m.append(doms);
        $('.gage-bar:last').css(transform, 'rotate(' + i + 'deg)');
    }

    $m.find('div').each(function(index, item){
        $(item).stop().delay(index * 5).fadeIn(50);
    });

    //Span number
    $data.text(data);

    $(".skills_list li a").click(function(){
        data = 0;
        com = 0;

        $(".skills_txt").hide();
        $(".gage-bar").remove();
        $('.skills_list li a').removeClass("on");

        var no = $(this).parent("li").index();
        $(".skills_txt").eq(no).show();
        $('.skills_list li').eq(no).children("a").addClass("on");

        var doms = '';
        var $m = $('.progress');
        var $data = $m.find('span');
        var data = $('.skills_list li').eq(no).children("a").data('percent');
        var com = Math.round(data / 100 * 360);
    
        var getVendorPrefix = function() {
            var body = document.body || document.documentElement,
                style = body.style,
                transition = "Transition",
                vendor = ["Moz", "Webkit", "ms"],
                lastGage,
                i = 0;
            while (i < vendor.length) {
                if (typeof style[vendor[i] + transition] === "string") {
                    return vendor[i];
                }
                i++;
            }
            return false;
        };
        var prefix = getVendorPrefix();
        var transform = prefix + 'Transform';
    
    
        for(var i=0; i <= com; i++){
            doms = '<div class="gage-bar"></div>';
            $m.append(doms);
            $('.gage-bar:last').css(transform, 'rotate(' + i + 'deg)');
        }
    
        $m.find('div').each(function(index, item){
            $(item).stop().delay(index * 5).fadeIn(50);
        });
    
        //Span number
        $data.text(data);
                
});
});

//work tab_menu
$(function(){
    $(".tab_list .work_btn").click(function(){
        var width = $(window).width();

        $(".tab_list .work_btn").removeClass("on");
        $(this).addClass("on");

        if(width <= 1040) {
            if($(this).hasClass("all")){
                $(".work_list li").show();
                $(".work_list li:odd").css("float","right");
            } else if($(this).hasClass("Reponsive")) {
                $(".work_list li").show();
                $(".item_R").fadeIn();
                $(".work_list li.item_R:odd").css("float","right");
            } else if($(this).hasClass("PC")) {
                $(".work_list li").hide();
                $(".item_P").show();
                $(".work_list li.item_P:odd").css("float","right");
            }
        } else {
            if($(this).hasClass("all")){
                $(".work_list li").show();
                $(".work_list li").addClass("all_on");
            } else if($(this).hasClass("Reponsive")) {
                $(".work_list li").hide();
                $(".item_R").show();
                $(".work_list li").addClass("all_R");
            } else if($(this).hasClass("PC")) {
                $(".work_list li").hide();
                $(".item_P").show();
                $(".work_list li").addClass("all_P");
            }
        }
    });

    $(".tab_list .all").trigger("click");

});

//contact copy 
$(function(){
    // 토스트 띄우기
    let removeToast;

    function toast(string) {
        const toast = document.getElementById("toast");

        toast.classList.contains("reveal") ?
            (clearTimeout(removeToast), removeToast = setTimeout(function () {
                document.getElementById("toast").classList.remove("reveal")
            }, 1000)) :
            removeToast = setTimeout(function () {
                document.getElementById("toast").classList.remove("reveal")
            }, 1000)
        toast.classList.add("reveal"),
            toast.innerText = "클립보드에 복사 되었습니다.";
    }


    //pc - phone number copy
    var filter = "win16|win32|win64|mac";

    $('.phone').click(function(e){
        if(navigator.platform){
            if(0 > filter.indexOf(navigator.platform.toLowerCase())){ // 모바일
                var tel = $('#phone').val();
                location.href = "tel:" + tel;
            } else { // pc
                $('#phone').select();
                
                try {
                    var successful = document.execCommand('copy');
                    toast();
                } catch (err) {
                    alert('이 브라우저는 지원하지 않습니다.');
                }
            }
        }
    });

    $('.kakao').click(function(e){

        $('#kakao').select();
        var successful = document.execCommand('copy');
        toast();
    });
});
