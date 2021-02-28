var cron = require('node-cron');
const {checkAvailability,lockSeats,bookSeats,lockedSeats,releaseLocked,releaseLockedCron}=require('../controllers/booking')

module.exports=(router)=>{
    router.get('/check-availability/:rqSeats',checkAvailability);

    
    router.post('/lock-seats/',lockSeats);

    router.post('/book-seats/',bookSeats);

    router.get('/locked-current-seats/:bookingId',lockedSeats);

    router.get('/release-locked/',releaseLocked);

    // cron.schedule('*/5 * * * *', () => {
    //     console.log('released lock')
    //     releaseLockedCron()
    //   });


    return router
}