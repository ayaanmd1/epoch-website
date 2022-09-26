const arr_scroll_btns=document.querySelectorAll(".btn__scroll")

const className=(i)=>{
    if(i===0){
        return ".slider_section";
    }else if(i===1){
        return ".about";
    }
    else if(i===2){
        return ".Library";
    }
    else if(i===3){
        return ".Books";
    }
    else if(i===4){
        return ".Contact";
    }
}
arr_scroll_btns[0].focus();   
const mouseScroll=()=>{
    if(window.pageYOffset>=0 && window.pageYOffset<67){
        arr_scroll_btns[0].focus(); 
    }
    if(window.pageYOffset>67 && window.pageYOffset<850){
        arr_scroll_btns[1].focus();
    }
    if(window.pageYOffset>850 && window.pageYOffset<1550){
        arr_scroll_btns[2].focus();
    }
    if(window.pageYOffset>1550 && window.pageYOffset<2300){
        arr_scroll_btns[3].focus();
    }
    if(window.pageYOffset>2300 ){
        arr_scroll_btns[4].focus();
    }
}
window.addEventListener("scroll",mouseScroll)

for(let i=0;i<arr_scroll_btns.length;i++){
    arr_scroll_btns[i].addEventListener("click",()=>{
        if(i==0){
            window.scrollTo(0,0)
        }
        if(i==1){
            window.scrollTo(0,700)
        }
        if(i==2){
            window.scrollTo(0,1500)
        }
        if(i==3){
            window.scrollTo(0,2200)
        }
        if(i==4){
            window.scrollTo(0,2800)
        }       
    })
}
