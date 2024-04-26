import React, {useEffect, useState} from "react";
import axios from "axios";
import validation from "../utilites/validationHelper.js";
import FollScreenLOder from "./FollScreenLOder.jsx";
import toast from "react-hot-toast";

const productsList = () => {
  const [data, SetData]= useState(null);
  const [loader,setLoader]= useState(false)


  useEffect(
      ()=>{
        (async ()=>{
          await callApiProducts();
        })()
      },[]
  )
  const callApiProducts = async ()=>{

    const  res =  await axios.get(`${validation.API_BASE}/product-list`)

      const ProductList1 = res.data["data"];

       SetData( ProductList1)
    }

const  AddToCart =async (id)=>{
   try{
       setLoader(true)
       const res= await axios.get(`${validation.API_BASE}/create-cart/${id}`,validation.tokenHeader())
       setLoader(false)
       if (res.data["msg"]==="success"){
           toast.success("Request Completed ");
       }else {
           toast.error("Request fail ")
       }

   }catch (e) {
       validation.Unauthorized(e.response.status)
   }


    }

  return(
      <div>
          {data==null || loader ?(<FollScreenLOder/>):
              (
                  <div className="container">
                      <div className="row">
                          {
                              data.map((item,i)=>{
                                  return (
                                      <div className="col-md-4 p-1 mt-2">
                                        <div className="card p-3 ">
                                        <img  className="w-100" src={item["image"]} alt=""/>
                                            <h5>price:{
                                                    item["discount"]===0?(<span> {item["price"]}</span>):
                                                        (
                                                            <span> <strike>{<span> {item["price"]}</span>} </strike>{
                                                                <span>{item["discount"]}</span>} </span>
                                                        )
                                                }

                                            </h5>
                                            <p>{item['title']}</p>
                                            <button onClick={()=>{AddToCart(item["id"])}} className="bt btn-outline-danger rounded-2u">Ad to Cart</button>
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

export default productsList;
