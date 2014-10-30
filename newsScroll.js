//消息滚动
    var newscroll=function(ulId,rowheight,delay){
        var timer=null, delay=delay||1600,
            gone=function(){ $('#'+ulId+' li:first').animate({marginTop:-rowheight},'slow',function(){ $(this).appendTo('#'+ulId).css('margin-top',0); });},
            stop=function(){clearInterval(timer);},
            start=function(){timer=setInterval(gone,delay);};
        $('#'+ulId).hover(stop,start);
        return {stop:stop, start:start};
    };
    newscroll('newnews',34).start();// JavaScript Document