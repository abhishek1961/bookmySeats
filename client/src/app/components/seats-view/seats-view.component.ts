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
        else{this.yourSeats.push(i)
          canSelect--;}
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
        console.log(data)
        if(data.success){
          if(parseInt(param.get('rqSeats')) > data.limit){
            alert('You can not book tickets more than '+data.limit+' at a time')
            this.router.navigate(['main'])
          }
         this.rowSeats=data.rowSeats,
         this.totalSeats=data.totalSeats
         this.filledSeats=data.filledSeats.sort()
        }
        else{
          alert(data.message)
          this.router.navigate(['main'])
        }
      })
    })
  }

}
