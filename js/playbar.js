window.onload=function(){
    
    

    
    
    
    // 获取歌曲列表的DOM
    var oMList=document.getElementById("m_list");
    var aMLi=oMList.getElementsByTagName("li");
    var aMLiA=oMList.getElementsByTagName("a");
    for(var i=0;i<aMLi.length;i++){
        aMLi[i].index=i;
        aMLi[i].onclick=function(){
            oVideo.src = "src/"+music[this.index].name + ".mp3";
            for(var i=0;i<aMLiA.length;i++){
                aMLiA[i].className="";
                aMLiA[this.index].className="onplaying";
                oCur.classList.remove("playscroll")
            }
            oPSuspend.style.display="block";
            oPStart.style.display="none";
            
            oCur.className="cur playscroll play-run"
        }
    }
    
    
    
    

    
}