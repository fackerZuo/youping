window.onload=function(){
    var ww=document.documentElement.clientWidth;
    var $htmlw=$("html").width();

    //进入时候的视频

    var $videoBtn=$(".video-btn");
    var $invideo=$(".invideo");
    var $video=$(".invideo video")

    //banner轮播
    var $bannerimg=$(".banner-imgs .maxImg");
    var $bannerBtn=$(".banner-btn div");
    var $banner=$(".banner");
    var $bannerA=$(".banner-imgs a")//banner下面的a，用于点击时候banner的交互
    num=0;
    floor=-1;


    videoIn($invideo,$video,$videoBtn,5000,0,$bannerimg,$bannerBtn,$bannerA)//调用


    function videoIn(
        vedeobg,//放视频的盒子
        video,//播放的视频，需要是JQ对象
        btn,//点击可以跳过的按钮
        time,//跳过后banner的轮播时间
        n,//跳过后先显示banner的第几页,从0开始。
        bannerimg,//每页上最大的撑起来的(JQ)
        bannerBtn,//小圆点(JQ)
        bannerFather//用于交互时候加类名的父级元素(JQ)
    ){
        var s=setTimeout(invideo,16000);
        btn.click(function(){
            invideo();
        })
        function invideo(){
            $body.css({"width":"auto","height":"auto","position":"static","overflow":"visible"});
            vedeobg.animate({"opacity":0},function(){
                video[0].muted=true;
                vedeobg.hide();
                clearTimeout(s)
                //开始banner的轮播
                bannerimg.eq(n).css({opacity:1});//第一页显现
                bannerBtn.eq(n).addClass("banner-btn-hot");//第一个按钮圆形
                bannerFather.eq(n).addClass("animate")
                t=setInterval(move,time)
                $banner.hover(function(){
                    clearInterval(t)
                },function(){
                    t=setInterval(move,5000)
                });
            })
        }
    }
    function move(){
        $bannerBtn.eq(num).removeClass("banner-btn-hot");//清除前一个

        num++;
        if(num==$bannerimg.length){num=0;}
        $bannerimg.eq(num).animate({opacity:1},1000);
        $bannerA.eq(num).addClass("animate").removeClass("animateout");
        $bannerBtn.eq(num).addClass("banner-btn-hot");
        floor++;
        if(floor==$bannerimg.length){floor=0;}
        $bannerimg.eq(floor).animate({opacity:0},1000);//清除前一个  所有顺序都不能变
        $bannerA.eq(floor).removeClass("animate").addClass("animateout");
    }

    $bannerBtn.click(function(){
        var index=$(this).index();
        if(num==index){
            return;
        }
        $bannerimg.eq(num).animate({opacity:0},1000);
        $bannerimg.eq(index).animate({opacity:1},1000);
        $bannerA.eq(num).removeClass("animate").addClass("animateout");
        $bannerA.eq(index).addClass("animate").removeClass("animateout");
        $bannerBtn.eq(num).removeClass("banner-btn-hot")
        $bannerBtn.eq(index).addClass("banner-btn-hot");
        num=index;
    });
    //滚轮事件；
    //滚轮离开顶部nav定位；
    var $nav=$(".navbar")//nav的大框架
    var $navs=$(".container-main li");
    var $section=$("section");
    var $body=$("body,html");
    var scrollTopArr=[];
    var $scroll=$(".scroll");
    for(var i=0;i<$scroll.length;i++){
        scrollTopArr.push($scroll[i].offsetTop)//把每层到顶部的距离放到盒子里面
    }  

    //点击logo，返回top

    var $logo=$(".logo-click")
    $logo.click(function(){
        $body.animate({scrollTop:scrollTopArr[0]})
    })
    var wh=document.documentElement.clientHeight;
    var $userChose=$(".consumer-chose");
    var $userTop=$userChose[0].offsetTop;//5835
    $(window).scroll(function(){
        var scrollTop=$(window).scrollTop();
        //navbar的定位方式改变
        //滚动滚轮的时候nav下面的类名会跟着变
        for(var j=0;j<$section.length;j++){
            if(scrollTop>scrollTopArr[j]-wh*4/5){
                $navs.removeClass("hot").eq(j).addClass("hot")
            }
        }
    })


    var li=document.querySelectorAll(".technical-picture");
    r=$htmlw*5.5/15;//半径
    $(window).resize(function(){
        var $htmlw=$("html").width();
        r=$htmlw*5.5/15;//半径
    })
    if(r>=500){
         r=600;
    }
    var hu=180/Math.PI;//一个弧度  57.2957
    var deg=360/6;//当角度不是360的时候 是length-1 是360的时候不减1；
    var $dynamicTop=$(".dynamic").scrollTop();
    window.addEventListener("scroll",function(){
        var scrollTop=$(window).scrollTop();
        //什么是UP的滚轮事件
        if(scrollTop>scrollTopArr[1]-wh*1/3&&scrollTop<scrollTopArr[2]){  //鼠标滚到什么是UP的时候 东西弹出
            for(var i=0;i<li.length;i++){
                li[i].style.transition="all .5s "+i*0.1+"s";
                li[0].style.transform="translate("+Math.sin((1.15*deg)/hu)*r+"px,"+Math.cos((1.15*deg)/hu)*r+"px)";
                li[1].style.transform="translate("+Math.sin((1.85*deg)/hu)*r+"px,"+Math.cos((1.85*deg)/hu)*r+"px)";
                li[2].style.transform="translate("+Math.sin((4.15*deg)/hu)*r+"px,"+Math.cos((4.15*deg)/hu)*r+"px)";
                li[3].style.transform="translate("+Math.sin((4.85*deg)/hu)*r+"px,"+Math.cos((4.85*deg)/hu)*r+"px)";
            }
        }else if(scrollTop>scrollTopArr[2]+ww*1/3&&scrollTop<scrollTopArr[2]+ww*2/5){
            for(var i=0;i<li.length;i++){
                li[i].style.transition="all .5s "+(li.length-i)*0.1+"s";
                li[i].style.transform="translate(0,0) rotate(-360deg)";
            }
        }
    })

    var $dynamicTop=$(".dynamic").offset().top;
    window.addEventListener("scroll",function(){
        var scrollTop=$(window).scrollTop();
        console.log(scrollTop)
        if(scrollTop>1850){
            $userChose.addClass("animate")
        }
    })



    //点击nav跳转
    $navs.on("click",function(){
        var index=$(this).index();
        $navs.removeClass("hot").eq(index).addClass("hot");
    })
    $navs.on("click",function(){
        var index=$(this).index();
        if(index==2){
            return
        }
        if(index>2){
            var Top=index+2;
            $body.animate({scrollTop:$section.eq(Top).offset().top})
        }else{
            $body.animate({scrollTop:$section.eq(index).offset().top})
        }
    })
    var $product=$(".navbar-list a")
    $product.click(function(){
        var index=$(this).index();
        $body.animate({scrollTop:$section.eq(index+2).offset().top})
    })








//城市大屏

    //function cityScreen(
    //
    //){
    //
    //}


    var $prouctsImgs=$(".proucts-imgs") //存放所有照片的大盒子
    var $prouctsImgBox=$(".proucts-imgbox")//放两个照片的div
    var $prouctsLeft=$(".Arrow-left");
    var $prouctsRight=$(".Arrow-right");
    $prouctsImgBox.width(ww*1/3)
    var imgW=$prouctsImgBox.width();
    var imgnow=imgW+10;
    $prouctsImgBox.css({width:imgW})
    $prouctsImgs.css({width:imgnow*$prouctsImgBox.length})//让包图片的盒子款子正好包住图片

    $(window).resize(function(){//这里加上这个为了用户在小平时候打开，最大化后会出现问题
        var ww=document.documentElement.clientWidth;
        $prouctsImgBox.width(ww*1/3);
        var imgW=$prouctsImgBox.width();
        var imgnow=imgW+10;
        $prouctsImgBox.css({width:imgW})
        $prouctsImgs.css({width:imgnow*$prouctsImgBox.length})//让包图片的盒子款子正好包住图片
    })




    var falg=true;
    $prouctsLeft.click(function(e){//先让最后一个图片marginleft变为负的一个图片，然后查到第一个，在变成marginleft0
        if(falg==true){
            falg=false;
            var action = $(".proucts-imgs").attr('rel');
            $(".proucts-imgbox:last-child").css({marginLeft:-imgnow}).prependTo($prouctsImgs).animate({marginLeft:0},{
                easing: action,
                duration:1500,
                complete:function(){
                    falg=true;
                }
            })
        }
    })
    $prouctsRight.click(function(){
        if(falg==true){
            falg=false;
            var action = $(".proucts-imgs").attr('rel');
            $(".proucts-imgbox:first-child").animate({marginLeft:-imgnow},{
                easing: action,
                duration:1500,
                complete:function(){
                    falg=true;
                    $(this).appendTo($prouctsImgs).css({marginLeft:0});
                }
            })
        }
    })




//取消浏览器的默认动作
    var $ALLIMG=$("img");
    $ALLIMG.mousedown(function(e){
        e.preventDefault();
    })
    document.body.onselectstart=document.body.ondrag=function(){//文字不能点击
        return false;
    }




// //将asrc属性的值赋值给src
//   for(var y=0;y<leftChose.length;y++){
//     // console.log(y)
//     if(stop>=leftarr[y]){
//       getImg(y)
//     }
//   }
// function getImg(y){
//   var imgs=leftChose[y].getElementsByTagName("img")//获取每层的img
//   console.log(imgs);
//   for(var j=0;j<imgs.length;j++){
//     imgs[j].src=imgs[j].getAttribute("asrc");
//     // console.log(imgs.length)
//   }
// }


//返回顶部
//        var solidFoot=$(".rightsolidsixtop")[0];
//        solidFoot.onclick=function(){
//            animate(doc,{scrollTop:0},500)
//        }
//
//    }


    //什么是"UP"的白背景控制
    var $technical=$(".technical")
    bgauto($technical)
    function bgauto(
        bg//需要控制高度的东西
    ){
        var tw=bg.width();
        bg.height(tw*1000/1920);
        $(window).resize(function(){
            var tw=bg.width();
            bg.height(tw*1000/1920);
        })
    }
    $("#submit").click(function(){
        var txt="UP优屏感谢您的宝贵意见";
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
    })
}
