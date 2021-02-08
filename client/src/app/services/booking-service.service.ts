import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http' ;
import{Observable} from 'rxjs';

// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  domain=environment.domain;
  options;

  constructor(private http:HttpClient) { }

  createAuthenticationHeaders(){
    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
    })
    this.options = { headers: headers };
  }

  checkAvailability(rqSeats):Observable<any>{
    return this.http.get<any>(this.domain+'/check-availability/'+rqSeats)
  }

  lockSeats(seats):Observable<any>{
    return this.http.post<any>(this.domain+'/lock-seats',seats,this.options)
  }

  bookSeats(userData):Observable<any>{
    return this.http.post<any>(this.domain+'/book-seats',userData,this.options)
  }

  lockedCurrentSeats(bookingId):Observable<any>{
    return this.http.get<any>(this.domain+'/locked-current-seats/'+bookingId)
  }
}
