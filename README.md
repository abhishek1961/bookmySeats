# Book MY Ticket App

#App uses Nodejs expressjs in backend and frontend build on Angular 10

1. Insatall packages of both frontend(client Directory) and backend using npm install


2. Default ports and base path
    Backend:http://loacalhost/8080 
    Frontend:http://loacalhost/4200

3. configuration files and path   
    backend/config.js  (backend)
    

4. After running the server the base url redirected to the page where you can select Seats

5. On Click next button you will redirect to the next page where you can choose your seats

6. After selection, your seats have been locked for next 5 minutes and you will redirect to last page of sending user details

7.  A cron is run after every 5 minutes to release  dead-locked seats

8. For your convenience I made this app live on https://book-myticket.herokuapp.com/ (base URL)

Note: cron is not runnimg on live server. To release tickets on live server use  https://book-myticket.herokuapp.com/api/release-locked/
