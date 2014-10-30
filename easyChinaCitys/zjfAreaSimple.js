//简易中国省市县ajax联动
function zjfAreaSimple(id,ajaxUrl,stepAttrStr,hiddenNameAttrStr,dataInitAttrStr){
    stepAttrStr=stepAttrStr||'data-step';
    hiddenNameAttrStr=hiddenNameAttrStr||'data-name';
    dataInitAttrStr=dataInitAttrStr||'data-init';
    var s0=$('#'+id), s1=s0.children('dl['+stepAttrStr+'=1]'), s2=s0.children('dl['+stepAttrStr+'=2]'), s3=s0.children('dl['+stepAttrStr+'=3]'),
        s11=s1.children('dt'), s12=s1.children('dd'), s21=s2.children('dt'), s22=s2.children('dd'), s31=s3.children('dt'), s32=s3.children('dd'),
        v1=$('<input/>').attr({'type':'hidden','name':s1.attr(hiddenNameAttrStr),'value':'','text':''}).appendTo(s0),
        v2=$('<input/>').attr({'type':'hidden','name':s2.attr(hiddenNameAttrStr),'value':'','text':''}).appendTo(s0),
        v3=$('<input/>').attr({'type':'hidden','name':s3.attr(hiddenNameAttrStr),'value':'','text':''}).appendTo(s0),
        inits=s0.attr(dataInitAttrStr), inita=[];
    $.getJSON(ajaxUrl,function(json){
        //window.zjfareadata=json;
        if(inits){ inita=inits.split(','); }
        var h='';
        for(var i in json){
            var cl='';
            if(i==inita[0]){
                cl=' class="cur"';
                v1.val(i).attr('text',json[i]['region_name']);
                s11.text(json[i]['region_name']);
            }
            h+='<p'+cl+' value="'+i+'">'+json[i]['region_name']+'</p>';
        }
        s12.html(h);
        s11.on('click',function(){s12.toggle();});
        s21.on('click',function(){s22.toggle();});
        s31.on('click',function(){s32.toggle();});
        s12.children('p').on('mouseenter',function(){$(this).addClass('cur').siblings().removeClass('cur');}).on('click',function(){
            var val=$(this).attr('value'), txt=$(this).text();
            s11.text(txt);
            v1.val(val).attr('text',txt);
            s12.hide();
            fill2(val);
            fill3();
        });
        (inita.length>1)&&fill2(inita[0],inita[1]);
        (inita.length>2)&&fill3(inita[0],inita[1],inita[2]);
        $(document).on('click',function(e){
            var s=$(e.target);
            if(s.closest('dl.areadl1forjs').length<=0){s12.hide();}
            if(s.closest('dl.areadl2forjs').length<=0){s22.hide();}
            if(s.closest('dl.areadl3forjs').length<=0){s32.hide();}
        });
        function fill2(v,init){
            s22.empty();
            v2.val('').attr('text','');
            s21.text('请选择');
            if(v){
                var vv;
                if(json[v]&&json[v]['second']){ vv=json[v]['second']; }
                else{ console.log('没有匹配指定的省级或该省没有下级分级！'); }
                if(vv){
                    var h='';
                    for(var i=0,l=vv.length;i<l;i++){
                        var cl='';
                        if(vv[i].region_id==init){
                            cl=' class="cur"';
                            v2.val(vv[i].region_id).attr('text',vv[i]['region_name']);
                            s21.text(vv[i]['region_name']);
                        }
                        h+='<p'+cl+' value="'+vv[i].region_id+'" parent="'+v+'">'+vv[i]['region_name']+'</p>';
                    }
                    s22.html(h).children('p').on('mouseenter',function(){$(this).addClass('cur').siblings().removeClass('cur');}).on('click',function(){
                        var val=$(this).attr('value'), txt=$(this).text(), p=$(this).attr('parent');
                        s21.text(txt);
                        v2.val(val).attr('text',txt);
                        s22.hide();
                        fill3(p,val);
                    });
                }
            }
        }
        function fill3(v1,v2,init){
            s32.empty();
            v3.val('').attr('text','');
            s31.text('请选择');
            if(!v1){ return; }
            var vv;
            if(json[v1]&&json[v1]['second']){
                for(var i=0,l=json[v1]['second'].length;i<l;i++){
                    if(json[v1]['second'][i]['region_id']==v2){ vv=json[v1]['second'][i]['third']; break; }
                }
            }else{ console.log('没有匹配指定的市级！'); }
            if(vv){
                var h='';
                for(var i=0,l=vv.length;i<l;i++){
                    var cl='';
                    if(vv[i].region_id==init){
                        cl=' class="cur"';
                        v3.val(vv[i].region_id).attr('text',vv[i]['region_name']);
                        s31.text(vv[i]['region_name']);
                    }
                    h+='<p'+cl+' value="'+vv[i].region_id+'" parent="'+v2+'" parents="'+v1+'">'+vv[i]['region_name']+'</p>';
                }
                s32.html(h).children('p').on('mouseenter',function(){$(this).addClass('cur').siblings().removeClass('cur');}).on('click',function(){
                    var val=$(this).attr('value'), txt=$(this).text();
                    s31.text(txt);
                    v3.val(val).attr('text',txt);
                    s32.hide();
                });
            }
        }
    });
}