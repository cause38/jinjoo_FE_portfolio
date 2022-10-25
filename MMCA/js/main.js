//navigation
$(function () {
    $(".setting").click(function () {
        $(this).toggleClass("on");

        if ($(this).hasClass("on")) {
            $(".nav_black").stop().fadeIn();
            $("nav").stop().animate({
                bottom: "0"
            }, 500);

            $("nav a, .nav_black").click(function () {
                $(".nav_black").stop().fadeOut();
                $("nav").stop().animate({
                    bottom: "-100%"
                }, 500);
            });
        } else {
            $(".nav_black").stop().fadeOut();
            $("nav").stop().animate({
                bottom: "-100%"
            }, 500);
        }
    });

    var navstartY, navendY;

    $("nav").on('touchstart',function(event){
        navstartY = event.originalEvent.changedTouches[0].screenY;
    });

    $("nav").on('touchend',function(event){
        navendY=event.originalEvent.changedTouches[0].screenY;

        if (navendY - navstartY > 10) { //위에서 아래로
            $(".nav_black").stop().fadeOut();
            $("nav").stop().animate({
                bottom: "-100%"
            }, 500);
        } else if(navstartY-navendY<10 || navendY-navstartY<10 ){
            $(".nav_black").stop().fadeOut();
            $("nav").stop().animate({
                bottom: "-100%"
            }, 500);  
        }
    });    
});

$(function () {
    //liki btn
    $(".like").click(function () {
        $(this).toggleClass("on");
    });

    //select box
    $(".select_list").hide();
    $(".detail_elaborate p").hide();
    $(".detail_elaborate p").eq(0).show();
    $(".select").click(function () {
        $(".select").toggleClass("on");
        $(".select_list").slideToggle(450);
    });

    $("#detail .select_list li a").click(function () {
        var select_txt = $(this).text();
        var no = $(this).parent("li").index();
        document.getElementById("detail_select").innerHTML = select_txt;
        $("#detail .detail_elaborate p").hide();
        $("#detail .detail_elaborate p").eq(no).show();
        $(".select_list").slideUp(450);
    });

    //notice
    $(".notice_detail").hide();

    $("#notice ul li a").click(function () {
        $(this).toggleClass("on");
        $(this).siblings(".notice_detail").slideToggle(450);
    });
});

//tab menu
$(function () {
    $("#exhibition .tab_menu a").eq(1).addClass("on");
    $("#info .tab_menu a").eq(0).addClass("on");
    $("#mypage .tab_menu a").eq(0).addClass("on");
    $(".tab_item").hide();

    $(".tab_item").eq(1).show();
    $("#search .tab_item").show();
    $("#info .tab_item").eq(0).show();
    $("#mypage .tab_item").eq(0).show();

    //전시목록
    $("#exhibition .tab_menu a").click(function () {
        var no = $(this).index();
        $("#exhibition .tab_menu a").removeClass("on");
        $(this).addClass("on");
        $("#exhibition .tab_item").hide();
        $("#exhibition .tab_item").eq(no).show();
    });

    //관람안내
    $("#info .tab_menu a").click(function () {
        var no = $(this).index();
        $("#info .tab_menu a").removeClass("on");
        $(this).addClass("on");
        $("#info .tab_item").hide();
        $("#info .tab_item").eq(no).show();
    });

    //마이페이지
    $("#mypage .tab_menu a").click(function () {
        var no = $(this).index();
        $("#mypage .tab_menu a").removeClass("on");
        $(this).addClass("on");
        $("#mypage .tab_item").hide();
        $("#mypage .tab_item").eq(no).show();
    });
});

//detail slide
$(function () {
    $('#slide').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        infinite: true,
        dots: true,
        dotsClass: "slide_nav"
    });
});

//detail touch event
// $(function () {
//     var startY, endY;

//     $(".touch_box").on('touchstart',function(event){
//         startY = event.originalEvent.changedTouches[0].screenY;
//     });

//     $(".touch_box").on('touchend',function(event){
//         endY=event.originalEvent.changedTouches[0].screenY;

//         if(startY-endY>10){ //아래서 위로
//             $(".detail_txt").stop().animate({"margin-top":"-50vh"});        
//         } else if(endY-startY>10){ //위에서 아래로
//             $(".detail_txt").stop().animate({"margin-top":"-30px"});   
//         } else if(startY-endY<10 || endY-startY<10 ){
//             $(".detail_txt").stop().animate({"margin-top":"-30px"});   
//         }
//     });
    
//     $(".touch_box").click(function(){
//         $(this).toggleClass("on");
//         if($(this).hasClass("on")) {
//             $(".detail_txt").stop().animate({"margin-top":"-50vh"});
//         } else {
//             $(".detail_txt").stop().animate({"margin-top":"-30px"}); 
//         }
//     });
// });

//detail scroll
$(function () {
    var detail_top = $("#detail").scrollTop();

    if(detail_top >= 100) {
        $(".detail_txt").addClass("on");
    } else {
        $(".detail_txt").removeClass("on");
    }
});

//audio
$(function () {
const audioPlayer = document.querySelector(".audio-player");
const  audio = document.getElementById("myAudio");
//credit for song: Adrian kreativaweb@gmail.com

console.dir(audio);

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = .75;
  },
  false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

const before = audioPlayer.querySelector(".before");
before.addEventListener("click", e => {
  audio.currentTime = audio.currentTime - 10;
}, false);

const after = audioPlayer.querySelector(".after");
after.addEventListener("click", e => {
  audio.currentTime = audio.currentTime + 10;
}, false);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

$(".play").click(function(){
    $(this).toggleClass("on");

    if($(this).hasClass("on")) {
        audio.play();
        isPlaying = false;
    } else {
        audio.pause();
        isPlaying = true;
    }
});
    
//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
});

//map
$(function () {
    $("#map .select_list li a").click(function () {
        var select_txt = $(this).text();
        document.getElementById("map_select").innerHTML = select_txt;
        $(".select_list").slideUp(450);

        var selectpos1 = parseFloat($(this).siblings("span").eq(0).text());
        var selectpos2 = parseFloat($(this).siblings("span").eq(1).text());
        var startpos = new google.maps.LatLng(selectpos1, selectpos2);

        $("#map_canvas").gmap({
            "center": startpos,
            "zoom": 16
        });

        var selectpos1 = parseFloat($(this).siblings("span").eq(0).text());
        var selectpos2 = parseFloat($(this).siblings("span").eq(1).text());
        var startpos = new google.maps.LatLng(selectpos1, selectpos2);
        var markerRed = "http://www.google.com/intl/en_us/mapfiles/ms/icons/red-dot.png";

        var curMarker = $("#map_canvas").gmap("addMarker", {
            position: startpos,
            "icon": markerRed
        });

        $("#map_canvas").gmap("openInfoWindow", {
            "content": "<p class='place_name'>국립현대미술관<br/>" +
                select_txt +
                "</p><b class='place_tel'>tel:02-402-3562</b>"
        }, curMarker);
    });

    $(".first").trigger("click");
});