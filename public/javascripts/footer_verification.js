let newsletterButton=document.querySelector("#news_btn");
let newsletter_input=document.querySelector("#news_mail");


function dataSend(){
    
        fetch("encrypted_info_newsletter",{
        method:"POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        
        body:JSON.stringify({
            newsletter:newsletter_input.value
        })
    })
    document.querySelector("#news_mail").value=null;
}
newsletterButton.addEventListener("click",dataSend.bind(this))





