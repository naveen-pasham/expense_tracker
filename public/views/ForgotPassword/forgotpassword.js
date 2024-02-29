
    async function forgotpassword(event) {
        try{
        event.preventDefault();
        const email=  document.getElementById('email').value;      
        const obj={
            email
        }
      
         const forgotpassworduserdata=await axios.post('http://16.16.122.223:3000/password/forgotpassword',obj);
         console.log(forgotpassworduserdata);
        }
        catch(error){
         console.log(error);
        }
      }
