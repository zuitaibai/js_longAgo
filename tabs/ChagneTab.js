/* <<<<<<<------  ChagneTab [ by zjf 2011-10-17 verson1.2  QQ:383975892 ]  ------>>>>>>>>  ===========================================

 调用示例一：ChagneTab('tabs','subShow','activeCls');
 调用示例二：ChagneTab('tabs','subShow');

 参数：
 id1：滑动区容器id 。
 id2：显示区容器id 。
 cur：[可选] 切换时滑动区当前活动子对象使用的class值，如果效果不需要此项，此参数可省略
 /*============================================================================================================================*/
function ChagneTab(id1,id2,cur){
	var obj1j=document.getElementById(id1).childNodes,obj2j=document.getElementById(id2).childNodes;
	var obj1=[],obj2=[];
	for(var a=0; a<obj1j.length; a++){ if(obj1j[a].nodeType==1) {obj1[obj1.length]=obj1j[a];}}
	for(var a=0; a<obj2j.length; a++){ if(obj2j[a].nodeType==1) {obj2[obj2.length]=obj2j[a];}}
	var len=Math.min(obj1.length,obj2.length);
	var changCls=arguments[2]?true:false;
	for ( var i=0; i<len; i++){var newO=new objc(i);	obj1[i].onmouseover=newO.fh;newO=null;	}
	
	function objc(n){
		this.fh=function(){
			for( var ii=0; ii<len; ii++){	var cls=-1,dis='none'; 	if (n==ii){ cls=1; dis='block';}if(changCls){ changeClass(obj1[ii], cur ,cls);}obj2[ii].style.display=dis;}
		}
	}
	
	function changeClass(elements, value ,jiajian){
		if (!elements.className) { if (jiajian==1) { elements.className = value; } } 
		else {	var newClass = elements.className;	var arr=newClass.split(' ');var flag='no', newArr=[];
			for ( var ssi=0; ssi<arr.length; ssi++){newArr[ssi]=arr[ssi];if ( arr[ssi]==value ) { flag='yes'; newArr[ssi]='';}}
			if ( flag=='no' ) { if( jiajian==1 ){ newClass += " "; newClass += value; elements.className = newClass;	} }
			else{ if (jiajian==-1) { elements.className = newArr.join(' '); }	}
		} 
	}
}