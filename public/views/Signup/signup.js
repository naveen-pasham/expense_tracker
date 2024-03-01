 // add user 
 async function adduser(event) {
    try{
    event.preventDefault();
    const name= await document.getElementById('username').value;
    const email= await document.getElementById('email').value;
    const password=await document.getElementById('password').value;
    const usesrstatus=await document.getElementById('userstatus');
    const obj={
      name,
      email,
      password
    }
   const userdata=await axios.get(`http://13.48.124.79:3000/user/getusers/${email}`);
   if(userdata.data===null){
      const registerdata=await axios.post('http://13.48.124.79:3000/user/signup',obj)
      usesrstatus.innerText=registerdata.data.message;
      if(registerdata.data.message==='Succesfully Created New User'){
        window.location.href = "../Login/login.html" 
      }
   }else{
    usesrstatus.innerText='User already exists'
   }

    }
    catch(error){
      console.log(error);
    }
  }