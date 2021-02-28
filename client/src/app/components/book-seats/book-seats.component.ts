import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import {BookingServiceService} from '../../services/booking-service.service'
@Component({
  selector: 'app-book-seats',
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.css']
})
export class BookSeatsComponent implements OnInit {

  
  bookingDetails:object={};
  form:FormGroup;
  processing=false;
  show=false
  mm:number=0;
  ss:number=30;
  t;

  constructor(private bs:BookingServiceService, private route:ActivatedRoute,private router:Router,private frombuilder:FormBuilder) { 
    this.createForm()
  }

  createForm(){
    this.form=this.frombuilder.group({
      bookingId:localStorage.getItem('bookingId'),
      name:['',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.validateName
      ])],
      email:['', Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
    })
  }

  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['name'].disable();
   }
   enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['name'].enable();
   }

  validateName(controls){
    const regExp=new RegExp(/^[A-Za-z\s]+$/);
    if(regExp.test(controls.value))
    {return null;
    }
    else{
      return {'validatename':true};
    }
  }
  validateEmail(controls){
    const regExp=new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)){
      return null;
    }
    else{
      return {'validateEmail': true}
    }
  }

  onSubmit(){
    this.processing=true;
       this.disableForm();
      const userData={
        bookingId:this.form.get('bookingId').value,
        email:this.form.get('email').value,
        name:this.form.get('name').value,
      };
      console.log(userData)
    this.bs.bookSeats(userData).subscribe(data=>{
      if(data.success){
        alert(data.message)

      }
      else{
        alert(data.message)
      }
      localStorage.clear();
      this.router.navigate(['home'])
    })
  }


 reduce_time(){
   if(this.mm==0 && this.ss==0){
    clearInterval(this.t);
    localStorage.clear();
    this.router.navigate(['home'])
   } 
    else{
        this.ss--;
    if(this.ss == -1) {this.ss = 59; }
    if(this.ss == 59 ) {this.mm--;}
   
    }   
}

  ngOnInit(): void {
    

    this.bs.lockedCurrentSeats(localStorage.getItem('bookingId')).subscribe(data=>{
      if(data.success){
        console.log(data)
        this.show=true
        this.bookingDetails=data.result

        this.t=setInterval(()=>{
          this.reduce_time();
      },1000);

      }else{
        this.router.navigate(['home'])
      }
    })

  }

}
