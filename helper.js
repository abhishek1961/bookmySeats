module.exports={
    makeRandStr:(length)=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     },
     lengthChecker:(varr,min,max)=>{
        // Check if username exists
  if (!varr) {
    return false; // Return error
  } else {
    // Check length of username string
    if (varr.length <= min || varr.length >= max) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
     },
     stringValidator:(stringVar)=>{ //accept alphabets and space
        if(!stringVar){
            return false
        }
        else{
            const regExp=new RegExp(/^[A-Za-z\s]+$/);
           
            return regExp.test(stringVar)
        }
    }, 
    emailValidator:(email)=>{
        if(!email){
            return false
        }
        else {
            // Regular expression to test for a valid e-mail
            const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return regExp.test(email); // Return regular expression test results (true or false)
          }
    }
    

}