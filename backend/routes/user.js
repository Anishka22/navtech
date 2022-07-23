const express=require('express');
const { response } = require('..');
const connection=require('../connection');
const router= express.Router();
router.post('/signup',(req,res)=>{
    let user=req.body;
    query="select username,userpassword from user where username=?";
    connection.query(query,[user.username],(err,results)=>{
        if(!err){
       if(results.length<=0)
       {
        query="insert into user(username,userpassword) values(?,?)";
        connection.query(query,[user.username,user.userpassword],(err,results)=>{
            if(!err)
            {
                return res.status(200).json({message:"successfully registered"});

            }
            else{
                return res.status(500).json(err);
            }
        });
    }
       else{
        return res.status(400).json({message: "Email already exist"});
       }
    }
    else{
        return res.status(500).json(err);
    }})
    
})
router.post('/login',(req,res)=>{
    const user=req.body;
    query="select username,usserpassword from user where username=?";
    connection.query(query,[user.username],(err,results)=>
    {
        if(!err)
        {
if(results.length<=0 || results[0].userpassword!=user.userpassword){
    return response.sendStatus(401).json({message:"incorrect username and password"});


}
else if(results[0].userpassword==user.userpassword){
res.redirect('/dashboard');
}
else{
    return response.status(400).json({message:"something went wrong"});
}
    
}
        
        else{
            return res.status(500).json(err);
        }
    })

})

module.exports=router;
