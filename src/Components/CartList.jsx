import React, {useEffect, useState} from "react";
import FollScreenLOder from "./FollScreenLOder.jsx";
import axios from "axios";
import validation from "../utilites/validationHelper.js";
import toast from "react-hot-toast";

const cartList = () => {
  const [data, SetData]= useState(null);
  const [loader,setLoader]= useState(false)

  useEffect(
      ()=>{
        (async ()=>{
          await callApiCartList();
        })()
      },[]
  )

  const callApiCartList = async ()=>{

    try {
      const  res =  await axios.get(`${validation.API_BASE}/cart-list`,validation.tokenHeader())

      const ProductList1 = res.data["data"];

      SetData( ProductList1)
    }catch (e) {
      validation.Unauthorized(e.response.status)
    }
  }

  const   RemoveCart =async (id)=>{
    try{
      setLoader(true)
      const res= await axios.get(`${validation.API_BASE}/remove-cart/${id}`,validation.tokenHeader())
      setLoader(false)
      if (res.data["msg"]==="success"){
        toast.success("Request Completed ");
        await callApiCartList();
      }else {
        toast.error("Request fail ")
      }

    }catch (e) {
      validation.Unauthorized(e.response.status)
    }


  }

  return (
      <div>
        {data == null || loader ? (<FollScreenLOder/>) :
            (
                <div className="container">
                  <div className="row">
                    {
                      data.map((item, i) => {
                        return (
                            <div className="col-md-4 p-1 mt-2">
                              <div className="card p-3 ">
                                <img className="w-100" src={item["product"]["image"]} alt=""/>
                                <h5>price:{
                                  item['product']["discount"] === 0 ? (<span> {item['product']["price"]}</span>) :
                                      (
                                          <span> <strike>{<span> {item['product']["price"]}</span>} </strike>{
                                            <span>{item['product']["discount"]}</span>} </span>
                                      )
                                }

                                </h5>
                                <p>{item['product']['title']}</p>
                                <button onClick={() => {
                                  RemoveCart(item['product']["id"])
                                }} className="bt btn-outline-danger rounded-2u">Remove
                                </button>
                              </div>
                            </div>
                        )
                      })
                    }
                  </div>
                </div>

            )}
      </div>
  )
};

export default cartList;
