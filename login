//login.html

<!DOCTYPE html>
<html>
<head>
 <title>signup</title>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
 <style>  
 

body {
  
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
        
 .container {
     margin-top: 100px;
 }
 form {
  margin: 50px;
     padding: 10px;
     background-color: white;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
     border-radius: 5px;
 }
 label {
     font-weight: bold;
 }
 .form-control {
     margin-bottom: 10px;
 }
 .btn {
     background-color: #007bff;
     position: relative;
     width: 100%;
     color: #ffffff;
     border: none;
     padding: 10px 20px;
     border-radius: 5px;
     cursor: pointer;
 }
 .btn:hover {
     background-color: #0056b3;
 }
 h1{
    position: relative;;
    padding: 20px;
     color: #04d547;
     font-family: sans-serif;
     text-align: center;
 }
</style>
</head>
 <body>
    
    
    <div class="container" >
      
      
     <div class="row">
      <div class="col-md-6 mx-auto">
       <form onsubmit="user(event)">
            <h1>Sign In</h1>
           <div class="form-group">
            <label for="email">Email Adress:</label>
            <input type="email" id="email" name="email" class="form-control" required>
           </div>
           <div class="form-group">
            <label for="password">Password :</label>
            <input type="password" id="password" name="password" class="form-control" required>
           </div>
           <div class="form-group">
            <button type="submit" id="login" class="btn btn-primary">Login</button>
           </div><br>
           <div class="form-group">
            <button type="submit" id="signup" class="btn btn-primary">Create New user</button>
           </div>           
       </form>
      
      </div>
     </div></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.7/axios.min.js"></script>
    
    <script>
    // add user 
    async function user(event) {
      try{
      event.preventDefault();
      const email= await document.getElementById('email').value;
      const password=await document.getElementById('password').value;
      const obj={
        email,
        password
      }
    
        axios.post('http://localhost:3000/user/login',obj)
      }
      catch(error){
        console.log(error);
      }
    }
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
 </body></html>
