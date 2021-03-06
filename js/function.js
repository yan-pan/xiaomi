//兼容函数
//1.解决IE8不能通过类名来获取html元素.getElementsByClassName
//getClass获取类名
   function getClass(classname,obj){
    	var obj=obj||document;
    	if(obj.getElementsByClassName){//判断是W3C浏览器
    		return obj.getElementsByClassName(classname);//结果返回
    	}else{//否则是IE8
    		var all=obj.getElementsByTagName("*");//用标签名先获取到所有元素,是一个集合
    		var arr=[];//新数组,用来保存找到的元素
    		for(var i=0;i<all.length;i++){//遍历这个all
    			if(checkRel(all[i].className,classname)){
                   arr.push(all[i]);
    			}

    		}
    		return arr;
    	}
    	
    }
    //参数说明:str:多个类名集合以后的字符串
    //           val:想找的类名
    function checkRel(str,val){
     var newarr=str.split(" ");//字符串转换成数组,以空格拆分
     for(var i=0;i<newarr.length;i++){
        if(newarr[i]==val){
        	return true;
        }
     }
     return false;
    }
    // var obj=getClass("bigbox")[0];
    // var bigbox=getClass("bigbox");
    // alert(bigbox.length);

    /*2.可以获取与设置纯文本的兼容函数
    obj:哪个对象用这个函数
    val:接收第二个参数，表示设置一个
    */
    function getText(obj,val){//undefined
        if(val==undefined){//如果val为undefined，表示只有一个参数，这个函数实现的功能获取文本
            if(obj.innerText){//如果为真是IE8浏览器
                return obj.innerText;
            }else{//是W3C浏览器
                return obj.textContent;
            }
        }else{
             if(obj.innerText||obj.innerText==""){/*IE8，当浏览器有innerText这个属性时，
                或者当对象的内容为空字符串时，都可以给这个对象设置文本*/
                obj.innerText=val;
            }else{//是W3C浏览器
               obj.textContent=val;
            }
        }
    }


    //3.获取样式
    //abj:哪个对象  attr：哪个对象
    function getStyle(obj,attr){
        if(obj.currentStyle){//IE8
            return obj.currentStyle[attr];
        }else{//W3C
            return getComputedStyle(obj,null)[attr];
        }
    }


    /*4.$(".box");类名
    $("#first");ID名
    $("div");标签名*/
    function $(select,obj){
        var obj=obj||document;
        if(typeof select=="string"){
            select=select.replace(/^\s*|\s*$/g,"");//去掉前后空格1
            if(select.charAt(0)=="."){
                return getClass(select.slice(1),obj);
               }else if(select.charAt(0)=="#"){
                return obj.getElementById(select.slice(1));
            }else if(/^[a-z|1-6]{1,10}$/g.test(select)){
                return obj.getElementsByTagName(select);
            }
        }else if(typeof select=="function"){//表示是一个函数
                window.onload=function(){
                    select();
                }
        }
    }



    /*5.getChild(parent);
      "a":获取元素子节点的兼容问题
      "b":获取元素+文本节点
      //先获取所有的儿子，然后根据节点的类型判断，如果为1，表示元素节点
    */
    function getChilds(parent,type){
        var type=type||"a";
        var childs=parent.childNodes;//所有儿子
        var arr=[];
        for(var i=0;i<childs.length;i++){
            if(type=="a"){
                if(childs[i].nodeType==1){
                arr.push(childs[i]);
            }
        }else if(type=="b"){
            if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
              arr.push(childs[i]);
           }
        }
          
        }
         return arr; 
    }


    //6.获得第一个子节点
    function getFirst(parent){
        return getChilds(parent)[0];
    }
    //7.获得最后一个子节点
    function getLast(parent){
        return getChilds(parent)[getChilds(parent).length-1];
    }
    //8.获得一个指定子节点
    function getNum(parent,num){
        return getChilds(parent)[num];
    }
    //9.获得下一个兄弟子节点
    function getNext(obj){
        var next=obj.nextSibling;
        if(next==null){
                return false;
            }
        while(next.nodeType==3||next.nodeType==8){
            next=next.nextSibling;
            if(next==null){
                return false;
            }
        }
        return next;
    }
    //10.获得上一个兄弟子节点
     function getUp(obj){
        var up=obj.previousSibling;
        if(up==null){
            return false;
        }
        while(up.nodeType==3||up.nodeType==8){
            up=up.previousSibling;
            if(up==null){
            return false;
        }
        }
        return up;
    }


    //11.插入到某个对象之后
    //对象.insertBefore(obj,obj1)
    //插入到下一个对象之前
    /*原理:找到第二个参数的下一个兄弟节点，
    将第一个参数插入到此兄弟节点之前（插入到下一个对象之前）*/
    //obj1:要插入的对象
    //obj2:哪个对象之后
     Object.prototype.insertAfter=function(obj1,obj2){
        var next=getNext(obj2);
        if(next){
            this.insertBefore(obj1,next);
        }else{
            this.appendChild(obj1);
        }
     }


     //12.获取滚动条与页面顶部的距离
     /*window.onscroll=function(){
        var th=document.documentElement.scrollTop;
        var gh=document:document.body;
        //方法一
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;

        //方法二
        var  scrollT=document.documentElement.scrollTop||document.body.scrollTop;
        document.title=scrollT;
     }*/
     function getScrollT(){
        var  scrollT=document.documentElement.scrollTop||document.body.scrollTop;
        return scrollT;
     }
     /*var scrollT=getScrollT();
    document.title=scrollT;*/


    //13.同一元素添加多个事件的方法
   /* obj:给哪个事件添加
    ev:什么事件
    fun:事件处理程序*/
    function addEvent(obj,ev,fun){
      if(obj.addEventListener){
        return obj.addEventListener(ev,function(){
            fun.call(obj);},false);
      }else{
        return obj.attachEvent("on"+ev,function(){
            fun.call(obj);
        });//在IE8中，this不指当前对象，指的是window
    }
    }

    //14.同一元素删除多个事件的方法
    /*function removeEvent(obj,ev,fun){
      if(obj.removeEventListener){
        return obj.removeEventListener(ev,function(){
            fun.call(obj);},false);
      }else{
        return obj.detachEvent("on"+ev,function(){
            fun.call(obj);
        });//在IE8中，this不指当前对象，指的是window
    }
    }*/


    //15.
    function getCW(){
        return document.documentElement.clientWidth;
    }
    function getCH(){
        return document.documentElement.clientHeight;
    }

    //事件对象阻止浏览器默认行为
    function drag(obj){
    if(ev.preventDefault){
        ev.preventDefault(); //阻止默认浏览器动作(W3C)
       }  
        else{
    ev.returnValue = false;//IE中阻止函数器默认动作的方式
       }
}


/*obj:哪个对象添加滚轮事件
upfun:处理滚轮向上的函数
downfun:处理滚轮向下的函数*/
function mouseWheel(obj,upfun,downfun){
if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn);  //IE、opera
     }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);  
     //chrome,safari    -webkit-
        obj.addEventListener("DOMMouseScroll",scrollFn,false);  
     //firefox     -moz-
     }
     function scrollFn(e){
        var ev=e||window.event;
        if (ev.preventDefault ) {
      ev.preventDefault()//阻止默认浏览器动作(W3C) 
      }else{
        ev.returnValue = false;
      }
        var num=ev.detail||ev.wheelDelta;
        if(num==-3||num==120){
            if(upfun){
                upfun();
            }
        }
        if(num==3||num==-120){
            if(downfun){
                downfun();
            }
        }
     }
}


//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/