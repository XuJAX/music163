// 新碟上架轮播图
let rBtn=document.getElementsByClassName("right-btn")[0];
let lBtn=document.getElementsByClassName("left-btn")[0];
let sjSlide=document.getElementsByClassName("sj-slide");

    for(let i=0;i<sjSlide.length;i++){
        let left=645*i;
        sjSlide[i].style.left=left+"px";
    }
rBtn.onclick=function(){
    console.log("aa")
    for(let i=0;i<sjSlide.length;i++){
        let left=645*(i-1);
        sjSlide[i].style.left=left+"px";
    }
}
lBtn.onclick=function(){
    for(let i=0;i<sjSlide.length;i++){
        let left=645*i;
        sjSlide[i].style.left=left+"px";
    }
}