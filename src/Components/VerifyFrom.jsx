import React, {useState} from "react";
import ButtonSpinner from "./ButtonSpinner.jsx";

import validation from "../utilites/validationHelper.js";
import toast from "react-hot-toast";
import axios from "axios";

const verifyFrom = () => {
  const [submit, setSubmit]= useState(false)


  ////onSubmit call
  const onSubmit = async (e)=>{
    e.preventDefault();
    let formData=  new FormData(e.target);
    const otp = formData.get("otp");
    if (validation.isEmpty(otp)){
      toast.error("Verification code requird")
    }else {
     let email= sessionStorage.getItem("email");
      setSubmit(true);
      // login api call from back-end
      const res= await axios.post(`${validation.API_BASE}/verify-login`,{
        UserEmail:email,OTP:otp
      });
      setSubmit(false);
      if (res.data["msg"]==="success"){
        sessionStorage.removeItem("email")
        sessionStorage.setItem("token",res.data["data"] );
        window.location.href ="/"

      }else {
        toast.error("Request fail");

      }

    }
  }
  return (

      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-md-4 ">
            <div className="card mt-5 p-2">
              <form onSubmit={onSubmit} className="p-4">
                <label className="form-label">Verification Code</label>
                <input name="otp" type="text" className="form-control mt-1"/>
                <button disabled={submit} type="submit" className="btn btn-danger w-100 mt-2 pt-2">
                  {
                    submit ? (<ButtonSpinner/>) : ("Submit")
                  }
                </button>
              </form>

            </div>

          </div>
        </div>

      </div>
  );
};

export default verifyFrom;
