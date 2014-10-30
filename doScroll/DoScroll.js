/*************************** DoScroll ( zjf 据已有function改装，2011-10-29 ，QQ:383975892 ) ******************************************
参数：
	必选参数：
		warpId    --    界面容器id
		listId    --    滚动容器id
		sWidth    --    滚动时一个滚动单位宽度(px)
	可选参数：以对象字面量的形式传值。
		direct    --    初始滚动方向 ，'right'--右，其它字符串--左 ， 默认为左
		waittime  --    间隔时间(ms) ，默认为2000
		speed     --    速度(ms) ，默认为30
		space     --    频率移动量(px) ，默认为10
		fill      --    整体左移位,只能是正数(px) ，默认为0
		leftbtn   --    左按钮id
		rightbtn  --    右按钮id
调用示例：
	DoScroll('warp',"List1",300,{direct:'left',leftbtn:'lt',rightbtn:'rt',speed:30,waittime:1000,space:10,fill:0});
	DoScroll('warp',"List1",250,{rightbtn:'rt2',fill:0});
	DoScroll('warp',"List1",100);
***************************************************************************************************************************************/
function  DoScroll(warpId,listId,sWidth,obj){
	var waittime=2000,speed=30,space=10,fill=0,Comp=0,direct='';
	if(arguments[3]){
		waittime=obj.waittime||waittime;speed=obj.speed||speed;space=obj.space||space;fill=obj.fill||fill;direct=obj.direct||direct;
		if(obj.leftbtn){var $lt=GetObj(obj.leftbtn);$lt.onmousedown=ISL_GoLeft;$lt.onmouseup=ISL_StopLeft;$lt=null;}
		if(obj.rightbtn){var $rt=GetObj(obj.rightbtn);	$rt.onmousedown=ISL_GoRight;$rt.onmouseup=ISL_StopRight;$rt=null;}
	}
	var warpObj=GetObj(warpId),$list=GetObj(listId),MoveLock=false,AutoPlayObj=null,MoveTimeObj;
	var $copylist=$list.cloneNode(true);$copylist.id='';
	var $p=$list.parentNode;$p.style.width='10000000px';$p.style.overflow='hidden';$p.style.zoom='1';$p.appendChild($copylist);$p=null;$copylist=null;
	warpObj.scrollLeft=fill;
	warpObj.onmouseover=function(){clearInterval(AutoPlayObj);};warpObj.onmouseout=function(){AutoPlay();};	
	AutoPlay();
	function AutoPlay(){clearInterval(AutoPlayObj);AutoPlayObj=setInterval(gossd,waittime);}
	function gossd(){if(direct=='right'){ISL_GoRight();ISL_StopRight();}else{ISL_GoLeft();ISL_StopLeft();}}
	function ISL_ScrLeft(){if(warpObj.scrollLeft>=$list.scrollWidth){warpObj.scrollLeft=warpObj.scrollLeft-$list.scrollWidth;}warpObj.scrollLeft+=space;}
	function ISL_ScrRight(){if(warpObj.scrollLeft<=0){warpObj.scrollLeft=warpObj.scrollLeft+$list.offsetWidth}warpObj.scrollLeft-=space;}
	function ISL_GoLeft(){clearInterval(MoveTimeObj);if(MoveLock){return;}clearInterval(AutoPlayObj);MoveLock=true;ISL_ScrLeft();MoveTimeObj=setInterval(ISL_ScrLeft,speed);}
	function ISL_StopLeft(){clearInterval(MoveTimeObj);if(warpObj.scrollLeft%sWidth-fill!=0){Comp=sWidth-warpObj.scrollLeft%sWidth+fill;CompScr();}else{MoveLock=false;}AutoPlay();}
	function ISL_GoRight(){clearInterval(MoveTimeObj);if(MoveLock){return;}	clearInterval(AutoPlayObj);MoveLock=true;ISL_ScrRight();MoveTimeObj=setInterval(ISL_ScrRight,speed);}
	function ISL_StopRight(){clearInterval(MoveTimeObj);	if(warpObj.scrollLeft%sWidth-fill!=0){	Comp=fill-(warpObj.scrollLeft%sWidth);CompScr();}else{MoveLock=false;}AutoPlay();}
	function CompScr(){var num;if(Comp==0){MoveLock=false;return;}else if(Comp<0){if(Comp<-space){Comp+=space;num=space;}else{num=-Comp;Comp=0;}warpObj.scrollLeft-=num;setTimeout(CompScr,speed);}else if(Comp>0){if(Comp>space){Comp-=space;num=space;}else{num=Comp;Comp=0;}warpObj.scrollLeft+=num;setTimeout(CompScr,speed);}}
	function GetObj(id){if(document.getElementById(id)){return document.getElementById(id)}else{alert('请正确设置id值！');return;}}
}