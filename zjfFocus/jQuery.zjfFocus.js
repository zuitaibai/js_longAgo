/**
 * jQuery焦点图轮播，全部可定制方式基于两种效果：显隐、滚动
 * tabs、文字说明、左右按钮可选（页面内没有相关dom节点即可去除该组成）
 * Version: zjfFocus v1.0.20140213（未经各种及性能优化、未经详细测试）
 * QQ:383975892 Email:383975892@qq.com
 * Created by zjf on 14-2-13.
 */
;(function($){
    function ZjfFocus(warpId,options){
        if(!warpId||$('#'+warpId).length==0){ alert('请传入正确id值！'); return; }
        this.warpId=warpId; this.$warp=$('#'+warpId); this.timer=null; this.curNum=this.oldNum=0;
        this.options=$.extend({
            imgEffect:['scroll-back-h','scroll-back-v','fade','scroll-continue-h','scroll-continue-v','scroll-continue-h-noOrder','scroll-continue-v-noOrder'][3],
            imgDirectH:['left','right'][0],
            imgDirectV:['up','down'][0],
            txtEffect:['display','fade','slide-h','slide-v','sametime'][1],
            txtEffectSpeed:350,
            autoPlay:true,
            delay:2500.01, //fade时默认3500，其它默认2500
            tabEvent:['mouseover','click'][0],
            tabActiveClass:'active',
            speed:300.01, //fade时默认2000，其它默认300
            width:undefined,
            height:undefined
        },options||{});
    }
    ZjfFocus.prototype={
        constructor:ZjfFocus,
        init:function(intopts){ this.intopts=intopts||{}; this.creatdom().bind().start(); },
        once:function(opposite){
            this.$tabs.eq(this.curNum).addClass(this.options.tabActiveClass).siblings().removeClass(this.options.tabActiveClass);
            var list=$('#'+this.warpId+' .zjff-imgs-list .zjff-imgs-list-item'), _this=this;
            if(_this.$txts.length>0){
                switch(_this.options.txtEffect){
                    case 'display': _this.$txts.hide().eq(_this.curNum).show(); break;
                    case 'fade': _this.$txtsbg.fadeOut(_this.options.txtEffectSpeed,function(){ _this.$txtsbg.fadeIn('fast'); _this.$txts.eq(_this.curNum).fadeIn('fast'); }); _this.$txts.eq(_this.oldNum).fadeOut(_this.options.txtEffectSpeed);  break;
                    case 'slide-v': _this.$txtsbg.slideUp(_this.options.txtEffectSpeed,function(){ _this.$txtsbg.slideDown('fast'); _this.$txts.eq(_this.curNum).show(); }); _this.$txts.eq(_this.oldNum).hide(); break;
                    case 'slide-h': _this.$txtsbg.animate({width:'toggle'},_this.options.txtEffectSpeed,function(){ _this.$txtsbg.animate({width:'toggle'},'fast');_this.$txts.eq(_this.curNum).animate({width:'toggle'},'fast'); }); _this.$txts.eq(_this.oldNum).animate({width:'toggle'},_this.options.txtEffectSpeed); break;
                    case 'sametime': _this.$txtsbg.hide(_this.options.txtEffectSpeed,function(){ _this.$txtsbg.show('fast'); _this.$txts.eq(_this.curNum).show('fast'); });  _this.$txts.eq(_this.oldNum).hide(_this.options.txtEffectSpeed); break;
                }
            }
            if(this.options.imgEffect=='fade'){
                list.css({'display':'none','opacity':1,'zIndex':1}).eq(_this.oldNum).show().css('z-index',50).end().eq(_this.curNum).show().css('z-index',49);
                list.eq(_this.oldNum).fadeOut(_this.options.speed==300.01?2000:_this.options.speed);
                return;
            }
            _this.options.speed=_this.options.speed==300.01?300:_this.options.speed;
            if(_this.options.imgEffect=='scroll-continue-h'||_this.options.imgEffect=='scroll-continue-h-noOrder'){
                var left=_this.options.imgDirectH=='left'?_this.width:-_this.width;
                if(opposite) left=-left;
                list.eq(_this.curNum).css({left:left,zIndex:49}).animate({left:0},_this.options.speed);
                list.eq(_this.oldNum).css('z-index',50).animate({left:-left},_this.options.speed,function(){ list.eq(_this.oldNum).css({left:0,zIndex:1}); });
            }
            else if(this.options.imgEffect=='scroll-continue-v'||this.options.imgEffect=='scroll-continue-v-noOrder'){
                var top=_this.options.imgDirectV=='up'?_this.height:-_this.height;
                if(opposite) top=-top;
                list.eq(_this.curNum).css({top:top,zIndex:49}).animate({top:0},_this.options.speed);
                list.eq(_this.oldNum).css('z-index',50).animate({top:-top},_this.options.speed,function(){ list.eq(_this.oldNum).css({top:0,zIndex:1}); });
            }
            else if(this.options.imgEffect=='scroll-back-h'){
                if(this.options.imgDirectH=='left') $('#'+this.warpId+' .zjff-imgs-list').animate({left:-this.width*this.curNum},this.options.speed);
                else $('#'+this.warpId+' .zjff-imgs-list').animate({left:-this.width*(this.len-this.curNum-1)},this.options.speed);
            }
            else if(this.options.imgEffect=='scroll-back-v'){
                if(this.options.imgDirectV=='up') $('#'+this.warpId+' .zjff-imgs-list').animate({top:-this.height*this.curNum},this.options.speed);
                else $('#'+this.warpId+' .zjff-imgs-list').animate({top:-this.height*(this.len-this.curNum-1)},this.options.speed);
            }
        },
        start:function(){
            var _this=this;
            var delay=_this.options.delay==2500.01?(_this.options.imgEffect=='fade'?3500:2500):_this.options.delay;
            if(_this.options.autoPlay){
                _this.stop();
                _this.timer=setTimeout(function(){
                    _this.oldNum=_this.curNum;
                    _this.curNum=_this.oldNum+1;
                    if(_this.curNum>=_this.len) _this.curNum=0;
                    if(_this.oldNum>=_this.len) _this.oldNum=0;
                    _this.once();
                    _this.timer=setTimeout(arguments.callee,delay);
                },delay);
            }
        },
        stop:function(){ clearTimeout(this.timer); },
        bind:function(){
            var _this=this;
            _this.$tabs.bind(_this.options.tabEvent,function(){
                _this.stop();
                _this.oldNum=_this.curNum;
                _this.curNum=$(this).index();
                var opposite=_this.options.imgEffect.indexOf('noOrder')==-1&&_this.oldNum>_this.curNum;
                _this.once(opposite);
            });
            $('#'+_this.warpId+' .zjff-tabs-list').mouseout(function(){ _this.start(); });
            if(_this.options.leftButton&&$('#'+_this.options.leftButton).length>0){
                $('#'+_this.options.leftButton).click(function(){
                    _this.stop();
                    _this.oldNum=_this.curNum;
                    _this.curNum-=1;
                    if(_this.curNum<0) _this.curNum=_this.len-1;
                    if(_this.oldNum<0) _this.oldNum=_this.len-1;
                    var opposite=_this.options.imgEffect.indexOf('noOrder')==-1&&_this.oldNum>_this.curNum;
                    _this.once(opposite);
                    _this.start();
                    return false;
                });
            }
            if(_this.options.rightButton&&$('#'+_this.options.rightButton).length>0){
                $('#'+_this.options.rightButton).click(function(){
                    _this.stop();
                    _this.oldNum=_this.curNum;
                    _this.curNum+=1;
                    if(_this.curNum>=_this.len) _this.curNum=0;
                    if(_this.oldNum>=_this.len) _this.oldNum=0;
                    var opposite=_this.options.imgEffect.indexOf('noOrder')==-1&&_this.oldNum>_this.curNum;
                    _this.once(opposite);
                    _this.start();
                    return false;
                });
            }
            return this;
        },
        creatdom:function(){
            var css='<style id="zjfFocusCss" type="text/css">';
            css+='.zjff-warp{width:100%;height:100%;position:relative;overflow:hidden;zoom:1;} .zjff-warp ul{list-style:none;} .zjff-warp img{border:0;}';
            css+='.zjff-imgs-inner{width:100%;height:100%;position:relative;overflow:hidden;zoom:1;}';
            css+='.zjff-imgs-inner-w{width:99999px;} .zjff-imgs-inner-w .zjff-imgs-list,.zjff-imgs-inner-h .zjff-imgs-list{position:absolute;left:0;top:0;overflow:hidden;zoom:1;}';
            css+='.zjff-imgs-inner-w .zjff-imgs-list .zjff-imgs-list-item{float:left;_display:inline;} .zjff-imgs-inner-abs .zjff-imgs-list{position:relative;width:100%;height:100%;}';
            css+='.zjff-imgs-inner-abs .zjff-imgs-list .zjff-imgs-list-item{position:absolute;left:0;top:0;width:100%;height:100%;}';
            css+='.zjff-tabs-inner{position:absolute;right:2.5em;bottom:.5em;overflow:hidden;zoom:1;z-index:56;} .zjff-tabs-list{float:left;}';
            css+='.zjff-tabs-list-item{float:left;_display:inline;margin-left:3px;border:#333 1px solid;background:#ccc;text-align:center;width:18px;line-height:18px;cursor:pointer;}';
            css+='.zjff-infos-inner-pre{width:100%;height:30px;background:#000;position:absolute;bottom:0;left:0;z-index:51;opacity:.5;filter:alpha(opacity=50);}';
            css+='.zjff-infos-inner{width:100%;height:30px;line-height:30px;overflow:hidden;zoom:1;z-index:52;position:absolute;bottom:0;left:0;color:#fff;font-size:14px;}';
            css+='.zjff-infos-inner .zjff-infos-list{padding-left:20px;} .zjff-infos-inner .zjff-infos-list .zjff-infos-list-item{display:none;}';
            css+='.zjff-infos-inner .zjff-infos-list .zjff-infos-list-item-show{display:list-item;}';
            css+='.active{color:#ff0;background:#333;}</style>';
            if($('#zjfFocusCss').length==0) $('head').prepend(css);
            if($('#'+this.warpId+' .zjff-infos-inner').length>0){
                if($('#'+this.warpId+' .zjff-infos-inner-pre').length==0) $('#'+this.warpId+' .zjff-infos-inner').before('<div class="zjff-infos-inner-pre"></div>');
                $('#'+this.warpId+' .zjff-infos-inner .zjff-infos-list .zjff-infos-list-item:eq(0)').addClass('zjff-infos-list-item-show');
            }

            this.$tabs=$('#'+this.warpId+' .zjff-tabs-list .zjff-tabs-list-item');
            this.$tabs.first().addClass(this.options.tabActiveClass);
            this.$txts=$('#'+this.warpId+' .zjff-infos-inner .zjff-infos-list-item');
            this.$txtsbg=$('#'+this.warpId+' .zjff-infos-inner-pre');
            this.len=$('#'+this.warpId+' .zjff-imgs-list .zjff-imgs-list-item').length;
            this.width=this.options.width||$('#'+this.warpId+' .zjff-warp').width();
            this.height=this.options.height||$('#'+this.warpId+' .zjff-warp').height();

            var $inner=this.$warp.find('.zjff-imgs-inner');
            if(this.options.imgEffect.indexOf('scroll-continue')!=-1||this.options.imgEffect=='fade'){
                $inner.addClass('zjff-imgs-inner-abs');
                $('#'+this.warpId+' .zjff-imgs-list .zjff-imgs-list-item:eq(0)').css('z-index',50).siblings().css('z-index',1);
                if(this.options.imgEffect=='fade') $('#'+this.warpId+' .zjff-imgs-list .zjff-imgs-list-item:eq(1)').css('z-index',49);
            }
            else if(this.options.imgEffect=='scroll-back-h'){
                $inner.addClass('zjff-imgs-inner-w');
                if(this.options.imgDirectH=='right'){
                    this.reverseUl();
                    $('#'+this.warpId+' .zjff-imgs-list').css('left',-(this.len-1)*this.width+'px');
                }
            }
            else if(this.options.imgEffect=='scroll-back-v'){
                $inner.addClass('zjff-imgs-inner-h');
                if(this.options.imgDirectV=='down'){
                    this.reverseUl();
                    $('#'+this.warpId+' .zjff-imgs-list').css('top',-(this.len-1)*this.height+'px');
                }
            }
            return this;
        },
        reverseUl:function(){
            var lisArr=[], $ul=$('#'+this.warpId+' .zjff-imgs-list');
            $('#'+this.warpId+' .zjff-imgs-list  .zjff-imgs-list-item').each(function(){lisArr.push($(this));});
            lisArr.reverse();
            $ul.empty();console.log(lisArr);
            for(var i=0,l=lisArr.length;i<l;i++) $ul.append(lisArr[i]);
            lisArr=null;
        }
    };
    function zjfFocus(warpId,options,intopts){ var zjf=new ZjfFocus(warpId,options); zjf.init(intopts); }
    $.extend({zjfFocus:zjfFocus});
})(jQuery);