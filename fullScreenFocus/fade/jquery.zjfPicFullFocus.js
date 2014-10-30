/**
 * name: zjfPicFullFocus
 * author: zjf  qq:383975892
 * Date: 2012-11-13
 * version: 0.1
 * explain:
 *  本插件适合横向满屏焦点图左右滚动，未做其他效果扩展。未做不当环境容错处理
 *  本插件不参与左右按钮、tab导航的css样式及位置计算，插件全部参数可选
 *  使用示例：
        <div id="btnlt" class="btn btnl" title="向左"></div> <!-注：可选-->
        <div id="btnrt" class="btn btnr" title="向右"></div> <!-注：可选-->
        <ul id="tab" class="tab"><li>1</li><li>2</li><li>3</li><li>4</li></ul> <!-注：可选-->
        <div id="con" class="con"> <!-注：最好.con{overflow:hidden;height:指定;}，这样可以防止在页面未加载完成js没有起效时众多img竖排撑破容器高度，造成页面暂时性不美观-->
            <img src="img/1.jpg" href="http://www.baidu.com" alt="" />
            <img src="img/2.jpg" href="http://www.sina.com" alt="" />
            <img src="img/3.jpg" width="1500" alt="" />
            <img src="img/4.jpg" height="397" href="http://www.163.com" alt="" />
        </div>
 *  如果想带链接，请在img上加href属性；target方式可以在调用插件时参数设定，如果在img上加target属性，则其优先级大于前者，适于分别设定不同的打开目标。
 *  调用示例
        ① $('#con').zjfPicFullFocus();
        ② $('#con').zjfPicFullFocus({
                delay:4000,                            // 停滞时间 ，默认4000ms
                speed:800,                             // 一帧动画完成时间 ，默认800ms
                eType:'click',                         // tab导航项上鼠标切换方式， 默认'click'  可选值：'click'、'mouseover'
                haslink:true,                          // 每张图是否带链接，默认为ture
                atarget:'_blank',                      // 每张图链接的打开目标， 默认为'_blank'  可选值为<a>链接的所有target属性值
                autostart:true,                        // 动画是否自动切， 默认为true
                tabUl:'tab',                           // tab导航容器id
                autodirection:'left',                  // 自动动画切换方向，默认 left  可取值：'left'、'right'
                tabActiveClass:'cur',                  // 当前活动tab项的cssClass值
                controlBtn:['btnlt','btnrt'],          // 左右按钮的id
                controlOnmouseoverClass:'btnhover'     // 左右按钮在鼠标移上时的cssClass
                onmouseoverStopType: 'both'            // 鼠标悬停在何类型元素上，动画暂停。 默认为'both'  可选值 'mainpic'、'tabs'、'both'
            });
 */
(function($){
    $.fn.zjfPicFullFocus = function(options) {
        var $this=$(this), defaults={
            delay:4000,speed:800,eType:'click',haslink:true,atarget:'_blank',autostart:true,autodirection:'left',controlBtn:undefined,
            controlOnmouseoverClass:undefined,tabUl:undefined,tabActiveClass:undefined,onmouseoverStopType:'both'
        }, opts = $.extend(defaults, options);
        var imgs=$this.find('img'), l=imgs.length, w=$(window).width(), h=opts.height||imgs.height()||imgs[0].height||$this.css('height'),
            ul=$('<ul />').css({position:'relative',width:w+'px',height:h+'px',overflow:'hidden','zoom':'1'});
        imgs.each(function(i){
            var li=$('<li />').css({position:'absolute',width:w+'px',height:h+'px',left:(i==0?0:-w)+'px',top:0,background:'url('+$(this).attr('src')+') no-repeat center top'});
            var imgwt=$(this).width()||w; imgwt=imgwt>w?w:imgwt; var tar=$(this).attr('target')||opts.atarget;
            if(opts.haslink&&$(this).attr('href')) $('<a />').attr({href:$(this).attr('href'),target:tar}).css({width:imgwt+'px',height:h+'px',margin:'0 auto',display:'block'}).appendTo(li);
            ul.append(li);
        });
        $this.empty().append(ul);
        var lis=ul.find('li'), cur= 0, nextcur= 0,flag=false,curd='left', curd0=opts.autodirection ,timer=null;
        var loops=function(){
            clearTimeout(timer);
            if(curd0=='left'){ curd='left'; nextcur+=1; if(nextcur>l-1) nextcur=0; move(); }else{ curd='right'; nextcur-=1; if(nextcur<0) nextcur=l-1; move(); }
            if(opts.tabUl) tabs.removeClass(opts.tabActiveClass).eq(nextcur).addClass(opts.tabActiveClass);if(opts.autostart) timer=setTimeout(loops,opts.delay);
        };
        var move=function(istabhover){
            flag=true; if(istabhover){ flag=false; lis.stop(true).not(':eq('+cur+')').css('left',-w+'px'); }
            if(curd=='left'){ lis.eq(cur).animate({left:-w+'px'},opts.speed); lis.eq(nextcur).css({left:w+'px',display:'block'}).animate({left:0},opts.speed,function(){flag=false;}); }
            else{ lis.eq(cur).animate({left:w+'px'},opts.speed); lis.eq(nextcur).css({left:-w+'px',display:'block'}).animate({left:0},opts.speed,function(){flag=false;}); }
            cur=nextcur;
        };
        if(opts.tabUl){
            var tabs=$('#'+opts.tabUl+' li');tabs.eq(0).addClass(opts.tabActiveClass); if(tabs.length!=lis.length) alert('全屏焦点图：tab导航项数目与图片数目不一致！');
            tabs.each(function(i){
                var th=$(this); th.bind(opts.eType,function(){
                    if(flag||th.hasClass(opts.tabActiveClass)) return; clearTimeout(timer);tabs.removeClass(opts.tabActiveClass).eq(i).addClass(opts.tabActiveClass);
                    nextcur=i; if(i>cur) curd='left'; else curd='right'; var bl=false; if(opts.eType=='mouseover') bl=true; move(bl);
                });
            });
            if(opts.autostart&&(opts.onmouseoverStopType=='both'||opts.onmouseoverStopType=='tabs')){ $('#'+opts.tabUl).hover( function(){ clearTimeout(timer); }, function(){ timer=setTimeout(loops,opts.delay); }); }
        }
        if(opts.controlBtn){
            var mouseoverClass=opts.controlOnmouseoverClass;
            $('#'+opts.controlBtn[0]).click(function(){
                if(flag) return; clearTimeout(timer); curd='right'; nextcur=cur-1; if(nextcur<0)  nextcur=l-1; if(opts.tabUl) tabs.removeClass(opts.tabActiveClass).eq(nextcur).addClass(opts.tabActiveClass);move();
            });
            $('#'+opts.controlBtn[1]).click(function(){
                if(flag) return; clearTimeout(timer); curd='left'; nextcur=cur+1; if(nextcur>l-1) nextcur=0; if(opts.tabUl) tabs.removeClass(opts.tabActiveClass).eq(nextcur).addClass(opts.tabActiveClass); move();
            });
            if(mouseoverClass) $('#'+opts.controlBtn[0]+',#'+opts.controlBtn[1]).hover(function(){ $(this).addClass(mouseoverClass) },function(){ $(this).removeClass(mouseoverClass) });
        }
        if(opts.autostart){
            timer=setTimeout(loops,opts.delay);
            if(opts.onmouseoverStopType=='both'||opts.onmouseoverStopType=='mainpic'){ ul.hover( function(){ clearTimeout(timer); }, function(){ timer=setTimeout(loops,opts.delay); }); }
        }
    };
})(jQuery);