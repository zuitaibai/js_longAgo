/* <<<<<<<------  FocusPic [ by zjf 2011-10-17 verson1.2  QQ:38395892 ]  ------>>>>>>>> ===================================

调用示例一：FocusPic('pic1','pic2',3000,'hover','red_class','pic3');
调用示例二：FocusPic('pic1','num',3000,'click','red_class');

参数：
	id1：图片区容器id 。		
	id2：数字索引（或缩略图）区容器id 。
	timers：定时器，1000=1秒
	onwhats：触发事件的方式。值为两个"click"或"hover"。决定当鼠标移入或是点击进行切换
	cur：切换时数字索引（或缩略图）区当前活动子对象使用的class值
	id3：[可选]  文本区容器id 。如果没有文本显示区，此参数可省略
===============================================================================================================*/
function FocusPic(id1,id2,timers,onwhats,cur,id3){
	var picW=document.getElementById(id1),numW=document.getElementById(id2),txtW=null;
	var picNs=picW.childNodes,numNs=numW.childNodes;
	var pics=[],nums=[],txts=[],onwhat=onwhats||'hover',timer=timers||3000;
	for(var a=0;a<picNs.length;a++){if(picNs[a].nodeType==1){pics[pics.length]=picNs[a];}}
	for(var a=0;a<numNs.length;a++){if(numNs[a].nodeType==1){nums[nums.length]=numNs[a];}}
	var p=0,len=Math.min(nums.length,pics.length),ifId3=arguments[5]?true:false,ifCur=arguments[4]?true:false;
	if(ifId3){txtW=document.getElementById(id3);var txtNs=txtW.childNodes;for(var a=0;a<txtNs.length;a++){if(txtNs[a].nodeType==1){txts[txts.length]=txtNs[a];}}len=Math.min(nums.length,pics.length,txts.length);}
	for(var i=0;i<len;i++){var no=new objs(i);if(onwhat=='hover'){nums[i].onmouseover=no.fo;}	else if(onwhat=='click'){nums[i].onmousedown=no.fo;}	no=null;}
	function objs(m){this.fo=function(){for(var i=0;i<len;i++){var dis='none',cls=-1;if(i==m){dis='block';cls=1;p=i;}if(ifCur){changeClass(nums[i],cur,cls);}pics[i].style.display=dis;if(ifId3){txts[i].style.display=dis;}}};}
	function gos(){if(p==len){p=0}	if(onwhat=='hover'){nums[p].onmouseover();}else if(onwhat=='click'){nums[p].onmousedown();}p++;}
	var gogo=setInterval(gos,timer),fn2=function(){clearInterval(gogo);},fn3=function(){gogo=setInterval(gos,timer);};
	if(onwhat=='hover'){addEvent(numW,'mouseover',fn2);addEvent(numW,'mouseout',fn3);addEvent(picW,'mouseover',fn2);addEvent(picW,'mouseout',fn3);}
	else if(onwhat=='click'){addEvent(numW,'mousedown',fn2);addEvent(numW,'mouseup',fn3);addEvent(picW,'mousedown',fn2);addEvent(picW,'mouseup',fn3);}
	function addEvent(obj,type,fn){if(obj.addEventListener){obj.addEventListener(type,fn,false);}else if(obj.attachEvent){obj["e"+type+fn]=fn;obj.attachEvent("on"+type,function(){obj["e"+type+fn]();});}}
	function changeClass(elements,value,jiajian){if(!elements.className){if(jiajian==1){elements.className=value;}}else{var newClass=elements.className;	var arr=newClass.split(' ');var flag='no',newArr=[];for(var ssi=0;ssi<arr.length;ssi++){newArr[ssi]=arr[ssi];if(arr[ssi]==value){flag='yes';newArr[ssi]='';}}	if(flag=='no'){if(jiajian==1){newClass+=" ";newClass+=value;elements.className=newClass;}}else{if(jiajian==-1){elements.className=newArr.join(' ');}}}}
}