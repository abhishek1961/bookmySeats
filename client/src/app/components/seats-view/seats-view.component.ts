import { Component, OnInit } from '@angular/core';
import {BookingServiceService} from '../../services/booking-service.service'
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-seats-view',
  templateUrl: './seats-view.component.html',
  styleUrls: ['./seats-view.component.css']
})
export class SeatsViewComponent implements OnInit {

   reqSeats:number=0
   rowSeats:number
   totalSeats:number=0
   filledSeats:Array<number>=[]
   yourSeats:Array<number>=[]
   btnDisabled:boolean=false


   constructor(private bs:BookingServiceService, private route:ActivatedRoute,private router:Router) { }

   counter(i: number) {
     i=Math.ceil(i)
    
    return new Array(i);
}

specialCounter(i:number,total:number,row:number){
  if((i+1)*row<total){
    return this.counter(row)
  }
  else{
    return this.counter(total%i)

  }
}

getColorcode(index){
  if(this.filledSeats && this.filledSeats.includes(index)){
    return {'background-color':'#f84464','color':'white','border':'none'}
  }
  else if(this.yourSeats && this.yourSeats.includes(index)){
    return {'background-color':'#2dc492','color':'white','border':'none'}
  }
  else{
    return {'background-color':'white'}
  }
}

fillSeats(index,l){
  if(l>this.totalSeats){
    l=this.totalSeats
  }
  var canSelect=this.reqSeats-this.yourSeats.length
 
 
  if(canSelect==0){
    this.yourSeats=[];
    canSelect=this.reqSeats
  }

  
  // check if value present in both array 
  if(!this.filledSeats.includes(index) && !this.yourSeats.includes(index)){
   
    //next found to set upper limit 
    var next_found=l+1
    if(this.filledSeats.find(x=>x>index)==undefined){
      next_found=l+1
    }
    else if(this.filledSeats.find(x=>x>index)<l){
      next_found=this.filledSeats.find(x=>x>index)
    }
   
    
    
      for(var i=index;i<next_found;i++){
      
       
        if(canSelect==0 ||this.yourSeats.includes(i)){
         

          break;
        }
        else{
          this.yourSeats.push(i)          
          canSelect--;}
      }
      return canSelect;
      
  }
}

findMaxVacentEleSet(l,u,row_n){
  var freeObj={max_vacent:0,lVal:0,mVal:0,fVal:0}
  var row_count=row_n;
  for(var i=0;i<=(u/row_n)-(l/row_n);i++){
    if(((i+1)*row_n+l>u)){
      row_count=u%row_n
    }
    for(var j=i*row_n+1+l;j<=i*row_n+row_n+l;j++){
      if(j<=u){
       //can add check for yours added seats
        if(this.filledSeats.includes(j) || this.yourSeats.includes(j)){
          // last corner case
         
          row_count--} 
              
      }
      
    }
    if(row_count>freeObj.max_vacent){
      freeObj.max_vacent=row_count
      freeObj.lVal=i*row_n+1+l
      freeObj.mVal=(i*row_n+row_n)-row_count+1+l      
      freeObj.fVal=i*row_n+row_n+l
    }
   
    row_count=row_n;
  }
  
  return freeObj
}

automaticSeatFill(){
  // first insertion
  var retObj=this.findMaxVacentEleSet(0,this.totalSeats,this.rowSeats)
  this.fillSeats(retObj.mVal,retObj.fVal)
  
  // rest neare Insertion  
  var counter=1; 
  while(this.reqSeats-this.yourSeats.length!=0)
  {
    //check with rowUp   
    var retObjU=this.findMaxVacentEleSet(retObj.lVal-(counter*this.rowSeats)-1,retObj.fVal,this.rowSeats)
    if(retObjU.max_vacent!==0){
      this.fillSeats(retObjU.mVal,retObjU.fVal)
    }
    if(this.reqSeats-this.yourSeats.length!=0){
      //check with rowDown     
      var retObjD=this.findMaxVacentEleSet(retObj.lVal-1,retObj.fVal+(counter*this.rowSeats),this.rowSeats)
      if(retObjD.max_vacent!==0){
        this.fillSeats(retObjD.mVal,retObjD.fVal)
      }
    }

    counter++
  }
  


}

automaticSeatAllocation(){

  var findMaxgap=0;
  var arr=[0,...this.filledSeats,this.totalSeats+1];
  var lval=1;
  for(var i=0;i<arr.length;i++){
      if(arr[i+1]-arr[i] > findMaxgap){
       
          findMaxgap=arr[i+1]-arr[i]-1;
          lval=arr[i]+1;
          if(findMaxgap>=this.reqSeats){break;}
        
      }
   
  }
  console.log(findMaxgap,lval)
  console.log(this.reqSeats)

  if(this.reqSeats <= findMaxgap){
    for(var i=lval;i<lval+this.reqSeats;i++){
      console.log(i)
      this.yourSeats.push(i)
    }
  }
}

  
lockData(){
  this.btnDisabled=true;
  this.bs.lockSeats({seats:this.yourSeats}).subscribe(data=>{
    console.log(data)
    if(data.success){     
      localStorage.setItem('bookingId',data.result.bookingId)
      
        alert(data.message)
        this.router.navigate(['book-seats'])
      
    }
  }) 
}  

  ngOnInit(): void {   
    localStorage.clear();
    this.route.paramMap.subscribe((param:ParamMap)=>{
      
      this.reqSeats=parseInt(param.get('rqSeats'))
      this.bs.checkAvailability(this.reqSeats).subscribe(data=>{
        
        if(data.success){
          if(parseInt(param.get('rqSeats')) > data.limit){
            alert('You can not book tickets more than '+data.limit+' at a time')
            this.router.navigate(['main'])
          }
         this.rowSeats=data.rowSeats
         this.totalSeats=data.totalSeats         
         this.filledSeats=data.filledSeats.sort(function(a, b) {
          return a - b;
        })
         
         this.automaticSeatFill()
        }
        else{
          alert(data.message)
          this.router.navigate(['main'])
        }
      })
    })
  }

}
