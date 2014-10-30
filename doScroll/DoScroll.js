/*************************** DoScroll ( zjf ������function��װ��2011-10-29 ��QQ:383975892 ) ******************************************
������
	��ѡ������
		warpId    --    ��������id
		listId    --    ��������id
		sWidth    --    ����ʱһ��������λ���(px)
	��ѡ�������Զ�������������ʽ��ֵ��
		direct    --    ��ʼ�������� ��'right'--�ң������ַ���--�� �� Ĭ��Ϊ��
		waittime  --    ���ʱ��(ms) ��Ĭ��Ϊ2000
		speed     --    �ٶ�(ms) ��Ĭ��Ϊ30
		space     --    Ƶ���ƶ���(px) ��Ĭ��Ϊ10
		fill      --    ��������λ,ֻ��������(px) ��Ĭ��Ϊ0
		leftbtn   --    ��ťid
		rightbtn  --    �Ұ�ťid
����ʾ����
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
	function GetObj(id){if(document.getElementById(id)){return document.getElementById(id)}else{alert('����ȷ����idֵ��');return;}}
}