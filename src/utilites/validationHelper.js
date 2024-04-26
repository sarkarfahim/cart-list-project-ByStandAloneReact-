class ValidationHelper {

    static  isLogin(){
        let token  = sessionStorage.getItem("token")
        if (token !== null) {
            return true;
        } else {
            return false;
        }

    }

    static  API_BASE ="https://cart-api.teamrabbil.com/api";

    static  tokenHeader (){
        return {
            headers:{
                "token": sessionStorage.getItem("token")

            }
        }
    }
   static Unauthorized(code){
        if(code===401){
            sessionStorage.clear();
            window.location.href="/login"
        }
   }

     static  isEmpty(value){
         return  value.length===0;
     }
}

export default ValidationHelper;