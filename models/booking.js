const mongoose=require ('mongoose');
const helper=require('../helper');


const codeNameValidator=[
    {validator:helper.stringValidator,
    message: 'only alphabets are allowed'}
  ]
  
  const emailValidator=[
    {validator:helper.emailValidator,
    message: 'Please enter correct email'}
  ]

var bookingSchema=new mongoose.Schema({
    bookingId:{type:String,required:true,unique:true},
    name:{type:String,validate:codeNameValidator,minlength:[3,'length mustbe in 3 to 30'],maxlength:[15,'length mustbe in 3 to 30']},
    email:{type:String,validate:emailValidator},
    seats:{type:Array,defult:[]},
    status:{type:String,required:true}
},{timestamps:true})

module.exports=mongoose.model('Booking',bookingSchema)