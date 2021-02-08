import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 reqseats:number=0;

  constructor(private router:Router) { }

  counter(i: number) {
    i=Math.ceil(i)
   
   return new Array(i);
}
setSeats(index){
  this.reqseats=index
}

getselectedColor(index){
  if(index==this.reqseats){
    return {'background-color':'rgb(155, 154, 154)','color':'white'}
  }
  else {return {}}
}

gotSelection(){
  this.router.navigate(['seats-view',this.reqseats])
}

  ngOnInit(): void {
    localStorage.clear();
  }

}
