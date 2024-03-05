 
document.getElementById('login').addEventListener('click',()=>{
  user(event);
})

 
 // add user 
 async function user(event) {
    try{
    event.preventDefault();
    const email=  document.getElementById('email').value;
    const password= document.getElementById('password').value;
    const usesrstatus=document.getElementById('userstatus');
    const obj={
      email,
      password
    }
  
     const logindata=await axios.post('http://13.48.124.79:3000/user/login',obj);
       usesrstatus.innerText=logindata.data.message;
        if(logindata.data.message==="User Login Sucessfully!!"){
          localStorage.setItem('token', logindata.data.token);
        window.location.href = "../PremiumFeatureFrontend/premiumfeature.html" 
      }
    }
    catch(error){
      console.log(error)
      const usesrstatus=document.getElementById('userstatus');
      usesrstatus.innerText=error.response.data.message;
    }
  }
  document.getElementById('signup').addEventListener('click',()=>{
    window.location.href = "../Signup/signup.html" 
  })

  document.getElementById('forgot').addEventListener('click',()=>{
    window.location.href = "../ForgotPassword/forgotpassword.html" 
  });