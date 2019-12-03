window.onload=function(){
    // 获取播放列表
    getmList();
    //刷新页面初始化
    setTimeout(function(){
        if(document.getElementById("m_list").innerHTML!=""){
            // 获取播放列表第一首
            var firstA=document.getElementById("m_list").firstChild.firstChild;
            // 给第一首设置正在播放样式
            firstA.className="onplaying";
            //音频链接初始化为第一首
            document.getElementById('video1').src=firstA.parentNode.attributes['srclink'].value
            // 播放条歌曲歌名作者初始化为第一首
            getClass("mname")[0].innerHTML=firstA.childNodes[1].innerHTML;
            getClass("musician")[0].innerHTML=firstA.childNodes[3].innerHTML;
            document.getElementById('video1').pause()
        }else{
            getClass("music-info").style.display="none"
        }
    },500)
    // 歌曲结束事件
    document.getElementById("video1").onended=function(){
        qiege()
    }
    
    // 获取天气
    getTianqi()
    
}
// 操作——播放歌曲
// 点击播放——>获取歌曲id——>数据库查询返回歌曲信息——>该歌曲被添加至播放列表最下方——>
// 切换播放该歌曲——>播放条重置——>歌曲信息更改（歌名、作者、播放时长）
function bofang(aa){
    addToList(aa);
    setTimeout(setStyle(),500)//正在播放添加样式
}
const addToList=(aa)=>{            //查：曲库查询歌曲
    let id=aa.parentNode.parentNode.attributes["num"].value;
    var xmlhttp=new XMLHttpRequest()
    var url="php/chaxun.php?id="+id;
    xmlhttp.open('GET',url,true)
    xmlhttp.send()
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
            if(xmlhttp.response!=0){
                var data=JSON.parse(xmlhttp.response)       //返回歌曲信息
                jiexi(data[0])         //解析歌曲信息
            }else{
                alert("该歌曲资源不存在")
            }
        }
    }
}
function jiexi(obj){            //增：播放列表添加歌曲
    //console.log(obj)    //{mId: "1", mSrc: "scr/BEYOND-光辉岁月.mp3", mName: "光辉岁月", mBy: "BEYOND"}
    var xmlhttp=new XMLHttpRequest()
    var url="php/addToList.php?mId="+obj.mId+"&&mSrc="+obj.mSrc+"&&mName="+obj.mName+"&&mBy="+obj.mBy;
    xmlhttp.open('GET',url,true)
    xmlhttp.send()
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
            if(xmlhttp.responseText==0){
                getmList()          //获取播放列表                
            }else{          //该歌曲已在播放列表
                for(let i= 0;i<document.getElementById("m_list").childNodes.length;i++){
                    if(document.getElementById("m_list").childNodes[i].attributes["num"].value==obj.mId){
                        playnow(document.getElementById("m_list").childNodes[i].firstChild)
                    }
                }
            }
        }
    }    
}
function getmList(){            //查：获取播放列表
    var xmlhttp=new XMLHttpRequest()
    var url="php/getmList.php";
    xmlhttp.open('GET',url,true)
    xmlhttp.send()
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
            if(xmlhttp.response!=0){
                var data=JSON.parse(xmlhttp.response)       
                //解析歌曲信息
                let mList=document.getElementById("m_list");
                mList.innerHTML="";
                for(let i=0;i<data.length;i++){
                    let li=document.createElement("li");
                    li.setAttribute("num",data[i].mId)
                    li.setAttribute("srclink",data[i].mSrc)
                    li.innerHTML="<a onclick='playnow(this)'><span><i></i></span><span>"+data[i].mName+"</span><span><i title='收藏' onclick='getSrc(this.parentNode,event)'></i><i title='分享'></i><i title='下载'></i><i title='删除' onclick='delFromList(this,event)'></i></span><span>"+data[i].mBy+"</span><span>未知</span><span><i title='来自榜单'></i></span></a>"
                    mList.appendChild(li)
                }
                getClass("ctrl-list")[0].innerHTML=data.length;
                getClass("list_length")[0].innerHTML=data.length;
                
            }else{
                alert("该歌曲资源不存在")
            }
        }
    }
}
// 给正在播放的歌曲添加样式
function setStyle(){
    let theSrc=document.getElementById("video1").attributes['src'];
    let lis=document.getElementById("m_list").childNodes;
    if(document.getElementById("m_list").childNodes.length!=0){
        for(let i=0;i<lis.length;i++){
            if(lis[i].attributes["srclink"].value==theSrc){
                lis[i].firstChild.className="onplaying";
                break;
            }
        }
    }
}
                            // 删：从播放列表数据库删除数据
function delFromList(ts,e){ //tm:this song;
    // 取消冒泡
    if(e.stopPropagation){
        e.stopPropagation();
    }else if(e.cancleBubble){
        e.cancleBubble = true;
    }
    
    // 获取歌曲id
    let delId=ts.parentNode.parentNode.parentNode.attributes["num"].value
    // 删除对应id歌曲
    var xmlhttp=new XMLHttpRequest()
    var url="php/delFromList.php?id="+delId;
    xmlhttp.open('GET',url,true)
    xmlhttp.send()
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
            if(xmlhttp.response==0){
                getmList()//重新获取列表
                //如果删除的歌曲与现在播放歌曲一样，
                if(ts.parentNode.parentNode.parentNode.attributes["srclink"].value==document.getElementById("video1").attributes["src"].value){
                    document.getElementById("video1").src="";
                    getClass("cur")[0].classList.remove("playscroll")
                    getClass("music-info")[0].style.visibility="hidden";
                }else{
                    setTimeout(function(){//保留onplaying样式
                        setStyle();
                    },500)
                }
            }else{
                alert("该歌曲资源不存在")
            }
        }
    }
}
// 点击播放列表歌曲立即切换歌曲
function playnow(m){ 
    document.getElementById("video1").src=m.parentNode.attributes['srclink'].value;

    getClass("mname")[0].innerHTML=m.childNodes[1].innerHTML
    getClass("musician")[0].innerHTML=m.childNodes[3].innerHTML
    
    for(let i=0;i<m.parentNode.parentNode.childNodes.length;i++){
        m.parentNode.parentNode.childNodes[i].childNodes[0].className="";
    }
    getClass("play-suspend")[0].style.display="block";
    getClass("play-start")[0].style.display="none";
    m.className="onplaying";
    // 播放进度重置
    document.getElementById("cur").className="cur";
    setTimeout(function(){
        document.getElementById("cur").className="cur playscroll play-run";        
    },100)
    setTimeout(function(){
        let animaTime=Math.floor(document.getElementById("video1").duration)+"s";//获取当前歌曲播放时长
        document.getElementById("cur").style="animation-duration:"+animaTime;//设置动画播放时长
    },1000)
}

function qiege(){       // 获取歌曲列表，自动切歌
    //查找正在播放歌曲的所在li标签，切换成下一个li播放 
    //初始化
    var currentMusic=0;
    // 记录当前是哪首歌曲
    if(getClass("onplaying").length!=0){
        let child=getClass("onplaying")[0].parentNode;
        var childs = child.parentNode.childNodes;
        for(var i=0;i<childs.length;i++){
            if(childs[i]===child){
                currentMusic=i+1;           //获取当前播放li在子节点的顺序
                // 判断是否是最后一首
                if(currentMusic == childs.length) {
                    currentMusic = 0;
                }
            }
        }
    }
    //设置音频链接为下一首的链接    
    let srclink=document.getElementById("m_list").childNodes[currentMusic].attributes["srclink"].value;
    document.getElementById("video1").src=srclink;     
    // 播放切换歌曲
    playnow(document.getElementById("m_list").childNodes[currentMusic].childNodes[0])   
}

// 播放列表的显示隐藏
function LBoxVisi(){
    var oLBox=document.getElementById('g_playlist');
    oLBox.style.visibility=="hidden"?oLBox.style.visibility="visible":oLBox.style.visibility="hidden";
}
function LBoxHidd(){
    var oLBox=document.getElementById('g_playlist');
    oLBox.style.visibility="hidden";
}

// 整个播放条的锁定与解锁
function playlock(a){
    let oPlayBar=document.getElementById('play-bar');
    if(oPlayBar.className=="bar-unlock icon-play-bar"){
        oPlayBar.className="bar-lock icon-play-bar";
       a.className="icon-play-bar lock";
        oPlayBar.onmouseover=function(){
            oPlayBar.style.height="53px";
        }
        oPlayBar.onmouseout=function(){
            oPlayBar.style.height="53px";
        }
    }else if(oPlayBar.className=="bar-lock icon-play-bar"){
        a.className="icon-play-bar unlock";
        oPlayBar.className="bar-unlock icon-play-bar";
        oPlayBar.onmouseout=function(){
            oPlayBar.style.height="6px";
        }
        oPlayBar.onmouseover=function(){
            oPlayBar.style.height="53px";
        }
    }
    
}

// 歌曲的播放与暂停
function PStart(a){
    getClass("play-suspend")[0].style.display="block";
    a.style.display="none";
    document.getElementById("video1").play();
    getClass("cur")[0].classList.add("play-run");
}
function PSuspend(b){
    getClass("play-start")[0].style.display="block";
    b.style.display="none";
    document.getElementById("video1").pause();
    getClass("cur")[0].classList.remove("play-run");
}

// 播放进度时间的递增
video1.addEventListener("timeupdate",function(){
    var timeDisplay;
    //用秒数来显示当前播放进度
    timeDisplay = Math.floor(video1.currentTime);
    var min=parseInt(timeDisplay/60);
    if(min<10){
        min="0"+min
    }
    var miao=timeDisplay%60;
    if(miao<10){
        miao="0"+miao
    }
    var time=min+":"+miao
    var aaa=document.getElementById("aaa");
    aaa.innerText=time;
},false);
// 播放歌曲的总时长
const oVideo=document.getElementById("video1");
oVideo.ondurationchange=function(){
    let timeDuration=Math.floor(oVideo.duration);
    var min=parseInt(timeDuration/60);
    if(min<10){
        min="0"+min
    }
    var miao=timeDuration%60;
    if(miao<10){
        miao="0"+miao
    }
    var time=min+":"+miao
    document.getElementById("mdur").innerHTML=time;
}
// 音量条的显示隐藏
function vbgOpenClose(){
    var oVBg=getClass('voice-barbg')[0];
    if(oVBg.style.visibility=="hidden"){
        oVBg.style.visibility="visible";
    }
    else if(oVBg.style.visibility=="visible"){
        oVBg.style.visibility="hidden";
    }
}
// 天气接口
function getTianqi(){
    let xml=new XMLHttpRequest()
    let url="http://wthrcdn.etouch.cn/weather_mini?city=晋中"
    xml.open("GET",url,true)
    xml.send()
    xml.onreadystatechange=function(){
        if(xml.readyState==4&& xml.status==200){
            var data=JSON.parse(xml.response);
            document.getElementById("TianQi").innerHTML=data.data.city+"市天气，"+data.data.forecast[0].date+"，"+data.data.forecast[0].high+"，"+data.data.forecast[0].low+"，"+data.data.forecast[0].fengxiang+"，"+data.data.forecast[0].type+"，"+data.data.ganmao;
        }else{
            document.getElementById("TianQi").innerText="天气获取失败，正在修复请等待"
        }
    }
}

// 收藏歌曲至歌单
// 收藏步骤1、点击收藏按钮，获取歌曲链接mSrc
    function getSrc(ele,e){
        // 取消冒泡
        if(e.stopPropagation){
            e.stopPropagation();
        }else if(ele.cancleBubble){
            e.cancleBubble = true;
        }
        // 获取src
        let tSrc=ele.parentNode.parentNode.attributes["srclink"].value;
// 收藏步骤2、判断当前是否登录
        if(getClass("userId").length!=0){//已登录
            let tblName="u"+getClass("userId")[0].alt   //获取账户id
            // console.log(tblName)

// 收藏步骤3、 ajax拉取歌曲全部信息
            var xmlhttp=new XMLHttpRequest()
            var url="php/chaxunBysrc.php?src="+tSrc;
            xmlhttp.open('GET',url,true)
            xmlhttp.send()
            xmlhttp.onreadystatechange=function(){
                if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
                    if(xmlhttp.response!=0){
                        var data=JSON.parse(xmlhttp.response)       //返回歌曲信息
//收藏步骤4、将拉取的数据填入登录用户的默认歌单表中
                        addLike(data[0],tblName)         //传入实参歌曲对象，和用户歌单表名
                    }else{
                        alert("该歌曲资源不存在")
                    }
                }
            }
        }else{//未登录
            openLogin()
        }
    }
    
    // 拉取的数据填入登录用户的默认歌单表中
    function addLike(obj,usertbl){
        var xmlhttp=new XMLHttpRequest()
        var url="php/addToUserList.php?mId="+obj.mId+"&&mSrc="+obj.mSrc+"&&mName="+obj.mName+"&&mBy="+obj.mBy+"&&uId="+usertbl;
        xmlhttp.open('GET',url,true)
        xmlhttp.send()
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
                if(xmlhttp.responseText==0){
                    alert("√ 收藏成功")         //收藏成功               
                }else{          //该歌曲已收藏
                    alert("× 歌曲已收藏")
                }
            }
        }    
    }

// 搜索歌曲

function buquan(input){
    let ResSearch=getClass("res-search")[0]//搜索结果框
    let word=input.value//输入字
    if(word!=""){
        // ajax拉取搜索匹配的歌曲
        var xmlhttp=new XMLHttpRequest()
        var url="php/searchWord.php?value="+word;
        xmlhttp.open('GET',url,true)
        xmlhttp.send()
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
                if(!xmlhttp.response==0){
                    var data=JSON.parse(xmlhttp.response)       //返回歌曲信息
                    ResSearch.innerHTML=""  //清空
                    for(let i=0;i<data.length;i++){
                        let a=document.createElement("a")
                        a.href="song.html?id="+data[i].mId;
                        a.innerHTML="<span>"+data[i].mName+"</span>-<span>"+data[i].mBy+"</span>"
                        ResSearch.appendChild(a)
                    }
                }else{
                    alert("该歌曲资源不存在")
                }
            }
        }
    }  
}

// 获取登录用户id，实现登录账号页面切换保存
// 获取登录信息
// if(location.href.search(/\?/)!=-1){
//     // 获取用户id
//     let uid=location.href.split("?")[1].split("=")[1]
//     // 顶部导航登录
//     let userimg=document.createElement("img");
//     userimg.setAttribute("src","img/userimg.jpg")
//     userimg.setAttribute("alt",uid)
//     userimg.setAttribute("onclick","toUser()")
//     userimg.className="userId"
//     let topLogin=getClass("top-login")[0];
//     let denglu=getClass("color999")[0];
//     topLogin.style="padding-top:0px";
//     denglu.innerHTML="";
//     topLogin.insertBefore(userimg,denglu);
//     // 个人中心
//     if(getClass("login-box").length!=0){
//         getClass("login-box")[0].childNodes[1].innerHTML="<img src='img/userimg.jpg' width='80px' onclick='toUser()'><span style='font-size:14px;font-weight:700;color:#000'>用户"+uid+"</span>"
//         getClass("login-box")[0].childNodes[3].remove()
//     }
// }