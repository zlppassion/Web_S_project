/*声明全局变量*/
var index=0,/*当前显示图片的索引，默认值为0*/
	prev=byId("prev"),//上一张
	next=byId("next"),//下一张
	main=byId("main"),
	menuConent=byId("menu-content"),
	subMenu=byId("sub-menu"),
	banner=byId("banner"),
	menuItems=menuConent.getElementsByClassName("menu-item"),
	timer=null,
	pics=byId("banner").getElementsByTagName("div"),
	dots=byId("dots").getElementsByTagName("span"),
	innerBox=subMenu.getElementsByClassName("inner-box"),
	size=pics.length;


//封装getElementById()
function byId(id){
	return typeof(id) === "string" ? document.getElementById(id):id;
}

/*封装通用时间绑定方法，element是绑定事件的DOM元素，
				事件名
				事件处理程序*/
function addHandler(element,type,handler){
	//非IE浏览器
	if(element.addEventListener){
		element.addEventListener(type,handler,true);/*非IE是从外到内的捕获过程，所以true*/
	}else if(element.attachEvent){
		//IE浏览器支持DOM2级
		element.attachEvent("on"+type,handler);
	}else{
		//IE浏览器（较老），不支持DOM2级.任何用.的地方可以用中括号替代，这里type是变量，不能直接用.
		element["on"+type]=handler;
	}
}
//清除定时器。停止自动轮播
function stopAutoPlay(){
	if(timer){
		clearInterval(timer);
	}
}
//自动轮播
function startAutoPlay(){
	timer=setInterval(function(){
		index++;
		if(index>=size) index=0;
		changeImg();
	},3000)
}
//切换图片
function changeImg(){
	for(var i=0;i<size;i++){
		pics[i].style.display="none";
		dots[i].className="";
	}
	pics[index].style.display="block";
	dots[index].className="active";
}

//点击下一张按钮显示下一张图片
addHandler(next,"click",function(){
	index++;
	if(index>=size) index=0;
	changeImg();
	
})
//点击上一张按钮显示上一张图片
addHandler(prev,"click",function(){
	index--;
	if(index<0) index=size-1;
	changeImg();
	
})
//点击圆点索引切换图片
for(var d=0;d<size;d++)
{
	dots[d].setAttribute("data-id",d);
	addHandler(dots[d],"click",function(){
		index=this.getAttribute("data-id");
		changeImg();
	})
}
//鼠标滑过主菜单
for(var m=0,idx,mlen=menuItems.length;m<mlen;m++)
{
	//给所有主菜单定义属性，表明它的索引
	menuItems[m].setAttribute("data-index",m);
	addHandler(menuItems[m],"mouseover",function(){
		//显示子菜单所在的背景
		subMenu.className="sub-menu";
		//获取当前主菜单的索引
		idx=this.getAttribute("data-index");
		///alert(idx);
		//遍历所有的子菜单innerBox,将他们隐藏
		for(var j=0,jlen=innerBox.length;j<jlen;j++)
		{
			innerBox[j].style.display="none";
			menuItems[j].style.background="none";
		}
		
		innerBox[idx].style.display="block";
		menuItems[idx].style.background="rgba(0,0,0,0.1)";
	})
}
//鼠标离开Banner，子菜单隐藏
addHandler(banner,"mouseout",function(){
	subMenu.className="sub-menu hide";
})
//鼠标离开主菜单menu-content，子菜单隐藏
addHandler(menuConent,"mouseout",function(){
	subMenu.className="sub-menu hide";
})
//鼠标划入子菜单时，子菜单显示
addHandler(subMenu,"mouseover",function(){
	this.className="sub-menu";
})
//鼠标划出子菜单时，子菜单显示
addHandler(subMenu,"mouseout",function(){
	this.className="sub-menu hide";
})
//鼠标划入main,停止轮播
addHandler(main,"mouseover",stopAutoPlay);
//鼠标离开main,继续轮播
addHandler(main,"mouseout",startAutoPlay);
startAutoPlay();