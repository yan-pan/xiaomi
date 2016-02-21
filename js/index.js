$(function(){
	var imgs=$(".navbox>img");
	var btn=$(".btn");
	var index=0;
	var navbox=$(".navbox");
	var left=$(".left");
	var right=$(".right");
	function move(type){
		if(type=="r"){
			index++;
			if(index>=imgs.length){
				index=0;
			}
		}else if(type=="l"){
			index--;
			if(index<=-1){
				index=imgs.length-1;
			}
		}
      imgs.hide();
      imgs.eq(index).fadeIn();
      btn.css({background:"#000"});
      btn.eq(index).css({background:"#fff"});

	}
	var t=setInterval(function(){
		move("r")},2000);

	navbox.hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(function(){
		move("r")},2000);
	})
    left.click(function(){
		move("l");
    })
    right.click(function(){
		move("r");
    })
    btn.hover(function(){
		var now=$(this).index();
		btn.css({background:"#ccc"})
        btn.eq(now).css({background:"#fff"});
        imgs.hide();
        imgs.eq(now).fadeIn();
        index=now;
	},function(){
	})
   


    var yiji=$(".yiji");
    var erji=$(".erji");
    yiji.hover(function(){
    	$(this).find("ul").stop();
    	$(this).find("ul").slideDown();
    },function(){
    	$(this).find("ul").stop();
    	$(this).find("ul").slideUp();
    })


var leftyiji=$(".leftyiji");
var lefterji=$(".lefterji");
leftyiji.hover(function(){
    	/*$(this).find("div").stop();*/
    	$(this).find("div").show();
    },function(){
    	/*$(this).find("div").stop();*/
    	$(this).find("div").hide();
    })


//小米明星单品
var num=0;
var mxl=$(".mxl");
var mxr=$(".mxr");
var mxtupian=$(".mxtupian");
function movell(){
	if(num==0){
	mxtupian.animate({left:"-1240px"});
	mxl.css({color:"#ccc"});
	mxr.css({color:"red"});
	num=1;
}else if(num==1){
	mxtupian.animate({left:"0"});
	mxr.css({color:"#ccc"});
	mxl.css({color:"red"});
	num=0;
}
}
var s=setInterval(function(){
	movell();
},5000);
mxl.hover(function(){
	clearInterval(s);
},function(){
	s=setInterval(function(){
		movell();
	},5000);
})
mxr.hover(function(){
	clearInterval(s);
},function(){
	s=setInterval(function(){
		movell();
	},5000);
})
mxl.click(function(){
	mxtupian.animate({left:"-1240px"});
	mxl.css({color:"#ccc"});
	mxr.css({color:"red"});
})
mxr.click(function(){
	mxtupian.animate({left:"0"});
	mxr.css({color:"#ccc"});
	mxl.css({color:"red"});
})

var dapei=$(".aa li");
var dapei2=$(".bb");
dapei.each(function(){
	var dd=$(this).index();
	dapei.eq(dd).hover(function(){
		dapei.eq(dd).each(function(){
			dapei2.hide();
			dapei.css({
				textDecoration:"none",color:"#333"
			})
			dapei.eq(dd).css({
				textDecoration:"underline",color:"#ff6700"
			})
			dapei2.eq(dd).show();
		})
	})
})






})