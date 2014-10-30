$.fn.zjfTableScroll=function(opts){
    var opts=$.extend({height:'auto',zIndex:'auto',widthLittle:1},opts||{}), $this=$(this), _=$(this).find('table'), s=_.attr('style')||'', timer=null;
    $this.css({'overflow-y':'auto','overflow-x':'hidden'});
    if(typeof opts.height!='string') $this.css('height',opts.height);
    s+='table-layout:fixed;border-collapse:collapse;word-break:break-all;word-wrap:break-word;overflow-wrap:break-word;white-space:normal;';
    var w=_.width(), o=$(this).offset(), c=_.clone(), bl=parseInt($(this).css('border-left-width')||0,10), bt=parseInt($(this).css('border-top-width')||0,10);
    _.attr('style',s);
    c.attr('style',s);
    c.appendTo('body').css({position:'absolute',left:o.left+bl,top:o.top+bt,width:w+opts.widthLittle,marginTop:0,zIndex:opts.zIndex});
    c.find('tbody').hide();
    if(opts.theadBgCssStr) c.find('thead,th,td').css('background',opts.theadBgCssStr);
	if(opts.theadBorderCssStr) c.find('thead').css('border-bottom',opts.theadBorderCssStr);
    _.css('margin-top',0).find('thead').css('visibility','hidden');
    var resize=function(){
        var w=_.width(), o=$this.offset();
        c.css({left:o.left+bl,top:o.top+bt,width:w+opts.widthLittle});
    };
    $(window).resize(function(){clearTimeout(timer); timer=setTimeout(resize,20);});
	return $this;
};