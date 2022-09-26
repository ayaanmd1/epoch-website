const DOM = {
    submitBtn: '.submit-button',
    submitPending: '.submit-button__pending',
    submitText: '.submit-button__text',
    submitLoaded: '.submit-button__loaded' };
   
  //find exact children of the button
  const findChildren = elem => {
   
    return [
    elem.querySelector(DOM.submitPending),
    elem.querySelector(DOM.submitText),
    elem.querySelector(DOM.submitLoaded)];
   
  };
   
  //find node parent function
  const findParent = (elem, referenceElem) => {
   
    const className = referenceElem.slice(0, referenceElem.length);
   
    let ind = true;
   
    while (ind) {
   
      if (elem.classList.contains(className)) {
        break;
      } else {
        elem = elem.parentNode;
      }
   
    }
   
    return elem;
   
  };
  function contact_us_red_details(){
    

    if(document.querySelector("#name_input").value.length===0){
      document.querySelector("#name_input").classList.add("form-control-active")
    }
    if(document.querySelector("#phone_input").value.length===0){
      document.querySelector("#phone_input").classList.add("form-control-active")
    }
    if(document.querySelector("#email_input").value.length===0){
      document.querySelector("#email_input").classList.add("form-control-active")
    }
    if(document.querySelector("#message_input").value.length===0){
      document.querySelector("#message_input").classList.add("form-control-active")
    }

  }
function validate(){
  if(document.querySelector("#name_input").value.length!==0 &&
  document.querySelector("#phone_input").value.length!==0 &&
  document.querySelector("#email_input").value.length!==0 &&
  document.querySelector("#message_input").value.length!==0){
    return true;
  }else{

    contact_us_red_details()
    return false;
  }
}

  function clearInput(){
    document.querySelector("#name_input").value=null;
    document.querySelector("#phone_input").value=null;
    document.querySelector("#email_input").value=null;
    document.querySelector("#message_input").value=null;
  }

  function dataSend(){
      fetch("encrypted_info_contact_us",{
        method:"POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
        body:JSON.stringify({
          name:document.querySelector("#name_input").value,
          phone_number:document.querySelector("#phone_input").value,
          email:document.querySelector("#email_input").value,
          message:document.querySelector("#message_input").value
        })
      })
      clearInput();  
  }

  function remove_red(){
    document.querySelector("#name_input").classList.remove("form-control-active")
    document.querySelector("#phone_input").classList.remove("form-control-active")
    document.querySelector("#email_input").classList.remove("form-control-active")
    document.querySelector("#message_input").classList.remove("form-control-active")
  }
  //onclick function for buttons 
  const elem=document.querySelector(DOM.submitBtn)
  
  // let clickedOnce=false;
    elem.addEventListener('click', event => {
        

        if(validate()===false){
          alert("Please enter all required fields.")
        }else{

          remove_red();


          dataSend()

          let clickedElem = findParent(event.target, 'submit-button');
          const innerChildren = findChildren(clickedElem);
       
          //adding active class
          if (!clickedElem.classList.contains('js-active')) {
       
            clickedElem.classList.add('js-active');
       
            innerChildren.forEach(elem => {
              elem.classList.add('js-active');
            });
            
            function click(){
              
              setTimeout(()=>{
                clickedElem.classList.remove('js-active');
              innerChildren.forEach(elem => {
                elem.classList.remove('js-active');
              });
              },100)
              
            }
            setTimeout(()=>{
              click();
            },4000)
          } 
        }
      
    });
   
  