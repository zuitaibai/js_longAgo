/* <<<<<<<------  MeunStep [ by zjf 2011-10-22 verson1.1  QQ:383975892 ]  ------>>>>>>>> ===================================

 调用示例一：MeunStep("id1",".className1");
 调用示例二：MeunStep("id1","tagName1");
 调用示例三：MeunStep("id1",".className2",true);
 调用示例四：MeunStep("id1","tagName2",true,"cur");
 调用示例五：MeunStep("id1",".className3",true,"cur",false);
 参数：
 warpID：容器id 。如："nav"
 tagOrClass：容器下各子项要弹出的菜单标签名或class名，如果是标签名，直接传入形如"div"的标签字符串，如果是class名，则传入形如".each"的带点class名字符串
 isLastHide：[可选]  在鼠标最终移开时，最后弹出的那项子菜单是否隐藏。值为 true 或 false ，默认为true
 tabClass：[可选]  容器下各子项在做弹出菜单的同时，是否自己的class样式也变。如果传入值，则实施相应切换。值为class名的字符串，如"activeclass"
 isRemoveCur：[可选]  在鼠标移开时，该子项的样式class是否移除。值为 true 或 false ，默认为false
 注意：要把每弹出菜单写在容器的各子项内部。
 ===============================================================================================================*/
function MeunStep(warpID,tagOrClass,isLastHide,tabClass,isRemoveCur){
	var changCls=arguments[3]?true:false;
	var islasthide=true,isremoveCur=false;
	if(typeof arguments[2]=='boolean'){islasthide=arguments[2];}
	if(typeof arguments[4]=='boolean'){isremoveCur=arguments[4];}
	var nodes=document.getElementById(warpID).childNodes;
	var tabs=[];
	for(var a=0; a<nodes.length; a++){ if(nodes[a].nodeType==1) {tabs[tabs.length]=nodes[a];}}
	nodes=null;
	var len=tabs.length;
	
	for(var a=0; a<len; a++){	var newo=new mainOpreat(a); tabs[a].onmouseover=newo.onmouseOver; tabs[a].onmouseout=newo.onmouseOut; newo=null; }
	
	function mainOpreat(n){
		var visib='block',disvisib='none';
		this.onmouseOver=function(){
				for( var ii=0; ii<len; ii++){var cls=-1,dis=disvisib;if (n==ii){ cls=1; dis=visib;}tabChildVisibleDo(tabs[ii],dis);if(changCls){ changeClass(tabs[ii], tabClass ,cls);}}
		}
		this.onmouseOut=function(){
				for( var ii=0; ii<len; ii++){if(n==ii){	if(islasthide){tabChildVisibleDo(tabs[ii],disvisib);}	else{tabChildVisibleDo(tabs[ii],visib);}if(isremoveCur){changeClass(tabs[ii], tabClass ,-1);}break;}	}
		}
		function tabChildVisibleDo(ob,dis){
			var o2=[];if(tagOrClass.indexOf(".")!=-1){var str=tagOrClass.slice(1);	o2=getElementsByClassName(str,ob);}	else{o2=ob.getElementsByTagName(tagOrClass);}
			if(o2.length==1){o2[0].style.display=dis;}else if(o2.length>1){	for(var b=0; b<o2.length; b++){	o2[b].style.display=dis;} }
		}
		function changeClass(elements, value ,jiajian){
			if (!elements.className) { if (jiajian==1) { elements.className = value; } } 
			else{ var newClass = elements.className;	var arr=newClass.split(' ');var flag='no', newArr=[];
				for ( var ssi=0; ssi<arr.length; ssi++){newArr[ssi]=arr[ssi];if ( arr[ssi]==value ) { flag='yes'; newArr[ssi]='';}}
				if ( flag=='no' ) { if( jiajian==1 ){ newClass += " "; newClass += value; elements.className = newClass;	} }
				else{ if (jiajian==-1) { elements.className = newArr.join(' '); } }
			} 
		}
		function getElementsByClassName(claNme,o){
			var classElements = [],allElements = o.getElementsByTagName('*');
			for (var i=0; i< allElements.length; i++ ){
				if (allElements[i].className){
					var newClass = allElements[i].className;	var arr=newClass.split(' ');
					for ( var s=0; s<arr.length; s++ ){if ( arr[s] == claNme ){ classElements[classElements.length] = allElements[i]; break; }}
				}}
			return classElements;
		}
	}
}