# Book MY Ticket App

#App uses Nodejs, expressjs, MongoDB in backend and frontend build on Angular 10

1. Install packages of both frontend(client Directory) and backend using npm install


2. Default ports and base path
    Backend:http://loacalhost/8080 
    Frontend:http://loacalhost/4200

3. configuration files and path   
    backend/config.js  (backend)
    

4. After running the server the base URL redirected to the page where you can select Seats

5. On Click next button you will redirect to the next page where your states will be marked 

6. After selection, your seats have been locked for next 5 minutes and you will redirect to the last page of sending user details

7.  A cron is run after every 5 minutes to release  dead-locked seats

8. For your convenience I made this app live on https://book-myticket.herokuapp.com/ (base URL)

Note: To release tickets manually:  https://book-myticket.herokuapp.com/api/release-locked/
