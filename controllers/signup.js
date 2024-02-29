const path = require('path');
const User = require('../models/signup');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

exports.AddUser = async(req, res) => {
  try{
  const username=req.body.name;
  const email=req.body.email;
  const password=req.body.password;
  bcrypt.hash(password,10,async(err,hash)=>{
  await User.create({
    username:username,
    email:email,
    password:hash,
    Income:0,
    Expenses:0
  });
   return  res.status(201).json({message:"Succesfully Created New User"});
  })
}
catch(err){
 res.status(500).json(err);
}

};

function generateAccessToken(id) {
  return jwt.sign({userId:id} ,'576788yuihjhdjhoijoidjoj6787898090ihjikjlkkllklmlml');
}

exports.getuser=(req,res,next)=>{
  const email=req.params.useremail
  User.findOne({where :{email:email}}).then(user=>{
    res.json(user);
  }).catch(err=>console.log(err))
};

exports.checkuser=async (req,res,next)=>{
  try{
  const email=req.body.email;
  const password= req.body.password;
  const user=await User.findOne({where:{email:email}});
    if(user){
      bcrypt.compare(password,user.password,(err,re)=>{
        if(!err){
          if(re){
          return res.json({success:true,message:"User Login Sucessfully!!",token:generateAccessToken(user.id)});
          }
        else{
            return res.status(401).json({success:false,message:'Incorrect Password'});
        }
      }
      
      });
    }
  else{
    return res.status(404).json({message:"User Doesn't Exist"});
    }
  
  }
  catch(err){
   console.log(err)
  }
}


