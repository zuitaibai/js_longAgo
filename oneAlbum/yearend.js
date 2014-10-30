zjf$(function(){

	zjf$('.picover')[0].onselectstart=function(){return false};

    //鼠标移入每个li中 显示具体滑出
    zjf$('.picul li').hover(
        function(){ zjf$(this).css('z-index',2).find('div').css('z-index',3).animate({'width':'toggle','height':'toggle'},'fast'); },
        function(){ zjf$(this).find('div').hide(); zjf$('.picul li').css('z-index',1).find('div').css('z-index',1);}
    );

    //点击某li中的“点击查看详情”链接或图片
    var s__= 0,lock=false,cur='';
    zjf$('.picul li').each(function(){
        var attrs=zjf$(this).attr('data-id');
        var datas=jsondata[attrs];
        zjf$(this).find('div p a,div em img').click(function(){
            init(datas,attrs);
            return false;
        });
    });

    function init(datas,sm){
        var bg=url='',imgs=[]; cur=sm;
        if(datas){ bg=datas.img,imgs=datas.img2,url=datas.videoUrl; }
        zjf$('.player').css('background-image','url('+bg+')');
        zjf$('.ulimgs').empty().css('left',0);
        for(var s__= 0,l=imgs.length;s__<l;s__++){ zjf$('.ulimgs').append('<li><img src="'+imgs[s__]+'" /></li>') }
        afterbind(l);
        zjf$('#addresstxt').text(url);zjf$('.addresstxt').attr('href',url);
        zjf$('.picul').hide();
        zjf$('.picover').show();
        l<=0?zjf$('.playerin,.address').hide():zjf$('.playerin,.address').show();
    }

    //关闭弹出画面
    zjf$('.close').click(function(){ zjf$('.picul').show();  zjf$('.picover').hide(); });

    //运算function
    function afterbind(n){
        zjf$('#btnrt,#btnlt').removeClass('btngray').filter('#btnlt').addClass('btngray');
        if(n<=1) return; s__= 0; lock=false;
        zjf$('#btnrt').unbind().click(function(){
            if(lock) return;lock=true;
            //s__+=1; if(s__>=n){ zjf$('.ulimgs').animate({'left':0},'normal',function(){lock=false}); s__=0; return; }
            s__+=1; if(s__>=n){ lock=false; s__=n-1; return; }
            zjf$('#btnrt,#btnlt').removeClass('btngray');
            zjf$('.ulimgs').animate({'left':-s__*448+'px'},'normal',function(){lock=false;if(s__==n-1)zjf$('#btnrt').addClass('btngray');});
        });
        zjf$('#btnlt').unbind().click(function(){
            if(lock) return;lock=true;
            //s__-=1; if(s__<0){ zjf$('.ulimgs').animate({'left':(-n+1)*448+'px'},'mormal',function(){lock=false}); s__=n; return; }
            s__-=1; if(s__<0){ lock=false; s__=0; return; }
            zjf$('#btnrt,#btnlt').removeClass('btngray');
            zjf$('.ulimgs').animate({'left':-s__*448+'px'},'mormal',function(){lock=false;if(s__==0)zjf$('#btnlt').addClass('btngray');});
        });
    }

    //每组左右按钮切换
    var hasdatalis=zjf$('.picul li[data-id]'),len2=hasdatalis.length;
    zjf$('#btnlt2,#btnrt2').click(function(){
        var ind=hasdatalis.index(zjf$('.picul li[data-id='+cur+']'));
        if(this.id=='btnrt2'){
            zjf$('#btnlt2').removeClass('btngray');
            if(ind<len2-1){
                var attrs=hasdatalis.eq(ind+1).attr('data-id'),datas=jsondata[attrs];
                init(datas,attrs);
                if(ind==len2-2) zjf$(this).addClass('btngray');
                else zjf$(this).removeClass('btngray');
            }
        }
        else{
            zjf$('#btnrt2').removeClass('btngray');
            if(ind>0){
                var attrs=hasdatalis.eq(ind-1).attr('data-id'),datas=jsondata[attrs];
                init(datas,attrs);
                if(ind==1) zjf$(this).addClass('btngray');
                else zjf$(this).removeClass('btngray');
            }
        }
    })
    .hover(function(){ zjf$(this).addClass('addbgcl')},function(){ zjf$(this).removeClass('addbgcl')});

});