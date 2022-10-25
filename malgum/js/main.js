$(document).ready(function(){
    $(".mAllMenu>ul").removeClass("mX");
    $(".navWrap").removeClass("on");
    
    var s = 1;

    $(".mAllMenu>ul").click(function() {
        $(this).toggleClass("mX");


        if(s==1) {
            $(".navWrap").addClass("on");
            $(".navWrap").stop().animate({left:0},500);
            
            s=0;
        } else {   
            $(".navWrap").removeClass("on");
            $(".navWrap").stop().animate({left:'-100%'},500);
            s=1;
        }

        if($(".mAllMenu>ul").hasClass("mX")){
            $("nav>ul>li").unbind('mouseenter mouseleave').bind('click', function(){
                $(this).children('a').toggleClass("on");
                
                if($(this).children('a').hasClass("on")) {
                    $("nav>ul>li").eq(0).children("a").removeClass("on");
                    $(this).children(".sub").stop().slideDown();
                } else {
                    $(this).children(".sub").stop().slideUp();
                }
            });
            
            return false;
    
        } else {
            $(".sub").show();
            $(".sub").hide();

            $("nav>ul>li").unbind('click').bind('mouseenter',function(){
                $(this).children(".sub").stop().show();
            });
                
            $("nav>ul>li").unbind('click').bind('mouseleave',function(){
                $(this).children(".sub").stop().hide();
            });
            
            return false;
        }
    });

    
        



    //topBtn
    $(".topBtn").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });


});
