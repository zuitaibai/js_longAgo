/**
 * ZJFdatedrop 日期jquery插件[中国操作习惯]
 * author: zjf
 * Date: 2013-1-15
 * qq: 383975892
 * email: 383975892@qq.com
 */
(function($){
if(!window['ZJFdatedrop']){
    var ZJFdatedrop=function(em,opt){ this.$em=$(em);this.opt=opt; };
    ZJFdatedrop.prototype={
        constructor:ZJFdatedrop,
        init:function(){ this.fill();this.binds(); },
        fill:function(){
            var css='<style type="text/css" class="ZJFdatedropCss">.ZJFdropdate{display:none;position:absolute;top:0;left:0;'+this.opt.skin_warpCss+'}';
            css+='.ZJFdropdate em{font-style:normal;} .ZJFdropdate_clr{display:block;height:0;overflow:hidden;clear:both;}';
            css+='.ZJFdropdate_head{background:'+this.opt.skin_headBgColor+';padding:2px 5px 3px;}';
            css+='.ZJFdropdate_head_lt{float:left;} .ZJFdropdate_head_rt{float:right;} .ZJFdropdate_head_lt a,.ZJFdropdate_head_rt a{'+this.opt.skin_headLeftrightWordCss+'}';
            css+='.ZJFdropdate_head_lt a.disable,.ZJFdropdate_head_rt a.disable{color:'+this.opt.skin_headLeftrightWordDisabledColor+';cursor:default;}';
            css+='.ZJFdropdate_head_lt a:hover,.ZJFdropdate_head_rt a:hover{color:'+this.opt.skin_headLeftrightWordHoverColor+';}';
            css+='.ZJFdropdate_head_lt a.disable:hover,.ZJFdropdate_head_rt a.disable:hover{color:'+this.opt.skin_headLeftrightWordDisabledColor+';}';
            css+='.ZJFdropdate_head_ct{text-align:center;} .ZJFdropdate_head_ct a{'+this.opt.skin_headCenterNumCss+'}';
            css+='.ZJFdropdate_head_year,.ZJFdropdate_head_month{display:inline-block;cursor:pointer;} .ZJFdropdate_head_word{display:inline-block;'+this.opt.skin_headCenterWordCss+'}';
            css+='.ZJFdropdate_head_word2{margin-right:20px;} .ZJFdropdate_head_year select,.ZJFdropdate_head_month select{display:none;'+this.opt.skin_headCenterSelectCss+'}';
            css+='.ZJFdropdate_body table{width:100%;border-collapse:collapse;border-spacing:0;border:0;} .ZJFdropdate_body table th,.ZJFdropdate_body table td{'+this.opt.skin_neck_bodyCellCss+'}';
            css+='.ZJFdropdate_body table th{'+this.opt.skin_neckCellCss+'} .ZJFdropdate_body table td{'+this.opt.skin_bodyCellCss+'}';
            css+='.ZJFdropdate_body table td.nodate{background:'+this.opt.skin_bodyCellNoNumColor+';cursor:default;}';
            css+='.ZJFdropdate_body table td.sat_color{color:'+this.opt.skin_bodyCellSatdayColor+';} .ZJFdropdate_body table th.sat_color{color:'+this.opt.skin_neckSatdayWordColor+';}';
            css+='.ZJFdropdate_body table td.sun_color{color:'+this.opt.skin_bodyCellSundayColor+';} .ZJFdropdate_body table th.sun_color{color:'+this.opt.skin_neckSundayWordColor+';}';
            css+='.ZJFdropdate_body table td.today{'+this.opt.skin_bodyCellTodayCss+'} .ZJFdropdate_body table td.choosed{'+this.opt.skin_bodyCellChoosedCss+'}';
            css+='.ZJFdropdate_body table td.hover{'+this.opt.skin_bodyCellHoverCss+'} .ZJFdropdate_foot{padding:0 5px;} .ZJFdropdate_foot a{'+this.opt.skin_footWordCss+'}';
            css+='.ZJFdropdate_foot_rt{float:right;} .ZJFdropdate_foot_lt{float:left;} </style>';
            if($('.ZJFdatedropCss').size()<1) $('head').append(css);
            var html='<div class="ZJFdropdate"><div class="ZJFdropdate_head">';
            html+='<span class="ZJFdropdate_head_lt"><em><a title="上一年" href="javascript:void(0)">'+this.opt.skin_headLeftrightWord[0]+'</a></em>&nbsp;&nbsp;<span><a title="上一月" href="javascript:void(0)">'+this.opt.skin_headLeftrightWord[2]+'</a></span></span>';
            html+='<span class="ZJFdropdate_head_rt"><span><a title="下一月" href="javascript:void(0)">'+this.opt.skin_headLeftrightWord[3]+'</a></span>&nbsp;&nbsp;<em><a title="下一年" href="javascript:void(0)">'+this.opt.skin_headLeftrightWord[1]+'</a></em></span>';
            html+='<div class="ZJFdropdate_head_ct"><span class="ZJFdropdate_head_year"><a href="javascript:void(0)" title="点击选择年"></a><select></select></span>';
            html+='<span class="ZJFdropdate_head_word ZJFdropdate_head_word2">年</span><span class="ZJFdropdate_head_month"><a href="javascript:void(0)" title="点击选择月"></a>';
            html+='<select></select></span><span class="ZJFdropdate_head_word">月</span></div><div class="ZJFdropdate_clr"></div></div><div class="ZJFdropdate_body">';
            html+='<table width="100%" border="0" cellpadding="0" cellspacing="0"><thead><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th>';
            html+='</tr></thead><tbody></tbody></table></div><div class="ZJFdropdate_foot">';
            html+='<span class="ZJFdropdate_foot_rt"><a class="ZJFdropdateToday" href="javascript:void(0)">'+this.opt.skin_footLeftRightWord[1]+'</a></span>';
            html+='<span class="ZJFdropdate_foot_lt"><a class="ZJFdropdateClose" href="javascript:void(0)">'+this.opt.skin_footLeftRightWord[0]+'</a></span>';
            html+='<div class="ZJFdropdate_clr"></div></div></div>';
            this.dropdiv=$(html);
            $('body').append(this.dropdiv);
        },
        binds:function(){
            var $thisdrop=this.dropdiv,opt=this.opt,_self=this;
            this.$em.focus(function(){ _self.open(); $('.ZJFdropdate').not($thisdrop[0]).hide(); }).click(function(){return false;});
            $thisdrop.find('a.ZJFdropdateClose').click(function(){ _self.close(); });
            $thisdrop.find('a.ZJFdropdateToday').click(function(){
                var n=new Date(),y= n.getFullYear(),m= n.getMonth()+ 1,d= n.getDate(); _self.choosed=[y,m,d]; _self.$em.val(y+_self.opt.dateStrJoinSign+m+_self.opt.dateStrJoinSign+d); _self.close();
            });
            $thisdrop.find('span.ZJFdropdate_head_year,span.ZJFdropdate_head_month').click(function(){ $(this).find('a').hide().next('select').show(); return false; });
            this.y=opt.initDate[0]; this.m=opt.initDate[1];
            $thisdrop.find('span.ZJFdropdate_head_year a').text(opt.initDate[0]); $thisdrop.find('span.ZJFdropdate_head_month a').text(opt.initDate[1]);
            this.update();
            var s=this.$em.offset(),l=s.left,t=this.$em.outerHeight()+s.top,r=l+this.$em.outerWidth();
            var docW=$(document).width(),docH=$(document).height(),dropw=$thisdrop.outerWidth(),droph=$thisdrop.outerHeight();
            var cssL=cssR=cssT=cssB='auto'; if(l+dropw<=docW) cssL=l+'px'; else cssR=docW-r+'px'; if(t+droph<=docH) cssT=t+'px'; else{cssB=docH-s.top+'px';this.bottoms=true;}
            $thisdrop.css({'left':cssL,'right':cssR,'top':cssT,'bottom':cssB});
            $thisdrop.find('span.ZJFdropdate_head_year select,span.ZJFdropdate_head_month select')
                .each(function(){
                    if($(this).parent().hasClass('ZJFdropdate_head_year')){ for(var v=opt.startY;v<=opt.endY;v++){ $(this).append('<option value="'+v+'"'+(opt.initDate[0]==v?' selected':'')+'>'+v+'</option>'); }  }
                    else{ for(var v=1;v<=12;v++){ $(this).append('<option value="'+v+'"'+(opt.initDate[1]==v?' selected':'')+'>'+v+'</option>'); } }
                })
                .change(function(){
                    if($(this).parent().hasClass('ZJFdropdate_head_year')) _self.y=$(this).children(':selected').val(); else _self.m=$(this).children(':selected').val(); setTimeout(function(){_self.update();},30);
                });
            $thisdrop.find('.ZJFdropdate_head_lt,.ZJFdropdate_head_rt').each(function(){
                var that=$(this),mm=that.find('span a'),yy=that.find('em a');
                mm.click(function(){
                    if(that.hasClass('ZJFdropdate_head_lt')){ $('.ZJFdropdate_head_rt span a').removeClass('disable'); _self.m-=1; if(_self.m<=1){ _self.m=1; $(this).addClass('disable'); } else{  $(this).removeClass('disable'); } }
                    else{ $('.ZJFdropdate_head_lt span a').removeClass('disable');  _self.m+=1; if(_self.m>=12){ _self.m=12; $(this).addClass('disable'); } else{ $(this).removeClass('disable'); }}
                    _self.update();
                });
                yy.click(function(){
                    if(that.hasClass('ZJFdropdate_head_lt')){ $('.ZJFdropdate_head_rt em a').removeClass('disable');  _self.y-=1; if(_self.y<=opt.startY){ _self.y=opt.startY; $(this).addClass('disable'); } else{  $(this).removeClass('disable'); } }
                    else{ $('.ZJFdropdate_head_lt em a').removeClass('disable'); _self.y+=1; if(_self.y>=opt.endY){ _self.y=opt.endY; $(this).addClass('disable'); } else{ $(this).removeClass('disable'); }}
                    _self.update();
                });
            });
            $(document).click(function(e){
                if($(e.target).closest('.ZJFdropdate').size()<1) _self.close();
                else{ if($(e.target)!=$thisdrop.find('span.ZJFdropdate_head_year')) $thisdrop.find('span.ZJFdropdate_head_year a').show().next('select').hide(); if($(e.target)!=$thisdrop.find('span.ZJFdropdate_head_month')) $thisdrop.find('span.ZJFdropdate_head_month a').show().next('select').hide(); }
            });
        },
        update:function(){
            var _self=this,sdf=this.dropdiv,y=this.y,m=this.m;
            this.dropdiv.find('span.ZJFdropdate_head_year select option[value='+y+']').attr('selected','selected');
            this.dropdiv.find('span.ZJFdropdate_head_month select option[value='+m+']').attr('selected','selected');
            this.dropdiv.find('span.ZJFdropdate_head_year a').text(y); this.dropdiv.find('span.ZJFdropdate_head_month a').text(m);
            $('.ZJFdropdate_head_lt em a,.ZJFdropdate_head_rt em a').removeClass('disable');
            if(this.y==this.opt.startY) $('.ZJFdropdate_head_lt em a').addClass('disable'); else if(this.y==this.opt.endY) $('.ZJFdropdate_head_rt em a').addClass('disable');
            $('.ZJFdropdate_head_rt span a,.ZJFdropdate_head_lt span a').removeClass('disable');
            if(this.m==1) $('.ZJFdropdate_head_lt span a').addClass('disable'); else if(this.m==12) $('.ZJFdropdate_head_rt span a').addClass('disable');
            var tbody=this.dropdiv.find('tbody'),s=new Date(y-0,m-1,1),d=s.getDay(),html='<tr>';
            switch (d){
                case 0:
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td title="'+y+this.opt.dateStrJoinSign+m+'-1">1</td></tr>';
                    for(var b= 2,bb=1;b<=28;b++,bb++){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+b+'">'+b+'</td>'; if(bb%7==0) html+='</tr><tr>'; }
                    if(m==2){
                        if(y%400 == 0||(y%4==0&&y%100!=0)){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td></tr><tr><td class="nodate">&nbsp;</td>'; }
                        else{ html+='<td class="nodate"></td></tr><tr><td class="nodate">&nbsp;</td>'; }
                    }
                    else{  html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td></tr><tr><td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+30+'">30</td>'; }
                    if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+31+'">31</td>'; }else{ html+='<td class="nodate"></td>'; }
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td></tr>';break;
                case 1:
                    for(var b= 1,bb=1;b<=28;b++,bb++){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+b+'">'+b+'</td>'; if(bb%7==0) html+='</tr><tr>'; }
                    if(m==2){
                        if(y%400 == 0||(y%4==0&&y%100!=0)){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td class="nodate"></td>'; }
                        else{ html+='<td class="nodate"></td><td class="nodate"></td>'; }
                    }
                    else{  html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+30+'">30</td>'; }
                    if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+31+'">31</td>'; } else{ html+='<td class="nodate"></td>'; }
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td></tr>';break;
                case 2:
                    html+='<td class="nodate"></td><td title="'+y+this.opt.dateStrJoinSign+m+'-1">1</td><td title="'+y+this.opt.dateStrJoinSign+m+'-2">2</td><td title="'+y+this.opt.dateStrJoinSign+m+'-3">3</td><td title="'+y+this.opt.dateStrJoinSign+m+'-4">4</td><td title="'+y+this.opt.dateStrJoinSign+m+'-5">5</td><td title="'+y+this.opt.dateStrJoinSign+m+'-6">6</td></tr>';
                    for(var b= 7,bb=1;b<=28;b++,bb++){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+b+'">'+b+'</td>'; if(bb%7==0) html+='</tr><tr>'; }
                    if(m==2){
                        if(y%400 == 0||(y%4==0&&y%100!=0)){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td class="nodate"></td>'; }
                        else{ html+='<td class="nodate"></td><td class="nodate"></td>'; }
                    }
                    else{ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+30+'">30</td>'; }
                    if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+31+'">31</td>'; } else{ html+='<td class="nodate"></td>'; }
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td></tr>';break;
                case 3:
                    html+='<td class="nodate"></td><td class="nodate"></td><td title="'+y+this.opt.dateStrJoinSign+m+'-1">1</td><td title="'+y+this.opt.dateStrJoinSign+m+'-2">2</td><td title="'+y+this.opt.dateStrJoinSign+m+'-3">3</td><td title="'+y+this.opt.dateStrJoinSign+m+'-4">4</td><td title="'+y+this.opt.dateStrJoinSign+m+'-5">5</td></tr>';
                    for(var b= 6,bb=1;b<=28;b++,bb++){  html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+b+'">'+b+'</td>'; if(bb%7==0) html+='</tr><tr>';  }
                    if(m==2){
                        if(y%400 == 0||(y%4==0&&y%100!=0)){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td class="nodate"></td>'; }
                        else{ html+='<td class="nodate"></td><td class="nodate"></td>'; }
                    }
                    else{ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+30+'">30</td>';  }
                    if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+31+'">31</td>'; } else{ html+='<td class="nodate"></td>'; }
                    html+='<td class="nodate"></td><td class="nodate"></td></tr>';break;
                case 4:
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td title="'+y+this.opt.dateStrJoinSign+m+'-1">1</td><td title="'+y+this.opt.dateStrJoinSign+m+'-2">2</td><td title="'+y+this.opt.dateStrJoinSign+m+'-3">3</td><td title="'+y+this.opt.dateStrJoinSign+m+'-4">4</td></tr>';
                    for(var b= 5,bb=1;b<=28;b++,bb++){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+b+'">'+b+'</td>'; if(bb%7==0) html+='</tr><tr>'; }
                    if(m==2){
                        if(y%400 == 0||(y%4==0&&y%100!=0)){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td class="nodate"></td>'; }
                        else{ html+='<td class="nodate"></td><td class="nodate"></td>'; }
                    }
                    else{ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+30+'">30</td>'; }
                    if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+31+'">31</td>'; }else{ html+='<td class="nodate"></td>'; }
                    html+='<td class="nodate"></td></tr>';break;
                case 5:
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td title="'+y+this.opt.dateStrJoinSign+m+'-1">1</td><td title="'+y+this.opt.dateStrJoinSign+m+'-2">2</td><td title="'+y+this.opt.dateStrJoinSign+m+'-3">3</td></tr>';
                    for(var b= 4,bb=1;b<=28;b++,bb++){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+b+'">'+b+'</td>'; if(bb%7==0) html+='</tr><tr>';  }
                    if(m==2){
                        if(y%400 == 0||(y%4==0&&y%100!=0)){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td class="nodate"></td>'; }
                        else{ html+='<td class="nodate"></td><td class="nodate"></td>'; }
                    }
                    else{ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+30+'">30</td>'; }
                    if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+31+'">31</td>'; } else{ html+='<td class="nodate"></td>'; }
                    html+='</tr>'; break;
                case 6:
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td title="'+y+this.opt.dateStrJoinSign+m+'-1">1</td><td title="'+y+this.opt.dateStrJoinSign+m+'-2">2</td></tr>';
                    for(var b= 3,bb=1;b<=28;b++,bb++){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+b+'">'+b+'</td>';  if(bb%7==0) html+='</tr><tr>'; }
                    if(m==2){
                        if(y%400 == 0||(y%4==0&&y%100!=0)){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td class="nodate"></td>'; }
                        else{ html+='<td class="nodate"></td><td class="nodate"></td>'; }
                    }
                    else{ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+29+'">29</td><td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+30+'">30</td>'; }
                    html+='</tr><tr>';
                    if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){ html+='<td title="'+y+this.opt.dateStrJoinSign+m+this.opt.dateStrJoinSign+31+'">31</td>'; }else{ html+='<td class="nodate">&nbsp;</td>'; }
                    html+='<td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td></tr>';
                    break;
            }
            function showCount(str1,str2) { var arr = str1.split(str2);  return arr.length-1; }
            if(this.bottoms){if(showCount(html,'</tr>')<6) html+='<tr><td class="nodate">&nbsp;</td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td><td class="nodate"></td></tr>';} tbody.empty().append(html);
            this.dropdiv.find('tr').each(function(){ $(this).children(':eq(5)').addClass('sat_color').end().children(':eq(6)').addClass('sun_color'); });
            var nows=new Date(),n_y=nows.getFullYear(),n_m=nows.getMonth()+ 1,n_d=nows.getDate();
            if(this.y==n_y){
                if(this.m==n_m) tbody.find('td').filter(function(ind){return $(this).text()==n_d;}).addClass('today').attr('title',function(){ return '今天：'+this.title });
            }
            sdf.find('.ZJFdropdate_head_ct a').show().next('select').hide();
            tbody.find('td').not('.nodate')
                .hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')})
                .click(function(){ _self.$em.val(_self.y+_self.opt.dateStrJoinSign+_self.m+_self.opt.dateStrJoinSign+$(this).text()); _self.choosed=[_self.y,_self.m,$(this).text()];  _self.close(); });
        },
        close:function(){ this.y=this.opt.initDate[0]; this.m=this.opt.initDate[1]; this.dropdiv.hide(); },
        open:function(){
            this.dropdiv.show(); this.update();
            if(this.choosed){ var c_y=this.choosed[0],c_m=this.choosed[1],c_d=this.choosed[2];
                if(this.y==c_y){
                    if(this.m==c_m) this.dropdiv.find('td').filter(function(ind){return $(this).text()==c_d;}).addClass('choosed').attr('title',function(){ return '已选：'+this.title });
                }
            }
        }
    };
    window['ZJFdatedrop']=ZJFdatedrop;
}
$.fn.ZJFdatedrop=function(opts){
    var opt= $.extend({ startY:1800, /*//年份下拉列表下限*/ endY:2050, /*//年份下拉列表上限*/ initDate:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()], /*//初始为某年某月的界面*/ dateStrJoinSign:'-', /*//格式化日期的中隔符*/ /*ifStopUserInputKey:false, //是否阻止用户手动输入（input）*/ skin_warpCss:'min-width:260px;_width:260px;border:1px solid #6a7487;background:#fff;font:12px/28px arial;z-index:9999;float:none;text-indent:0;padding:0;margin:0;',/*//日历warp的css*/skin_headBgColor:'#a2b9d9', /*//日历头部背景色*/skin_headCenterWordCss:'margin-left:6px;font-size:14px;color:#193259;', /*//日历头部中间文字“年”、“月”的css*/ skin_headCenterNumCss:'color:#333;text-decoration:none;background:#fff;padding:0 5px;line-height:16px;height:16px;display:inline-block;zoom:1;',/*//日历头部中间数字的css*/ skin_headCenterSelectCss:'font-size:12px;', /*//日历头部中间下拉列表的css*/ skin_headLeftrightWordCss:'color:#233c5b;text-decoration:none;',/* //日历头部左右切换文字的css*/ skin_headLeftrightWordDisabledColor:'#838383', /*//日历头部左右切换文字被禁用时的颜色*/ skin_headLeftrightWordHoverColor:'#0059c4', /*//日历头部左右切换文字hover时的颜色*/ skin_headLeftrightWord:['◀','▶','◁','▷'], /*//日历头部左右切换文字的字符。顺序为：上一年，下一年，上一月，下一月*/ skin_neckCellCss:'background:#c0d0e9;color:#9c9c9c;font-weight:normal;line-height:20px;min-width:36px;_width:36px;',/*//日历颈部每单元的css*/ skin_neckSatdayWordColor:'#6b9d89', /*//日历颈部周六文字的颜色*/ skin_neckSundayWordColor:'#a7888b', /*//日历颈部周日文字的颜色*/ skin_neck_bodyCellCss:'text-align:center;border:1px solid #cdced3;', /*//日历颈部和主体部每单元的css*/ skin_bodyCellCss:'background:#e5e9f2;cursor:pointer;color:#272b36;', /*//日历主体部每单元的css*/ skin_bodyCellSatdayColor:'#498a70', /*//日历主体部周六数字的颜色*/ skin_bodyCellSundayColor:'#9e0e1e', /*//日历主体部周日数字的颜色*/ skin_bodyCellNoNumColor:'#f5f9fd', /*//日历主体部空白单元（没日期数字的单元）的数字颜色*/ skin_bodyCellTodayCss:'background:#5c8efd;font-weight:bold;color:#f00;', /*//日历主体部“今天”这个单元 的数字的颜色*/ skin_bodyCellChoosedCss:'background:#c0cff3;color:blue;', /*//日历主体部“上次已选择”这个单元 的数字的颜色*/ skin_bodyCellHoverCss:'background:#5c5c5c;font-size:18px;color:#fff;', /*//日历主体部每单元hover的css*/ skin_footWordCss:'color:#06bcea;text-decoration:none;', /*//日历脚部文字的css*/ skin_footLeftRightWord:['关闭','今天'] /*//日历脚部文字的字符*/ },opts);
    return $(this).each(function(){ var s=new ZJFdatedrop(this,opt); s.init(); });
};
})(jQuery);