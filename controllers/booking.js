const Booking =require('../models/booking')
const config=require('../config')
const helper=require('../helper')
const { response } = require('express')
exports.checkAvailability=(req,res)=>{

    Booking.find({ $or:[{ status: "locked" }, { status: "booked" }],},{seats:1,},(err,result)=>{
        if(err){
            return res.json({success:false,message:'Not able to get data at this time'})
        }

       
        else{
           
            var filledSeats=[];
            result.forEach((item,index) => {
                filledSeats=[...filledSeats,...item.seats]
            });
            // return res.json({success:true,message:'seats are available'})
            if(config.seats-filledSeats.length>=req.params.rqSeats){
                return res.json({success:true,filledSeats:filledSeats,totalSeats:config.seats,
                    rowSeats:config.rowSeats,limit:config.oneTimeLimit})
            }
            else{
            return res.json({success:false,message:'Required seats are not available'})

            }

        }
        
    })
    
}

exports.lockSeats=(req,res)=>{

    if(req.body.seats.length>config.oneTimeLimit){
        return res.json({success:false,message:'Can not Book more than '+config.oneTimeLimit+' at a time'})
       
    }

    else{
        Booking.find({ $or:[{ status: "locked" }, { status: "booked" }],},{seats:1,},(err,result)=>{
            if(err){
                return res.json({success:false,message:'Not able to connect to DB'})
            }
    
           
            else{
                var filledSeats=[];
                result.forEach((item,index) => {
                    filledSeats=[...filledSeats,...item.seats]
                });
               
                const found=filledSeats.some(r=> req.body.seats.includes(r)) 
                
                if(found){
                return res.json({success:false,message:'Some of your selectied seates have Sold out'})

                }
                else{
                    req.body.bookingId=helper.makeRandStr(5);
                    req.body.status='locked';
                    booking=new Booking(req.body)
                    
                    booking.save((err,result)=>{
                        if(err){
                            return res.json({success:false,message:err.message})
                        }
                        else{            
                            return res.json({success:true,result:result,message:'Your seats have been Locked for next 5 minutes'})
                        }
                    })
                }
    
            }
            
        })
    }
    
    
}

exports.bookSeats=(req,res)=>{
    req.body.status='booked';
    const opt={ runValidators: true, context : 'query' }
    Booking.updateOne({bookingId:req.body.bookingId},{$set:{name:req.body.name,email:req.body.email,status:req.body.status}},opt,(err,result)=>{
        if(err){
            return res.json({success:false,message:err.message})
        }
        else{            
            return res.json({success:true,result:result,message:'Your Tickets have been booked Please Collect your tickets from Satation by showing your email id'})
        }
    })
    
   
}

exports.lockedSeats=(req,res)=>{
    Booking.findOne({bookingId:req.params.bookingId,status:'locked'},(err,result)=>{
        if(err){
            return res.json({success:false,message:'Not able to connect to DB'})
        }
        else{
            if(!result){
            return res.json({success:false,message:'data not found'})
            }
            else{
             return res.json({success:true,result:result})

            }
        }
    })
}

exports.releaseLocked=(req,res)=>{
   
    var dt=new Date()
    
    dt.setMinutes( dt.getMinutes() - 6 );
      

    Booking.updateOne({status:'locked',updatedAt:{$lt:dt}},{$set:{status:'released'}},(err,result)=>{
        res.json({result:result,dataOrig:dt})
    })
}

exports.releaseLockedCron=()=>{    
    var dt=new Date()
   
    dt.setMinutes( dt.getMinutes() - 6 );
     

    Booking.updateOne({status:'locked',updatedAt:{$lt:dt}},{$set:{status:'released'}},(err,result)=>{
       
    })
}