const express=require('express');
const connection=require('../connection');
const router=express.Router();
router.get('/get',(req,res)=>{
    var query="select * from ordermanage";
    connection.query(query,(err,results)=>
    {
        if(!err)
        {
            return res.status(200).json(results);
        }
    })

})
router.post('/add',(req,res)=>
{
    let orderd=req.body;
    var query="insert into ordermanage(ordernumber,duedate,cusname,cusaddress,phone,total) values(?,?,?,?,?,?)";
    connection.query(query,[orderd.ordernumber,orderd.duedate,orderd.cusname,orderd.cusaddress,orderd.phone,orderd.total],(err,results)=>{
        if(!err)
        {
            return res.status(200).json({message:"Added"});
        }
    })

})
router.patch('/update',(req,res)=>
{
    let up=req.body;
    var query="update ordermanage set cusname=? where ordernumber=?";
    connection.query(query,[up.cusname,up.ordernumber],(err,results)=>{
        if(!err)
        {
            return res.status(200).json({message:"Updated"});
        }
    })

})

router.delete('/del/:id',(req,res)=>
{
    const id=req.params.id;
    var query=" delete from ordermanage where ordernumber=?";
    connection.query(query,[id],(err,results)=>{
        if(!err)
        {
            return res.status(200).json({message:"Updated"});
        }
    })

})
module.exports=router;
