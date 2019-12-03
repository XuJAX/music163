//登录注册界面
function getClass(a){
    return document.getElementsByClassName(a);
}
function getName(a){
    return document.getElementsByName(a);
}
function getTag(a){
    return document.getElementsByTagName(a);
}
let loginModes=getClass("login-modes")[0]
let lmTitle=getClass("lm-title")[0] 
let login0=getClass("login0")[0]
let login1=getClass("login1")[0]
let login2=getClass("login2")[0]

function openLogin(){       // 打开登录方式窗口
    lmTitle.innerHTML="登录"
    loginModes.style.display="block";
    login0.style.display="block";
    login1.style.display="none";
    login2.style.display="none";
}
function closeLogin(){      // 关闭登录窗口
    loginModes.style.display="none";
}
function gotoLogin(){       // 去登录窗口
    lmTitle.innerHTML="手机号登录"
    login0.style.display="none";
    login1.style.display="block";
    login2.style.display="none";
}
function gotoRegis(){       // 去注册窗口
    lmTitle.innerHTML="手机号注册"
    login0.style.display="none";
    login1.style.display="none";
    login2.style.display="block";
}

function registerId(){      //注册账号
    let regisTel=getName("regis-tel")[0].value;
    let regisPsw=getName("regis-psw")[0].value;
    let aN= /^[\d]+$/;
    if(regisTel.length==11&&aN.test(regisTel)==true&&regisPsw.length>=6){
        var xmlhttp=new XMLHttpRequest()
        var url="php/addUser.php?userId="+regisTel+"&&userPsw="+regisPsw;
        xmlhttp.open('GET',url,true)
        xmlhttp.send()
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
                if(xmlhttp.responseText==0){
                    addTbl(regisTel);   //创建用户歌单
                }else{
                    alert("添加失败")
                }
            }
        }
    }else if(regisTel.length!=11||aN.test(regisTel)==false){
        alert("请按正确格式输入:\n11位纯数字手机号")
    }else if(regisPsw.length<6){
        alert("密码长度不小于6位")
    }
}
function addTbl(na){        //创建用户歌单
    var xmlhttp=new XMLHttpRequest()
    var url="php/addTbl.php?name=u"+na;
    xmlhttp.open('GET',url,true)
    xmlhttp.send()
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
            if(xmlhttp.responseText==0){
                alert("注册成功")
            }else{
                alert("添加失败")
            }
        }
    }
}


function loginID(){         //登录账号
    let loginTel=getName("login-tel")[0].value;
    let loginPsw=getName("login-psw")[0].value;
    let aN= /^[\d]+$/;
    if(loginTel.length==11&&aN.test(loginTel)==true){   //检查账号格式
        var xmlhttp=new XMLHttpRequest()
        var url="php/checkLogin.php?userId="+loginTel;
        xmlhttp.open('GET',url,true)
        xmlhttp.send()
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState=="4"&&xmlhttp.status=="200"){
                if(xmlhttp.response!=0){
                    var data=JSON.parse(xmlhttp.response)
                    checkPsw(data,loginPsw)
                }else{
                    alert("该账号不存在")
                }
            }
        }
    }else if(loginTel.length!=11||aN.test(loginTel)==false){
        alert("请按正确格式输入:\n11位纯数字手机号")
    }
}
function checkPsw(arr,psw){         //验证密码
    if(arr[0].psw==psw){
        closeLogin()
        setTimeout(function(){
            console.log("aa")
            // 顶部导航登录
            let userimg=document.createElement("img");
            userimg.setAttribute("src","img/userimg.jpg")
            userimg.setAttribute("alt",arr[0].id)
            userimg.setAttribute("onclick","toUser()")
            userimg.className="userId"
            let topLogin=getClass("top-login")[0];
            let denglu=getClass("color999")[0];
            topLogin.style="padding-top:0px";
            denglu.innerHTML="";
            topLogin.insertBefore(userimg,denglu);
            // 个人中心
            if(getClass("login-box").length!=0){
                getClass("login-box")[0].childNodes[1].innerHTML="<img src='img/userimg.jpg' width='80px' onclick='toUser()'><span style='font-size:14px;font-weight:700;color:#000'>用户"+arr[0].id+"</span>"
                getClass("login-box")[0].childNodes[3].remove()
            }
        },100)
    }else{
        alert("密码错误，请重新输入：")
    }
}
function toUser(){
    let userID=document.getElementsByClassName("userId")[0].attributes["alt"].value;
    location.href="userlist.html?id="+userID;
    
}
