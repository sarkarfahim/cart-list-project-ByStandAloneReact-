import React, {useState} from 'react';
import validation from "../utilites/validationHelper.js";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonSpinner from "./ButtonSpinner.jsx";
import {useNavigate} from "react-router-dom";

const LoginFrom = () => {
  const [submit, setSubmit]= useState(false)

const navigate = new useNavigate();
  ////onSubmit call
  const onSubmit = async (e)=>{
  e.preventDefault();
  let formData=  new FormData(e.target);
  const email = formData.get("email");
    if (validation.isEmpty(email)){
      toast.error("Email requird")
    }else {
      setSubmit(true);
      // login api call from back-end
      const res= await axios.post(`${validation.API_BASE}/user-login`,{
        UserEmail:email,
      });
      setSubmit(false);
      if (res.data["msg"]==="success"){
        toast.success(res.data["data"]);

        sessionStorage.setItem("email", email);
        navigate("/verify");
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
                  <label className="form-label">Email Address</label>
                  <input name="email" type="email" className="form-control mt-1"/>
                   <button disabled={submit} type="submit" className="btn btn-danger w-100 mt-2 pt-2">
                     {
                     submit? (<ButtonSpinner/>):("Submit")
                   }
                   </button>
                </form>

              </div>

            </div>
          </div>

        </div>
    );
};

export default LoginFrom;